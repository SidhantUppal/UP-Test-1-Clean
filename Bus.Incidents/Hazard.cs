using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bus.Core;
using Bus.Core.Interfaces;
using Data.EntityFramework;
using Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Bus.Incidents
{
    public class Hazard : BusBase<V7DBContext>, IDisposable
    {
        private Data.EntityFramework.Models.Hazard _hazardEntity;

        #region Constructors

        /// <summary>
        /// Default constructor - creates new empty hazard
        /// </summary>
        public Hazard() : base()
        {
            _hazardEntity = new Data.EntityFramework.Models.Hazard();
        }

        /// <summary>
        /// Constructor with existing DbContext
        /// </summary>
        public Hazard(V7DBContext context) : base(context)
        {
            _hazardEntity = new Data.EntityFramework.Models.Hazard();
        }

        /// <summary>
        /// Constructor to load existing hazard by ID
        /// </summary>
        public Hazard(int hazardId, int userAreaId) : base()
        {
            LoadAsync(hazardId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor with DbContext to load existing hazard by ID
        /// </summary>
        public Hazard(V7DBContext context, int hazardId, int userAreaId) : base(context)
        {
            LoadAsync(hazardId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel
        /// </summary>
        public Hazard(HazardViewModel model) : base()
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel with existing DbContext
        /// </summary>
        public Hazard(V7DBContext context, HazardViewModel model) : base(context)
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        #endregion

        #region Properties

        public int HazardID
        {
            get { return _hazardEntity.HazardID; }
            set { _hazardEntity.HazardID = value; }
        }

        public int UserAreaID
        {
            get { return _hazardEntity.UserAreaID; }
            set { _hazardEntity.UserAreaID = value; }
        }

        public int? HazardCategoryTypeID
        {
            get { return _hazardEntity.HazardCategoryTypeID; }
            set { _hazardEntity.HazardCategoryTypeID = value; }
        }

        public string Title
        {
            get { return _hazardEntity.Title ?? string.Empty; }
            set { _hazardEntity.Title = value; }
        }

        public string? Description
        {
            get { return _hazardEntity.Description; }
            set { _hazardEntity.Description = value; }
        }

        public string? Reference
        {
            get { return _hazardEntity.Reference; }
            set { _hazardEntity.Reference = value; }
        }

        public int? InherentLikelihood
        {
            get { return _hazardEntity.InherentLikelihood; }
            set { _hazardEntity.InherentLikelihood = value; }
        }

        public int? InherentConsequence
        {
            get { return _hazardEntity.InherentConsequence; }
            set { _hazardEntity.InherentConsequence = value; }
        }

        public int? InherentRiskScore
        {
            get { return _hazardEntity.InherentRiskScore; }
            set { _hazardEntity.InherentRiskScore = value; }
        }

        public string? LegalRequirements
        {
            get { return _hazardEntity.LegalRequirements; }
            set { _hazardEntity.LegalRequirements = value; }
        }

        public bool? IsActive
        {
            get { return _hazardEntity.IsActive; }
            set { _hazardEntity.IsActive = value; }
        }

        public int? LocationID
        {
            get { return _hazardEntity.LocationID; }
            set { _hazardEntity.LocationID = value; }
        }

        public string? LocationName
        {
            get { return _hazardEntity.LocationName; }
            set { _hazardEntity.LocationName = value; }
        }

        public int? HazardSeverityTypeID
        {
            get { return _hazardEntity.HazardSeverityTypeID; }
            set { _hazardEntity.HazardSeverityTypeID = value; }
        }

        public int? AssignedToUserID
        {
            get { return _hazardEntity.AssignedToUserID; }
            set { _hazardEntity.AssignedToUserID = value; }
        }

        public int? AssignedToRoleID
        {
            get { return _hazardEntity.AssignedToRoleID; }
            set { _hazardEntity.AssignedToRoleID = value; }
        }

        public DateTimeOffset? AssignedDate
        {
            get { return _hazardEntity.AssignedDate; }
            set { _hazardEntity.AssignedDate = value; }
        }

        public int CreatedByUserID
        {
            get { return _hazardEntity.CreatedByUserID; }
            set { _hazardEntity.CreatedByUserID = value; }
        }

        public DateTimeOffset CreatedDate
        {
            get { return _hazardEntity.CreatedDate; }
            set { _hazardEntity.CreatedDate = value; }
        }

        public int? ModifiedByUserID
        {
            get { return _hazardEntity.ModifiedByUserID; }
            set { _hazardEntity.ModifiedByUserID = value; }
        }

        public DateTimeOffset? ModifiedDate
        {
            get { return _hazardEntity.ModifiedDate; }
            set { _hazardEntity.ModifiedDate = value; }
        }

        public int? ArchivedByUserID
        {
            get { return _hazardEntity.ArchivedByUserID; }
            set { _hazardEntity.ArchivedByUserID = value; }
        }

        public DateTimeOffset? ArchivedDate
        {
            get { return _hazardEntity.ArchivedDate; }
            set { _hazardEntity.ArchivedDate = value; }
        }

        #endregion

        #region Private Methods

        private async Task LoadAsync(int hazardId, int userAreaId)
        {
            var hazard = await _dbContext.Hazards
                .Include(h => h.HazardCategoryType)
                .Include(h => h.HazardSeverityType)
                .Include(h => h.Location)
                .Include(h => h.AssignedToUser)
                .FirstOrDefaultAsync(h => h.HazardID == hazardId && h.UserAreaID == userAreaId && (h.IsActive == true || h.IsActive == null));

            if (hazard == null)
                throw new InvalidOperationException($"Hazard with ID {hazardId} not found in user area {userAreaId}");

            _hazardEntity = hazard;
        }

        private async Task InitializeFromViewModelAsync(HazardViewModel model)
        {
            if (model.HazardID > 0)
            {
                // Load existing hazard
                await LoadAsync(model.HazardID, model.UserAreaID);
                // Update with ViewModel values
                MapFromViewModel(model);
            }
            else
            {
                // Create new hazard
                _hazardEntity = new Data.EntityFramework.Models.Hazard();
                MapFromViewModel(model);
            }
        }

        private void MapFromViewModel(HazardViewModel model)
        {
            _hazardEntity.HazardID = model.HazardID;
            _hazardEntity.Title = model.Title;
            _hazardEntity.Reference = model.Reference;
            _hazardEntity.Description = model.Description;
            _hazardEntity.UserAreaID = model.UserAreaID;
            _hazardEntity.HazardCategoryTypeID = model.HazardCategoryTypeID;
            _hazardEntity.HazardSeverityTypeID = model.HazardSeverityTypeID;
            _hazardEntity.InherentLikelihood = model.InherentLikelihood;
            _hazardEntity.InherentConsequence = model.InherentConsequence;
            _hazardEntity.InherentRiskScore = model.InherentRiskScore;
            _hazardEntity.LegalRequirements = model.LegalRequirements;
            _hazardEntity.IsActive = model.IsActive;
            _hazardEntity.LocationID = model.LocationID;
            _hazardEntity.LocationName = model.LocationName;
            _hazardEntity.AssignedToUserID = model.AssignedToUserID;
            _hazardEntity.AssignedToRoleID = model.AssignedToRoleID;
            _hazardEntity.AssignedDate = model.AssignedDate;
            _hazardEntity.CreatedByUserID = model.CreatedByUserID;
            _hazardEntity.CreatedDate = model.CreatedDate;
            _hazardEntity.ModifiedByUserID = model.ModifiedByUserID;
            _hazardEntity.ModifiedDate = model.ModifiedDate;
            _hazardEntity.ArchivedByUserID = model.ArchivedByUserID;
            _hazardEntity.ArchivedDate = model.ArchivedDate;
        }

        private string GenerateReference(int userAreaId)
        {
            // Generate unique hazard code based on current timestamp and user area
            var timestamp = DateTimeOffset.UtcNow.ToString("yyyyMMddHHmmss");
            return $"HAZ-{userAreaId}-{timestamp}";
        }

        #endregion

        #region Public Methods

        public HazardViewModel GetViewModel()
        {
            return new HazardViewModel
            {
                HazardID = _hazardEntity.HazardID,
                UserAreaID = _hazardEntity.UserAreaID,
                HazardCategoryTypeID = _hazardEntity.HazardCategoryTypeID,
                Title = _hazardEntity.Title,
                Description = _hazardEntity.Description,
                Reference = _hazardEntity.Reference,
                InherentLikelihood = _hazardEntity.InherentLikelihood,
                InherentConsequence = _hazardEntity.InherentConsequence,
                InherentRiskScore = _hazardEntity.InherentRiskScore,
                LegalRequirements = _hazardEntity.LegalRequirements,
                IsActive = _hazardEntity.IsActive,
                LocationID = _hazardEntity.LocationID,
                LocationName = _hazardEntity.LocationName,
                HazardSeverityTypeID = _hazardEntity.HazardSeverityTypeID,
                AssignedToUserID = _hazardEntity.AssignedToUserID,
                AssignedToRoleID = _hazardEntity.AssignedToRoleID,
                AssignedDate = _hazardEntity.AssignedDate,
                CreatedByUserID = _hazardEntity.CreatedByUserID,
                CreatedDate = _hazardEntity.CreatedDate,
                ModifiedByUserID = _hazardEntity.ModifiedByUserID,
                ModifiedDate = _hazardEntity.ModifiedDate,
                ArchivedByUserID = _hazardEntity.ArchivedByUserID,
                ArchivedDate = _hazardEntity.ArchivedDate
            };
        }

        public async Task<int> SaveAndReturnAsync(int userId)
        {
            try
            {
                // Set audit fields for new hazards
                if (_hazardEntity.HazardID == 0)
                {
                    _hazardEntity.CreatedByUserID = userId;
                    _hazardEntity.CreatedDate = DateTimeOffset.UtcNow;
                    _hazardEntity.ModifiedByUserID = userId;
                    _hazardEntity.ModifiedDate = DateTimeOffset.UtcNow;
                    _hazardEntity.IsActive = true;

                    // Generate hazard code if not provided
                    if (string.IsNullOrEmpty(_hazardEntity.Reference))
                    {
                        _hazardEntity.Reference = GenerateReference(_hazardEntity.UserAreaID);
                    }

                    _dbContext.Hazards.Add(_hazardEntity);
                }
                else
                {
                    // Update existing hazard
                    _hazardEntity.ModifiedByUserID = userId;
                    _hazardEntity.ModifiedDate = DateTimeOffset.UtcNow;
                    _dbContext.Hazards.Update(_hazardEntity);
                }

                await _dbContext.SaveChangesAsync();
                return _hazardEntity.HazardID;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error saving hazard: {ex.Message}", ex);
            }
        }

        public async Task SaveAsync(int userId)
        {
            await SaveAndReturnAsync(userId);
        }

        public async Task ArchiveAsync(int userId)
        {
            _hazardEntity.IsActive = false;
            _hazardEntity.ArchivedByUserID = userId;
            _hazardEntity.ArchivedDate = DateTimeOffset.UtcNow;
            _hazardEntity.ModifiedByUserID = userId;
            _hazardEntity.ModifiedDate = DateTimeOffset.UtcNow;

            _dbContext.Hazards.Update(_hazardEntity);
            await _dbContext.SaveChangesAsync();
        }

        #endregion

        #region Static Methods

        public static async Task<List<HazardViewModel>> GetAllHazardsAsync(int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.Hazards
                .Where(h => h.IsActive == true || h.IsActive == null);

            if (userAreaId.HasValue)
            {
                query = query.Where(h => h.UserAreaID == userAreaId.Value);
            }

            var hazards = await query
                .Include(h => h.HazardCategoryType)
                .Include(h => h.HazardSeverityType)
                .Include(h => h.Location)
                .Include(h => h.AssignedToUser)
                .OrderByDescending(h => h.CreatedDate)
                .ToListAsync();

            return hazards.Select(h => new HazardViewModel
            {
                HazardID = h.HazardID,
                UserAreaID = h.UserAreaID,
                HazardCategoryTypeID = h.HazardCategoryTypeID,
                Title = h.Title,
                Description = h.Description,
                Reference = h.Reference,
                InherentLikelihood = h.InherentLikelihood,
                InherentConsequence = h.InherentConsequence,
                InherentRiskScore = h.InherentRiskScore,
                LegalRequirements = h.LegalRequirements,
                IsActive = h.IsActive,
                LocationID = h.LocationID,
                LocationName = h.LocationName,
                HazardSeverityTypeID = h.HazardSeverityTypeID,
                AssignedToUserID = h.AssignedToUserID,
                AssignedToRoleID = h.AssignedToRoleID,
                AssignedDate = h.AssignedDate,
                CreatedByUserID = h.CreatedByUserID,
                CreatedDate = h.CreatedDate,
                ModifiedByUserID = h.ModifiedByUserID,
                ModifiedDate = h.ModifiedDate,
                ArchivedByUserID = h.ArchivedByUserID,
                ArchivedDate = h.ArchivedDate
            }).ToList();
        }

        public static async Task<HazardViewModel?> GetHazardByIdAsync(int hazardId, int userAreaId)
        {
            using var context = new V7DBContext();
            var hazard = await context.Hazards
                .Include(h => h.HazardCategoryType)
                .Include(h => h.HazardSeverityType)
                .Include(h => h.Location)
                .Include(h => h.AssignedToUser)
                .FirstOrDefaultAsync(h => h.HazardID == hazardId && h.UserAreaID == userAreaId && (h.IsActive == true || h.IsActive == null));

            if (hazard == null)
                return null;

            return new HazardViewModel
            {
                HazardID = hazard.HazardID,
                UserAreaID = hazard.UserAreaID,
                HazardCategoryTypeID = hazard.HazardCategoryTypeID,
                Title = hazard.Title,
                Description = hazard.Description,
                Reference = hazard.Reference,
                InherentLikelihood = hazard.InherentLikelihood,
                InherentConsequence = hazard.InherentConsequence,
                InherentRiskScore = hazard.InherentRiskScore,
                LegalRequirements = hazard.LegalRequirements,
                IsActive = hazard.IsActive,
                LocationID = hazard.LocationID,
                LocationName = hazard.LocationName,
                HazardSeverityTypeID = hazard.HazardSeverityTypeID,
                AssignedToUserID = hazard.AssignedToUserID,
                AssignedToRoleID = hazard.AssignedToRoleID,
                AssignedDate = hazard.AssignedDate,
                CreatedByUserID = hazard.CreatedByUserID,
                CreatedDate = hazard.CreatedDate,
                ModifiedByUserID = hazard.ModifiedByUserID,
                ModifiedDate = hazard.ModifiedDate,
                ArchivedByUserID = hazard.ArchivedByUserID,
                ArchivedDate = hazard.ArchivedDate
            };
        }

        public static async Task<List<HazardSeverityTypeViewModel>> GetHazardSeveritiesAsync()
        {
            using var context = new V7DBContext();
            var severities = await context.HazardSeverityTypes
                .Where(s => s.IsActive == true || s.IsActive == null)
                .OrderBy(s => s.SeverityLevel)
                .ToListAsync();

            return severities.Select(s => new HazardSeverityTypeViewModel
            {
                HazardSeverityTypeID = s.HazardSeverityTypeID,
                UserAreaID = s.UserAreaID,
                Reference = s.Reference,
                Title = s.Title,
                SeverityLevel = s.SeverityLevel,
                ColorCode = s.ColorCode,
                Description = s.Description,
                IsActive = s.IsActive,
                CreatedByUserID = s.CreatedByUserID,
                CreatedDate = s.CreatedDate,
                ModifiedByUserID = s.ModifiedByUserID,
                ModifiedDate = s.ModifiedDate,
                ArchivedByUserID = s.ArchivedByUserID,
                ArchivedDate = s.ArchivedDate
            }).ToList();
        }

        public static async Task<List<HazardCategoryTypeViewModel>> GetHazardCategoriesAsync(int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.HazardCategoryTypes
                .Where(c => c.IsActive == true || c.IsActive == null);

            if (userAreaId.HasValue)
            {
                query = query.Where(c => c.UserAreaID == userAreaId.Value);
            }

            var categories = await query
                .OrderBy(c => c.Title)
                .ToListAsync();

            return categories.Select(c => new HazardCategoryTypeViewModel
            {
                HazardCategoryTypeID = c.HazardCategoryTypeID,
                UserAreaID = c.UserAreaID,
                Title = c.Title,
                Description = c.Description,
                ParentCategoryID = c.ParentCategoryID,
                IsActive = c.IsActive,
                CreatedByUserID = c.CreatedByUserID,
                CreatedDate = c.CreatedDate,
                ModifiedByUserID = c.ModifiedByUserID,
                ModifiedDate = c.ModifiedDate,
                ArchivedByUserID = c.ArchivedByUserID,
                ArchivedDate = c.ArchivedDate
            }).ToList();
        }

        #endregion

        #region IDisposable

        public void Dispose()
        {
            // Dispose handled by base class
        }

        #endregion
    }
}