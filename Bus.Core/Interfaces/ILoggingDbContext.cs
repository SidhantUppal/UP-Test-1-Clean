using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Logging;

namespace Bus.Core.Interfaces
{
    /// <summary>
    /// Extended DbContext interface for logging and auditing capabilities
    /// </summary>
    public interface ILoggingDbContext : IDbContext
    {
        /// <summary>
        /// Gets the logger factory for database operations
        /// </summary>
        ILoggerFactory? LoggerFactory { get; }

        /// <summary>
        /// Gets the logger for this context
        /// </summary>
        ILogger Logger { get; }

        /// <summary>
        /// Logs an informational message with entity details
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="entity">The entity being operated on</param>
        void LogInfo(string message, object? entity = null);

        /// <summary>
        /// Logs a warning message with entity details
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="entity">The entity being operated on</param>
        void LogWarning(string message, object? entity = null);

        /// <summary>
        /// Logs an error message with exception details
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="exception">The exception that occurred</param>
        /// <param name="entity">The entity being operated on</param>
        void LogError(string message, Exception? exception = null, object? entity = null);

        /// <summary>
        /// Gets audit information for all tracked entities
        /// </summary>
        /// <returns>Collection of audit information</returns>
        IEnumerable<EntityAuditInfo> GetAuditInfo();

        /// <summary>
        /// Saves changes with logging and audit trail
        /// </summary>
        /// <param name="logChanges">Whether to log the changes being made</param>
        /// <returns>Number of entities affected</returns>
        int SaveChanges(bool logChanges);

        /// <summary>
        /// Saves changes asynchronously with logging and audit trail
        /// </summary>
        /// <param name="logChanges">Whether to log the changes being made</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Number of entities affected</returns>
        Task<int> SaveChangesAsync(bool logChanges, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Represents audit information for an entity
    /// </summary>
    public class EntityAuditInfo
    {
        public string EntityName { get; set; } = string.Empty;
        public string EntityState { get; set; } = string.Empty;
        public object? Entity { get; set; }
        public Dictionary<string, object?> OriginalValues { get; set; } = new();
        public Dictionary<string, object?> CurrentValues { get; set; } = new();
        public Dictionary<string, object?> ModifiedProperties { get; set; } = new();
    }
}
