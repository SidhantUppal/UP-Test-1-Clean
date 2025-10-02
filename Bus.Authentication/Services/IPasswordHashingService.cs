namespace Bus.Authentication.Services;

public interface IPasswordHashingService
{
    (string hash, string salt) HashPassword(string password);
    bool VerifyPassword(string password, string hash, string salt);
    bool NeedsRehashing(string hash);
}

public class PasswordHashingService : IPasswordHashingService
{
    private const int SaltSize = 32;
    private const int HashSize = 64;
    private const int Iterations = 100000;

    public (string hash, string salt) HashPassword(string password)
    {
        if (string.IsNullOrEmpty(password))
            throw new ArgumentException("Password cannot be null or empty", nameof(password));

        // Generate salt
        var salt = new byte[SaltSize];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        // Hash password with salt
        var hash = HashPasswordWithSalt(password, salt);

        return (
            Convert.ToBase64String(hash),
            Convert.ToBase64String(salt)
        );
    }

    public bool VerifyPassword(string password, string hash, string salt)
    {
        if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hash) || string.IsNullOrEmpty(salt))
            return false;

        try
        {
            // Check if hash is in the legacy format: pbkdf2:sha256:100000$salt$hash
            if (hash.StartsWith("pbkdf2:sha256:"))
            {
                return VerifyLegacyPassword(password, hash);
            }
            
            // Standard Base64 format
            var saltBytes = Convert.FromBase64String(salt);
            var hashBytes = Convert.FromBase64String(hash);
            
            var computedHash = HashPasswordWithSalt(password, saltBytes);
            
            // Use constant-time comparison to prevent timing attacks
            return CryptographicEquals(hashBytes, computedHash);
        }
        catch
        {
            return false;
        }
    }

    public bool NeedsRehashing(string hash)
    {
        // For now, assume all hashes are current
        // In the future, you might check hash format version or iteration count
        return false;
    }

    private bool VerifyLegacyPassword(string password, string storedHash)
    {
        try
        {
            // Format: pbkdf2:sha256:100000$salt$hash
            var parts = storedHash.Split('$');
            if (parts.Length != 3)
            {
                return false;
            }

            var algorithm = parts[0]; // "pbkdf2:sha256:100000"
            var salt = parts[1];      // salt string
            var hash = parts[2];      // expected hash

            // Extract iterations from algorithm part
            var algorithmParts = algorithm.Split(':');
            if (algorithmParts.Length != 3 || algorithmParts[0] != "pbkdf2" || algorithmParts[1] != "sha256")
            {
                return false;
            }

            if (!int.TryParse(algorithmParts[2], out int iterations))
            {
                return false;
            }

            // Convert salt to bytes (UTF8 encoding for legacy format)
            var saltBytes = System.Text.Encoding.UTF8.GetBytes(salt);

            // Compute hash with legacy parameters
            using var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(
                password,
                saltBytes,
                iterations,
                System.Security.Cryptography.HashAlgorithmName.SHA256);

            var computedHashBytes = pbkdf2.GetBytes(32); // 32 bytes = 256 bits
            var computedHash = Convert.ToBase64String(computedHashBytes);

            // Compare hashes
            return string.Equals(hash, computedHash, StringComparison.Ordinal);
        }
        catch (Exception)
        {
            return false;
        }
    }

    private byte[] HashPasswordWithSalt(string password, byte[] salt)
    {
        using var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(
            password, 
            salt, 
            Iterations, 
            System.Security.Cryptography.HashAlgorithmName.SHA256);
        
        return pbkdf2.GetBytes(HashSize);
    }

    private static bool CryptographicEquals(byte[] a, byte[] b)
    {
        if (a.Length != b.Length)
            return false;

        int result = 0;
        for (int i = 0; i < a.Length; i++)
        {
            result |= a[i] ^ b[i];
        }

        return result == 0;
    }
}