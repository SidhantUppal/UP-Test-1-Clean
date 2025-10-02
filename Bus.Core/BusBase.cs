using Bus.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Bus.Core
{
    public abstract class BusBase<T> : IDisposable where T : class, IDbContext 
    {
        #region Class Members

        protected T _dbContext;
        protected static IMemoryCache? _cache;
        protected static string? _connectionString;
        protected static IConfiguration? _configuration;

        public virtual int LanguageTypeID { get; set; }
        public virtual int RegionTypeID { get; set; }
        public virtual int? CurrentUserID { get; set; }

        #endregion

        #region Constructors

        protected BusBase()
        {
            _dbContext = CreateDbContext();
        }

        protected BusBase(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbContext = CreateDbContext();
        }

        protected BusBase(T dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        #endregion

        #region DbContext Factory Methods

        /// <summary>
        /// Creates a new DbContext instance using the default connection string
        /// </summary>
        protected virtual T CreateDbContext()
        {
            if (!string.IsNullOrEmpty(_connectionString))
            {
                return CreateDbContext(_connectionString);
            }

            // Try to get connection string from IConfiguration or fallback to static
            string? connectionString = null;
            
            if (_configuration != null)
            {
                connectionString = _configuration.GetConnectionString("DefaultConnection");
            }      

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException(
                    "No connection string found. Either:\n" +
                    "1. Set BusBase.SetConnectionString() before creating Bus instances\n" +
                    "2. Pass connection string to constructor\n" +
                    "3. Configure 'DefaultConnection' in IConfiguration (e.g., appsettings.json)\n" +
                    "4. Use dependency injection with configured DbContext");
            }

            return CreateDbContext(connectionString);
        }

        /// <summary>
        /// Creates a new DbContext instance with the specified connection string
        /// </summary>
        protected virtual T CreateDbContext(string connectionString)
        {
            var dbContextType = typeof(T);
            
            // First try: parameterless constructor (simplest approach)
            var parameterlessConstructor = dbContextType.GetConstructor(Type.EmptyTypes);
            if (parameterlessConstructor != null)
            {
                // Create instance with parameterless constructor
                // The DbContext will need to configure itself or use OnConfiguring
                var instance = (T)Activator.CreateInstance(dbContextType)!;
                
                // Try to set connection string via OnConfiguring if available
                // This requires the DbContext to override OnConfiguring method
                return instance;
            }
            
            // Second try: non-generic DbContextOptions constructor
            var nonGenericConstructor = dbContextType.GetConstructor(new[] { typeof(DbContextOptions) });
            if (nonGenericConstructor != null)
            {
                var optionsBuilder = new DbContextOptionsBuilder()
                    .UseSqlServer(connectionString);
                    
                var instance = (T)nonGenericConstructor.Invoke(new object[] { optionsBuilder.Options })!;
                return instance;
            }
            
            // Third try: generic DbContextOptions<T> constructor using dynamic approach
            try
            {
                // Create options using dynamic to avoid reflection complexity
                dynamic optionsBuilder = Activator.CreateInstance(
                    typeof(DbContextOptionsBuilder<>).MakeGenericType(dbContextType))!;
                    
                // Call UseSqlServer - this should work with dynamic
                optionsBuilder.UseSqlServer(connectionString);
                
                var options = optionsBuilder.Options;
                var instance = (T)Activator.CreateInstance(dbContextType, options)!;
                return instance;
            }
            catch
            {
                // Dynamic approach failed, continue to error
            }

            throw new InvalidOperationException($"Cannot create DbContext of type {typeof(T).Name}. No suitable constructor found. Available constructors: {string.Join(", ", dbContextType.GetConstructors().Select(c => string.Join(", ", c.GetParameters().Select(p => p.ParameterType.Name))))}");
        }

        /// <summary>
        /// Sets the default connection string for all Bus instances
        /// </summary>
        public static void SetConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        /// <summary>
        /// Gets the current connection string
        /// </summary>
        public static string? GetConnectionString()
        {
            if (!string.IsNullOrEmpty(_connectionString))
                return _connectionString;
                
            if (_configuration != null)
                return _configuration.GetConnectionString("DefaultConnection");
                
            return null;
        }

        /// <summary>
        /// Sets the configuration for all Bus instances
        /// </summary>
        public static void SetConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #endregion

        #region Properties

        public T DBContext => _dbContext;
        public static IMemoryCache? Cache { get => _cache; set => _cache = value; }

        #endregion

        #region Entity Methods

        /// <summary>
        /// Sets creation audit fields for a new entity
        /// </summary>
        public void SetCreatedEntity(IUpdatableEntity entity, int? userID = null)
        {
            if (entity == null) return;
            
            var userId = userID ?? CurrentUserID ?? 0;
            var now = DateTime.UtcNow;
            
            entity.CreatedByUserID = userId;
            entity.CreatedDate = now;
            entity.ModifiedByUserID = null;
            entity.ModifiedDate = null;
        }

        /// <summary>
        /// Sets modification audit fields for an existing entity
        /// </summary>
        public void SetModifiedEntity(IUpdatableEntity entity, int? userID = null)
        {
            if (entity == null) return;
            
            var userId = userID ?? CurrentUserID ?? 0;
            var now = DateTime.UtcNow;
            
            entity.ModifiedByUserID = userId;
            entity.ModifiedDate = now;
        }

        /// <summary>
        /// Sets archival audit fields for an entity
        /// </summary>
        public void SetArchivedEntity(IUpdatableEntity entity, int? userID = null)
        {
            if (entity == null) return;
            
            var userId = userID ?? CurrentUserID ?? 0;
            var now = DateTime.UtcNow;
            
            entity.ArchivedByUserID = userId;
            entity.ArchivedDate = now;
        }

        #endregion

        #region IDisposable

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _dbContext?.Dispose();
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
