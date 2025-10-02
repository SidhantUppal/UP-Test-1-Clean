using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Bus.Core.Interfaces;

namespace Data.EntityFramework
{
    public partial class V7DBContext
    {
        public partial void ValidateEntitiesBeforeSave()
        {
            // Check for inserted entities without proper audit fields
            var unsavedAdds = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added && e.Entity is IUpdatableEntity)
                .Cast<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<IUpdatableEntity>>()
                .Where(e => e.Entity.CreatedDate == DateTime.MinValue || e.Entity.CreatedByUserID == 0)
                .Select(e => new { Label = e.Entity.GetType().Name })
                .ToList();

            if (unsavedAdds.Any())
            {
                var entityNames = string.Join(", ", unsavedAdds.Select(x => x.Label));
                throw new InvalidOperationException($"One or more entities were added without calling SetCreatedEntity() or proper audit setup. Entities: {entityNames}");
            }

            // Check for deleted entities (for logging/auditing purposes)
            var deletedEntities = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted && e.Entity is IUpdatableEntity)
                .Cast<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<IUpdatableEntity>>()
                .ToList();

            // Only validate modified entities if there are no deletions (preserving original logic)
            if (!deletedEntities.Any())
            {
                // Check for updated entities without proper modification audit fields
                var unsavedMods = ChangeTracker.Entries()
                    .Where(e => e.State == EntityState.Modified && e.Entity is IUpdatableEntity)
                    .Cast<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<IUpdatableEntity>>()
                    .Where(e => !e.Property(p => p.ModifiedDate).IsModified)
                    .Select(e => new { Label = e.Entity.GetType().Name })
                    .ToList();

                if (unsavedMods.Any())
                {
                    var entityNames = string.Join(", ", unsavedMods.Select(x => x.Label));
                    throw new InvalidOperationException($"One or more entities were modified without calling SetModifiedEntity() or proper audit setup. Entities: {entityNames}");
                }
            }
        }
    }
}
