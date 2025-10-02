using Bus.Authentication.Services;
using Bus.Authentication.Repositories;
using Bus.Authentication.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Bus.Authentication.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        // Register permission configuration
        services.Configure<PermissionConfiguration>(configuration.GetSection(PermissionConfiguration.SectionName));

        // Register authentication services
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<EntraTokenValidator>();
        services.AddScoped<ApiKeyValidator>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IPermissionService, PermissionService>();
        
        // Register OAuth and user provisioning services
        services.AddScoped<IOAuthService, MicrosoftOAuthService>();
        services.AddScoped<IUserProvisioningService, UserProvisioningService>();
        
        // Register new repository and utility services
        services.AddScoped<IPasswordHashingService, PasswordHashingService>();

        // Configure JWT authentication
        var jwtSettings = configuration.GetSection("Jwt");
        var secretKey = jwtSettings["SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey");
        
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                ClockSkew = TimeSpan.Zero
            };

            // Handle token from query string for SignalR
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];
                    var path = context.HttpContext.Request.Path;
                    
                    if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hub"))
                    {
                        context.Token = accessToken;
                    }
                    
                    return Task.CompletedTask;
                }
            };
        });

        return services;
    }

    /// <summary>
    /// Adds Entity Framework-based authentication repositories
    /// Call this after AddCustomAuthentication() and after registering your DbContext
    /// </summary>
    public static IServiceCollection AddEntityFrameworkAuthenticationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, SqlUserRepository>();
        services.AddScoped<IApiKeyRepository, SqlApiKeyRepository>();
        services.AddScoped<IRefreshTokenRepository, SqlRefreshTokenRepository>();

        return services;
    }

    /// <summary>
    /// Adds custom authentication repositories - use this if you have custom implementations
    /// </summary>
    public static IServiceCollection AddCustomAuthenticationRepositories<TUserRepo, TApiKeyRepo, TRefreshTokenRepo>(
        this IServiceCollection services)
        where TUserRepo : class, IUserRepository
        where TApiKeyRepo : class, IApiKeyRepository
        where TRefreshTokenRepo : class, IRefreshTokenRepository
    {
        services.AddScoped<IUserRepository, TUserRepo>();
        services.AddScoped<IApiKeyRepository, TApiKeyRepo>();
        services.AddScoped<IRefreshTokenRepository, TRefreshTokenRepo>();

        return services;
    }
}