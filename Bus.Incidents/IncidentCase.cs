using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bus.Core;
using Bus.Core.Enums;
using Bus.Core.Interfaces;
using Data.EntityFramework;
using Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Bus.Incidents
{
    public class IncidentCase : BusBase<V7DBContext>, IDisposable
    {
        private Data.EntityFramework.Models.IncidentCase _incidentEntity;

        #region Constructors

        /// <summary>
        /// Default constructor - creates new empty incident
        /// </summary>
        public IncidentCase() : base()
        {
            _incidentEntity = new Data.EntityFramework.Models.IncidentCase();
        }

        /// <summary>
        /// Constructor with existing DbContext
        /// </summary>
        public IncidentCase(V7DBContext context) : base(context)
        {
            _incidentEntity = new Data.EntityFramework.Models.IncidentCase();
        }

        /// <summary>
        /// Constructor to load existing incident by ID
        /// </summary>
        public IncidentCase(int incidentCaseId, int userAreaId) : base()
        {
            LoadAsync(incidentCaseId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor with DbContext to load existing incident by ID
        /// </summary>
        public IncidentCase(V7DBContext context, int incidentCaseId, int userAreaId) : base(context)
        {
            LoadAsync(incidentCaseId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel
        /// </summary>
        public IncidentCase(IncidentCaseViewModel model) : base()
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel with existing DbContext
        /// </summary>
        public IncidentCase(V7DBContext context, IncidentCaseViewModel model) : base(context)
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        #endregion

        #region Properties

        public int IncidentCaseID
        {
            get { return _incidentEntity.IncidentCaseID; }
            set { _incidentEntity.IncidentCaseID = value; }
        }

        public string CaseNumber
        {
            get { return _incidentEntity.CaseNumber ?? string.Empty; }
            set { _incidentEntity.CaseNumber = value; }
        }

        public string? Description
        {
            get { return _incidentEntity.Description; }
            set { _incidentEntity.Description = value; }
        }

        public int UserAreaID
        {
            get { return _incidentEntity.UserAreaID; }
            set { _incidentEntity.UserAreaID = value; }
        }

        public int IncidentTypeID
        {
            get { return _incidentEntity.IncidentTypeID; }
            set { _incidentEntity.IncidentTypeID = value; }
        }

        public DateTimeOffset IncidentDate
        {
            get { return _incidentEntity.IncidentDate; }
            set { _incidentEntity.IncidentDate = value; }
        }

        public DateTimeOffset? ReportedDate
        {
            get { return _incidentEntity.ReportedDate; }
            set { _incidentEntity.ReportedDate = value; }
        }

        public int? LocationID
        {
            get { return _incidentEntity.LocationID; }
            set { _incidentEntity.LocationID = value; }
        }

        public int? Severity
        {
            get { return _incidentEntity.IncidentSeverityTypeID; }
            set { _incidentEntity.IncidentSeverityTypeID = value; }
        }

        public int? IncidentStatusType
        {
            get { return _incidentEntity.IncidentStatusTypeID; }
            set { _incidentEntity.IncidentStatusTypeID = value; }
        }

        public int? IncidentPriorityTypeID
        {
            get { return _incidentEntity.IncidentPriorityTypeID; }
            set { _incidentEntity.IncidentPriorityTypeID = value; }
        }

        public int ReportedByUserID
        {
            get { return _incidentEntity.ReportedByUserID; }
            set { _incidentEntity.ReportedByUserID = value; }
        }

        public int? AssignedToUserID
        {
            get { return _incidentEntity.AssignedToUserID; }
            set { _incidentEntity.AssignedToUserID = value; }
        }

        public int CreatedByUserID
        {
            get { return _incidentEntity.CreatedByUserID; }
            set { _incidentEntity.CreatedByUserID = value; }
        }

        public DateTimeOffset? CreatedDate
        {
            get { return _incidentEntity.CreatedDate; }
            set { _incidentEntity.CreatedDate = value; }
        }

        public DateTimeOffset? ClosedDate
        {
            get { return _incidentEntity.ClosedDate; }
            set { _incidentEntity.ClosedDate = value; }
        }

        public int? ClosedByUserID
        {
            get { return _incidentEntity.ClosedByUserID; }
            set { _incidentEntity.ClosedByUserID = value; }
        }

        public string? AdditionalReference
        {
            get { return _incidentEntity.AdditionalReference; }
            set { _incidentEntity.AdditionalReference = value; }
        }

        #endregion

        #region Private Methods

        private async Task LoadAsync(int incidentCaseId, int userAreaId)
        {
            var incident = await _dbContext.IncidentCases
                .FirstOrDefaultAsync(t => t.IncidentCaseID == incidentCaseId && t.UserAreaID == userAreaId && (t.IsDeleted == false || t.IsDeleted == null));

            if (incident == null)
                throw new InvalidOperationException($"Incident case with ID {incidentCaseId} not found in user area {userAreaId}");

            _incidentEntity = incident;
        }

        private async Task InitializeFromViewModelAsync(IncidentCaseViewModel model)
        {
            if (model.IncidentCaseID > 0)
            {
                // Load existing incident
                await LoadAsync(model.IncidentCaseID, model.UserAreaID);
                // Update with ViewModel values
                MapFromViewModel(model);
            }
            else
            {
                // Create new incident
                _incidentEntity = new Data.EntityFramework.Models.IncidentCase();
                MapFromViewModel(model);
            }
        }

        private void MapFromViewModel(IncidentCaseViewModel model)
        {
            _incidentEntity.IncidentCaseID = model.IncidentCaseID;
            _incidentEntity.UserAreaID = model.UserAreaID;
            // Only set CaseNumber if it's not null/empty - let SaveAndReturnAsync generate it if needed
            if (!string.IsNullOrEmpty(model.CaseNumber))
            {
                _incidentEntity.CaseNumber = model.CaseNumber;
            }
            _incidentEntity.IncidentTypeID = model.IncidentTypeID;
            _incidentEntity.IncidentDate = model.IncidentDate;
            _incidentEntity.ReportedDate = model.ReportedDate;
            _incidentEntity.LocationID = model.LocationID;
            _incidentEntity.Description = model.Description;
            _incidentEntity.IncidentSeverityTypeID = model.IncidentSeverityTypeID;
            _incidentEntity.IncidentStatusTypeID = model.IncidentStatusTypeID;
            _incidentEntity.IncidentPriorityTypeID = model.IncidentPriorityTypeID;
            _incidentEntity.ReportedByUserID = model.ReportedByUserID;
            _incidentEntity.AssignedToUserID = model.AssignedToUserID;
            _incidentEntity.InvolvedEmployeeID = model.InvolvedEmployeeID;
            _incidentEntity.InvestigationStartDate = model.InvestigationStartDate;
            _incidentEntity.InvestigationEndDate = model.InvestigationEndDate;
            _incidentEntity.RootCause = model.RootCause;
            _incidentEntity.CorrectiveActions = model.CorrectiveActions;
            _incidentEntity.PreventiveActions = model.PreventiveActions;
            _incidentEntity.ClosedDate = model.ClosedDate;
            _incidentEntity.ClosedByUserID = model.ClosedByUserID;
            _incidentEntity.ClosureNotes = model.ClosureNotes;
            _incidentEntity.CreatedDate = model.CreatedDate;
            _incidentEntity.CreatedByUserID = model.CreatedByUserID;
            _incidentEntity.ModifiedDate = model.ModifiedDate;
            _incidentEntity.ModifiedByUserID = model.ModifiedByUserID;
            _incidentEntity.IsDeleted = model.IsDeleted;
            _incidentEntity.AdditionalReference = model.AdditionalReference;
        }

        private string GenerateCaseNumber(int userAreaId)
        {
            // Generate unique case number based on current timestamp and user area
            var timestamp = DateTimeOffset.UtcNow.ToString("yyyyMMddHHmmss");
            return $"INC-{userAreaId}-{timestamp}";
        }

        #endregion

        #region Public Methods

        public IncidentCaseViewModel GetViewModel()
        {
            return new IncidentCaseViewModel
            {
                IncidentCaseID = _incidentEntity.IncidentCaseID,
                UserAreaID = _incidentEntity.UserAreaID,
                CaseNumber = _incidentEntity.CaseNumber,
                IncidentTypeID = _incidentEntity.IncidentTypeID,
                IncidentDate = _incidentEntity.IncidentDate,
                ReportedDate = _incidentEntity.ReportedDate,
                LocationID = _incidentEntity.LocationID,
                Description = _incidentEntity.Description,
                IncidentSeverityTypeID = _incidentEntity.IncidentSeverityTypeID,
                IncidentStatusTypeID = _incidentEntity.IncidentStatusTypeID,
                IncidentPriorityTypeID = _incidentEntity.IncidentPriorityTypeID,
                ReportedByUserID = _incidentEntity.ReportedByUserID,
                AssignedToUserID = _incidentEntity.AssignedToUserID,
                InvolvedEmployeeID = _incidentEntity.InvolvedEmployeeID,
                InvestigationStartDate = _incidentEntity.InvestigationStartDate,
                InvestigationEndDate = _incidentEntity.InvestigationEndDate,
                RootCause = _incidentEntity.RootCause,
                CorrectiveActions = _incidentEntity.CorrectiveActions,
                PreventiveActions = _incidentEntity.PreventiveActions,
                ClosedDate = _incidentEntity.ClosedDate,
                ClosedByUserID = _incidentEntity.ClosedByUserID,
                ClosureNotes = _incidentEntity.ClosureNotes,
                CreatedDate = _incidentEntity.CreatedDate,
                CreatedByUserID = _incidentEntity.CreatedByUserID,
                ModifiedDate = _incidentEntity.ModifiedDate,
                ModifiedByUserID = _incidentEntity.ModifiedByUserID,
                IsDeleted = _incidentEntity.IsDeleted,
                AdditionalReference = _incidentEntity.AdditionalReference
            };
        }

        public async Task<int> SaveAndReturnAsync(int userId)
        {
            try
            {
                // Set audit fields for new incidents
                if (_incidentEntity.IncidentCaseID == 0)
                {
                    _incidentEntity.CreatedByUserID = userId;
                    _incidentEntity.CreatedDate = DateTimeOffset.UtcNow;
                    _incidentEntity.ModifiedByUserID = userId;
                    _incidentEntity.ModifiedDate = DateTimeOffset.UtcNow;
                    _incidentEntity.IsDeleted = false;

                    // Generate case number if not provided
                    if (string.IsNullOrEmpty(_incidentEntity.CaseNumber))
                    {
                        _incidentEntity.CaseNumber = GenerateCaseNumber(_incidentEntity.UserAreaID);
                    }

                    // Set default status if not provided
                    if (_incidentEntity.IncidentStatusTypeID == null)
                    {
                        _incidentEntity.IncidentStatusTypeID = (int)Bus.Core.Enums.IncidentStatusType.Open;
                    }

                    _dbContext.IncidentCases.Add(_incidentEntity);
                }
                else
                {
                    // Update existing incident
                    _incidentEntity.ModifiedByUserID = userId;
                    _incidentEntity.ModifiedDate = DateTimeOffset.UtcNow;
                    _dbContext.IncidentCases.Update(_incidentEntity);
                }

                await _dbContext.SaveChangesAsync();
                return _incidentEntity.IncidentCaseID;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error saving incident: {ex.Message}", ex);
            }
        }

        public async Task SaveAsync(int userId)
        {
            await SaveAndReturnAsync(userId);
        }

        public async Task CloseAsync(int userId, string closureNotes = "")
        {
            _incidentEntity.ClosedByUserID = userId;
            _incidentEntity.ClosedDate = DateTimeOffset.UtcNow;
            _incidentEntity.ClosureNotes = closureNotes;
            _incidentEntity.IncidentStatusTypeID = (int)Core.Enums.IncidentStatusType.Closed;
            _incidentEntity.ModifiedByUserID = userId;
            _incidentEntity.ModifiedDate = DateTimeOffset.UtcNow;

            _dbContext.IncidentCases.Update(_incidentEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ArchiveAsync(int userId)
        {
            _incidentEntity.IsDeleted = true;
            _incidentEntity.ModifiedByUserID = userId;
            _incidentEntity.ModifiedDate = DateTimeOffset.UtcNow;

            _dbContext.IncidentCases.Update(_incidentEntity);
            await _dbContext.SaveChangesAsync();
        }

        #endregion

        #region Static Methods

        public static async Task<List<IncidentCaseViewModel>> GetAllIncidentsAsync(int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.IncidentCases
                .Where(i => i.IsDeleted == false || i.IsDeleted == null);

            if (userAreaId.HasValue)
            {
                query = query.Where(i => i.UserAreaID == userAreaId.Value);
            }

            var incidents = await query
                .OrderByDescending(i => i.CreatedDate)
                .ToListAsync();

            return incidents.Select(i => new IncidentCaseViewModel
            {
                IncidentCaseID = i.IncidentCaseID,
                UserAreaID = i.UserAreaID,
                CaseNumber = i.CaseNumber,
                IncidentTypeID = i.IncidentTypeID,
                IncidentDate = i.IncidentDate,
                ReportedDate = i.ReportedDate,
                LocationID = i.LocationID,
                Description = i.Description,
                IncidentSeverityTypeID = i.IncidentSeverityTypeID,
                IncidentStatusTypeID = i.IncidentStatusTypeID,
                IncidentPriorityTypeID = i.IncidentPriorityTypeID,
                ReportedByUserID = i.ReportedByUserID,
                AssignedToUserID = i.AssignedToUserID,
                InvolvedEmployeeID = i.InvolvedEmployeeID,
                InvestigationStartDate = i.InvestigationStartDate,
                InvestigationEndDate = i.InvestigationEndDate,
                RootCause = i.RootCause,
                CorrectiveActions = i.CorrectiveActions,
                PreventiveActions = i.PreventiveActions,
                ClosedDate = i.ClosedDate,
                ClosedByUserID = i.ClosedByUserID,
                ClosureNotes = i.ClosureNotes,
                CreatedDate = i.CreatedDate,
                CreatedByUserID = i.CreatedByUserID,
                ModifiedDate = i.ModifiedDate,
                ModifiedByUserID = i.ModifiedByUserID,
                IsDeleted = i.IsDeleted,
                AdditionalReference = i.AdditionalReference
            }).ToList();
        }

        public static async Task<IncidentCaseViewModel?> GetIncidentByIdAsync(int incidentCaseId, int userAreaId)
        {
            using var context = new V7DBContext();
            var incident = await context.IncidentCases
                .FirstOrDefaultAsync(i => i.IncidentCaseID == incidentCaseId && i.UserAreaID == userAreaId && (i.IsDeleted == false || i.IsDeleted == null));

            if (incident == null)
                return null;

            return new IncidentCaseViewModel
            {
                IncidentCaseID = incident.IncidentCaseID,
                UserAreaID = incident.UserAreaID,
                CaseNumber = incident.CaseNumber,
                IncidentTypeID = incident.IncidentTypeID,
                IncidentDate = incident.IncidentDate,
                ReportedDate = incident.ReportedDate,
                LocationID = incident.LocationID,
                Description = incident.Description,
                IncidentSeverityTypeID = incident.IncidentSeverityTypeID,
                IncidentStatusTypeID = incident.IncidentStatusTypeID,
                IncidentPriorityTypeID = incident.IncidentPriorityTypeID,
                ReportedByUserID = incident.ReportedByUserID,
                AssignedToUserID = incident.AssignedToUserID,
                InvolvedEmployeeID = incident.InvolvedEmployeeID,
                InvestigationStartDate = incident.InvestigationStartDate,
                InvestigationEndDate = incident.InvestigationEndDate,
                RootCause = incident.RootCause,
                CorrectiveActions = incident.CorrectiveActions,
                PreventiveActions = incident.PreventiveActions,
                ClosedDate = incident.ClosedDate,
                ClosedByUserID = incident.ClosedByUserID,
                ClosureNotes = incident.ClosureNotes,
                CreatedDate = incident.CreatedDate,
                CreatedByUserID = incident.CreatedByUserID,
                ModifiedDate = incident.ModifiedDate,
                ModifiedByUserID = incident.ModifiedByUserID,
                IsDeleted = incident.IsDeleted,
                AdditionalReference = incident.AdditionalReference
            };
        }

        public static async Task<(int IncidentCaseID, int UserAreaID)?> GetIncidentInfoAsync(int incidentCaseId)
        {
            using var context = new V7DBContext();
            var incident = await context.IncidentCases
                .Where(i => i.IncidentCaseID == incidentCaseId && (i.IsDeleted == false || i.IsDeleted == null))
                .Select(i => new { i.IncidentCaseID, i.UserAreaID })
                .FirstOrDefaultAsync();

            return incident != null ? (incident.IncidentCaseID, incident.UserAreaID) : null;
        }

        public static async Task<List<IncidentCaseViewModel>> GetIncidentsByStatusAsync(int status, int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.IncidentCases
                .Where(i => i.IncidentStatusTypeID == status && (i.IsDeleted == false || i.IsDeleted == null));

            if (userAreaId.HasValue)
            {
                query = query.Where(i => i.UserAreaID == userAreaId.Value);
            }

            var incidents = await query
                .OrderByDescending(i => i.CreatedDate)
                .ToListAsync();

            return incidents.Select(i => new IncidentCaseViewModel
            {
                IncidentCaseID = i.IncidentCaseID,
                UserAreaID = i.UserAreaID,
                CaseNumber = i.CaseNumber,
                IncidentTypeID = i.IncidentTypeID,
                IncidentDate = i.IncidentDate,
                ReportedDate = i.ReportedDate,
                LocationID = i.LocationID,
                Description = i.Description,
                IncidentSeverityTypeID = i.IncidentSeverityTypeID,
                IncidentStatusTypeID = i.IncidentStatusTypeID,
                IncidentPriorityTypeID = i.IncidentPriorityTypeID,
                ReportedByUserID = i.ReportedByUserID,
                AssignedToUserID = i.AssignedToUserID,
                InvolvedEmployeeID = i.InvolvedEmployeeID,
                InvestigationStartDate = i.InvestigationStartDate,
                InvestigationEndDate = i.InvestigationEndDate,
                RootCause = i.RootCause,
                CorrectiveActions = i.CorrectiveActions,
                PreventiveActions = i.PreventiveActions,
                ClosedDate = i.ClosedDate,
                ClosedByUserID = i.ClosedByUserID,
                ClosureNotes = i.ClosureNotes,
                CreatedDate = i.CreatedDate,
                CreatedByUserID = i.CreatedByUserID,
                ModifiedDate = i.ModifiedDate,
                ModifiedByUserID = i.ModifiedByUserID,
                IsDeleted = i.IsDeleted,
                AdditionalReference = i.AdditionalReference
            }).ToList();
        }

        public static async Task<List<dynamic>> GetIncidentSeveritiesAsync()
        {
            using var context = new V7DBContext();
            var severities = await context.IncidentSeverityTypes
                .Where(s => s.IsActive == true || s.IsActive == null)
                .OrderBy(s => s.SeverityLevel)
                .Select(s => new
                {
                    IncidentSeverityTypeID = s.IncidentSeverityTypeID,
                    Reference = s.Reference,
                    Title = s.Title,
                    SeverityLevel = s.SeverityLevel,
                    ColorCode = s.ColorCode,
                    Description = s.Description
                })
                .ToListAsync();

            return severities.Cast<dynamic>().ToList();
        }

        public static async Task<List<dynamic>> GetIncidentStatusesAsync()
        {
            using var context = new V7DBContext();
            var statuses = await context.IncidentStatusTypes
                .Where(s => s.IsActive == true || s.IsActive == null)
                .OrderBy(s => s.StatusOrder)
                .Select(s => new
                {
                    IncidentStatusTypeID = s.IncidentStatusTypeID,
                    Reference = s.Reference,
                    Title = s.Title,
                    StatusOrder = s.StatusOrder,
                    ColorCode = s.ColorCode,
                    Description = s.Description
                })
                .ToListAsync();

            return statuses.Cast<dynamic>().ToList();
        }

        public static async Task<List<dynamic>> GetIncidentPrioritiesAsync()
        {
            using var context = new V7DBContext();
            var priorities = await context.IncidentPriorityTypes
                .Where(p => p.IsActive == true || p.IsActive == null)
                .OrderBy(p => p.PriorityLevel)
                .Select(p => new
                {
                    IncidentPriorityTypeID = p.IncidentPriorityTypeID,
                    Reference = p.Reference,
                    Title = p.Title,
                    PriorityLevel = p.PriorityLevel,
                    ColorCode = p.ColorCode,
                    Description = p.Description
                })
                .ToListAsync();

            return priorities.Cast<dynamic>().ToList();
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
