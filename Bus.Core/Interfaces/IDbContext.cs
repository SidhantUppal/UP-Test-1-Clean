using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Bus.Core.Interfaces
{
    public interface IDbContext : IDisposable
    {
        /// <summary>
        /// Provides access to features of the context that deal with change tracking of entities.
        /// </summary>
        ChangeTracker ChangeTracker { get; }

        /// <summary>
        /// Creates a database instance for this context and allows you to perform creation, deletion or existence checks for the underlying database.
        /// </summary>
        DatabaseFacade Database { get; }

        /// <summary>
        /// Returns a DbSet for the specified type, this allows CRUD operations to be performed for the given entity in the context.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        DbSet<T> Set<T>() where T : class;

        /// <summary>
        /// Returns a DbSet for the specified type, this allows CRUD operations to be performed for the given entity in the context.
        /// </summary>
        /// <param name="entityType"></param>
        /// <returns></returns>
        object Set(Type entityType);

        /// <summary>
        /// Gets an EntityEntry T object for the given entity providing access to information about the entity and the ability to perform actions on the entity.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        EntityEntry<T> Entry<T>(T entity) where T : class;

        /// <summary>
        /// Gets an EntityEntry object for the given entity providing access to information about the entity and the ability to perform actions on the entity.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        EntityEntry Entry(object entity);

        /// <summary>
        /// Saves all changes made in this context to the underlying database.
        /// </summary>
        /// <returns></returns>
        int SaveChanges();

        /// <summary>
        /// Saves all changes made in this context to the underlying database asynchronously.
        /// </summary>
        /// <returns></returns>
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
