using Bus.Core;
using Bus.Core.Interfaces;
using Data.EntityFramework;
using Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Bus.Tasks
{
    public class BSSTask : BusBase<V7DBContext>, IDisposable
    {
        private Data.EntityFramework.Models.BSSTask _taskEntity;

        #region Constructors

        /// <summary>
        /// Default constructor - creates new empty task
        /// </summary>
        public BSSTask() : base()
        {
            _taskEntity = new Data.EntityFramework.Models.BSSTask();
        }

        /// <summary>
        /// Constructor with existing DbContext
        /// </summary>
        public BSSTask(V7DBContext context) : base(context)
        {
            _taskEntity = new Data.EntityFramework.Models.BSSTask();
        }

        /// <summary>
        /// Constructor to load existing task by ID
        /// </summary>
        public BSSTask(int taskId, int userAreaId) : base()
        {
            LoadAsync(taskId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor with DbContext to load existing task by ID
        /// </summary>
        public BSSTask(V7DBContext context, int taskId, int userAreaId) : base(context)
        {
            LoadAsync(taskId, userAreaId).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel
        /// </summary>
        public BSSTask(BSSTaskViewModel model) : base()
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        /// <summary>
        /// Constructor from ViewModel with existing DbContext
        /// </summary>
        public BSSTask(V7DBContext context, BSSTaskViewModel model) : base(context)
        {
            InitializeFromViewModelAsync(model).Wait();
        }

        #endregion

        #region Properties

        public int TaskID
        {
            get { return _taskEntity.TaskID; }
            set { _taskEntity.TaskID = value; }
        }

        public string Title
        {
            get { return _taskEntity.Title ?? string.Empty; }
            set { _taskEntity.Title = value; }
        }

        public string? Description
        {
            get { return _taskEntity.Description; }
            set { _taskEntity.Description = value; }
        }

        public string? Reference
        {
            get { return _taskEntity.Reference; }
            set { _taskEntity.Reference = value; }
        }

        public int UserAreaID
        {
            get { return _taskEntity.UserAreaID; }
            set { _taskEntity.UserAreaID = value; }
        }

        public int? LocationID
        {
            get { return _taskEntity.LocationID; }
            set { _taskEntity.LocationID = value; }
        }

        public int TaskTypeID
        {
            get { return _taskEntity.TaskTypeID; }
            set { _taskEntity.TaskTypeID = value; }
        }

        public int? TaskScheduleID
        {
            get { return _taskEntity.TaskScheduleID; }
            set { _taskEntity.TaskScheduleID = value; }
        }

        public int? TaskSeverityID
        {
            get { return _taskEntity.TaskSeverityID; }
            set { _taskEntity.TaskSeverityID = value; }
        }

        public DateTimeOffset? DueDate
        {
            get { return _taskEntity.DueDate; }
            set { _taskEntity.DueDate = value; }
        }

        public DateTimeOffset? DueFrom
        {
            get { return _taskEntity.DueFrom; }
            set { _taskEntity.DueFrom = value; }
        }

        public DateTimeOffset? CompletedDate
        {
            get { return _taskEntity.CompletedDate; }
            set { _taskEntity.CompletedDate = value; }
        }

        public string? CompletedByFullName
        {
            get { return _taskEntity.CompletedByFullName; }
            set { _taskEntity.CompletedByFullName = value; }
        }

        public string? CompletedBySignature
        {
            get { return _taskEntity.CompletedBySignature; }
            set { _taskEntity.CompletedBySignature = value; }
        }

        public int CreatedByUserID
        {
            get { return _taskEntity.CreatedByUserID; }
            set { _taskEntity.CreatedByUserID = value; }
        }

        public DateTimeOffset CreatedDate
        {
            get { return _taskEntity.CreatedDate; }
            set { _taskEntity.CreatedDate = value; }
        }

        public int? ModifiedByUserID
        {
            get { return _taskEntity.ModifiedByUserID; }
            set { _taskEntity.ModifiedByUserID = value; }
        }

        public DateTimeOffset? ModifiedDate
        {
            get { return _taskEntity.ModifiedDate; }
            set { _taskEntity.ModifiedDate = value; }
        }

        public int? ArchivedByUserID
        {
            get { return _taskEntity.ArchivedByUserID; }
            set { _taskEntity.ArchivedByUserID = value; }
        }

        public DateTimeOffset? ArchivedDate
        {
            get { return _taskEntity.ArchivedDate; }
            set { _taskEntity.ArchivedDate = value; }
        }

        public int? ParentID
        {
            get { return _taskEntity.ParentID; }
            set { _taskEntity.ParentID = value; }
        }

        public int? TaskStatusTypeID
        {
            get { return _taskEntity.TaskStatusTypeID; }
            set { _taskEntity.TaskStatusTypeID = value; }
        }

        public bool IsAnonymous
        {
            get { return _taskEntity.IsAnonymous; }
            set { _taskEntity.IsAnonymous = value; }
        }

        public bool CanOneEmployeeAccept
        {
            get { return _taskEntity.CanOneEmployeeAccept; }
            set { _taskEntity.CanOneEmployeeAccept = value; }
        }

        public int? CompletedBySignatureAttachmentID
        {
            get { return _taskEntity.CompletedBySignatureAttachmentID; }
            set { _taskEntity.CompletedBySignatureAttachmentID = value; }
        }

        public bool IsEvidenceRequiredToClose
        {
            get { return _taskEntity.IsEvidenceRequiredToClose; }
            set { _taskEntity.IsEvidenceRequiredToClose = value; }
        }

        public string? AssetDetails
        {
            get { return _taskEntity.AssetDetails; }
            set { _taskEntity.AssetDetails = value; }
        }

        public bool IsCreatorApprovalRequiredToClose
        {
            get { return _taskEntity.IsCreatorApprovalRequiredToClose; }
            set { _taskEntity.IsCreatorApprovalRequiredToClose = value; }
        }

        public bool IsSubmittedForApproval
        {
            get { return _taskEntity.IsSubmittedForApproval; }
            set { _taskEntity.IsSubmittedForApproval = value; }
        }

        public DateTimeOffset? IsLiveDate
        {
            get { return _taskEntity.IsLiveDate; }
            set { _taskEntity.IsLiveDate = value; }
        }

        public string? RelatedDocumentTypeName
        {
            get { return _taskEntity.RelatedDocumentTypeName; }
            set { _taskEntity.RelatedDocumentTypeName = value; }
        }

        public string? RelatedDocumentTitle
        {
            get { return _taskEntity.RelatedDocumentTitle; }
            set { _taskEntity.RelatedDocumentTitle = value; }
        }

        public int? TribunalCaseID
        {
            get { return _taskEntity.TribunalCaseID; }
            set { _taskEntity.TribunalCaseID = value; }
        }

        public int? HRCaseID
        {
            get { return _taskEntity.HRCaseID; }
            set { _taskEntity.HRCaseID = value; }
        }

        public int? HRTypeID
        {
            get { return _taskEntity.HRTypeID; }
            set { _taskEntity.HRTypeID = value; }
        }

        public DateTimeOffset? ExpiredDate
        {
            get { return _taskEntity.ExpiredDate; }
            set { _taskEntity.ExpiredDate = value; }
        }

        public bool HasTravelCost
        {
            get { return _taskEntity.HasTravelCost; }
            set { _taskEntity.HasTravelCost = value; }
        }

        public string? ExtraLocationIDList
        {
            get { return _taskEntity.ExtraLocationIDList; }
            set { _taskEntity.ExtraLocationIDList = value; }
        }

        #endregion

        #region Core Instance Methods

        /// <summary>
        /// Loads an existing task from the database
        /// </summary>
        private async Task LoadAsync(int taskId, int userAreaId)
        {
            if (taskId == 0)
            {
                throw new ArgumentException("Cannot load a Task with an ID of zero", nameof(taskId));
            }

            _taskEntity = await DBContext.BSSTasks
                .FirstOrDefaultAsync(x => x.TaskID == taskId && x.UserAreaID == userAreaId)
                ?? throw new InvalidOperationException($"Cannot find Task ID {taskId} in UserAreaID {userAreaId}");
        }

        /// <summary>
        /// Initializes task from ViewModel
        /// </summary>
        private async Task InitializeFromViewModelAsync(BSSTaskViewModel model)
        {
            if (model.TaskID > 0)
            {
                await LoadAsync(model.TaskID, model.UserAreaID);
            }
            else
            {
                // Create new task entity for new tasks
                _taskEntity = new Data.EntityFramework.Models.BSSTask();
            }

            // Map properties from ViewModel
            this.Title = model.Title;
            this.Description = model.Description;
            this.Reference = model.Reference;
            this.UserAreaID = model.UserAreaID;
            this.LocationID = model.LocationID;
            this.TaskTypeID = model.TaskTypeID;
            this.TaskScheduleID = model.TaskScheduleID;
            this.TaskSeverityID = model.TaskSeverityID;
            this.DueDate = model.DueDate;
            this.DueFrom = model.DueFrom;
            this.CompletedDate = model.CompletedDate;
            this.CompletedByFullName = model.CompletedByFullName;
            this.CompletedBySignature = model.CompletedBySignature;
            this.ParentID = model.ParentID;
            this.TaskStatusTypeID = model.TaskStatusTypeID;
            this.IsAnonymous = model.IsAnonymous;
            this.CanOneEmployeeAccept = model.CanOneEmployeeAccept;
            this.CompletedBySignatureAttachmentID = model.CompletedBySignatureAttachmentID;
            this.IsEvidenceRequiredToClose = model.IsEvidenceRequiredToClose;
            this.AssetDetails = model.AssetDetails;
            this.IsCreatorApprovalRequiredToClose = model.IsCreatorApprovalRequiredToClose;
            this.IsSubmittedForApproval = model.IsSubmittedForApproval;
            this.IsLiveDate = model.IsLiveDate;
            this.RelatedDocumentTypeName = model.RelatedDocumentTypeName;
            this.RelatedDocumentTitle = model.RelatedDocumentTitle;
            this.TribunalCaseID = model.TribunalCaseID;
            this.HRCaseID = model.HRCaseID;
            this.HRTypeID = model.HRTypeID;
            this.ExpiredDate = model.ExpiredDate;
            this.HasTravelCost = model.HasTravelCost;
            this.ExtraLocationIDList = model.ExtraLocationIDList;
            
            // Map audit fields from BSSTaskViewModel for new tasks
            if (model.TaskID == 0) // New task
            {
                this.CreatedDate = model.CreatedDate;
                this.CreatedByUserID = model.CreatedByUserID;
            }
            else // Existing task
            {
                this.ModifiedDate = model.ModifiedDate;
                this.ModifiedByUserID = model.ModifiedByUserID ?? 0;
                this.ArchivedDate = model.ArchivedDate;
                this.ArchivedByUserID = model.ArchivedByUserID;
            }
        }

        /// <summary>
        /// Saves the task to the database
        /// </summary>
        public async Task SaveAsync(int userId)
        {
            if (_taskEntity.TaskID == 0)
            {
                // New task - set creation audit fields only if not already set from BSSTaskViewModel
                if (_taskEntity is IUpdatableEntity updatableTask)
                {
                    // Only set audit fields if they haven't been set from BSSTaskViewModel
                    if (_taskEntity.CreatedDate == DateTime.MinValue || _taskEntity.CreatedByUserID == 0)
                    {
                        SetCreatedEntity(updatableTask, userId);
                    }
                }
                DBContext.BSSTasks.Add(_taskEntity);
            }
            else
            {
                // Existing task - set modification audit fields
                if (_taskEntity is IUpdatableEntity updatableTask)
                {
                    SetModifiedEntity(updatableTask, userId);
                }
            }

            await DBContext.SaveChangesAsync();
        }

        /// <summary>
        /// Saves the task and returns the TaskID
        /// </summary>
        public async Task<int> SaveAndReturnAsync(int userId)
        {
            await SaveAsync(userId);
            return _taskEntity.TaskID;
        }

        /// <summary>
        /// Archives the task (soft delete)
        /// </summary>
        public async Task ArchiveAsync(int userId)
        {
            if (_taskEntity is IUpdatableEntity updatableTask)
            {
                SetArchivedEntity(updatableTask, userId);
                SetModifiedEntity(updatableTask, userId);
            }
            await DBContext.SaveChangesAsync();
        }

        /// <summary>
        /// Unarchives the task
        /// </summary>
        public async Task UnArchiveAsync(int userId)
        {
            _taskEntity.ArchivedDate = null;
            _taskEntity.ArchivedByUserID = null;
            
            if (_taskEntity is IUpdatableEntity updatableTask)
            {
                SetModifiedEntity(updatableTask, userId);
            }
            await DBContext.SaveChangesAsync();
        }

        /// <summary>
        /// Completes the task
        /// </summary>
        public async Task CompleteAsync(int userId, string? completedByFullName = null, string? completedBySignature = null)
        {
            _taskEntity.CompletedDate = DateTime.UtcNow;
            _taskEntity.CompletedByFullName = completedByFullName;
            _taskEntity.CompletedBySignature = completedBySignature;

            if (_taskEntity is IUpdatableEntity updatableTask)
            {
                SetModifiedEntity(updatableTask, userId);
            }
            await DBContext.SaveChangesAsync();
        }

        /// <summary>
        /// Gets the task as a ViewModel
        /// </summary>
        public BSSTaskViewModel GetViewModel()
        {
            return new BSSTaskViewModel
            {
                TaskID = this.TaskID,
                Title = this.Title,
                Description = this.Description,
                Reference = this.Reference,
                UserAreaID = this.UserAreaID,
                LocationID = this.LocationID,
                TaskTypeID = this.TaskTypeID,
                TaskScheduleID = this.TaskScheduleID,
                TaskSeverityID = this.TaskSeverityID,
                DueDate = this.DueDate,
                DueFrom = this.DueFrom,
                CompletedDate = this.CompletedDate,
                CompletedByFullName = this.CompletedByFullName,
                CompletedBySignature = this.CompletedBySignature,
                CreatedByUserID = this.CreatedByUserID,
                CreatedDate = this.CreatedDate,
                ModifiedByUserID = this.ModifiedByUserID,
                ModifiedDate = this.ModifiedDate,
                ArchivedByUserID = this.ArchivedByUserID,
                ArchivedDate = this.ArchivedDate,
                ParentID = this.ParentID,
                TaskStatusTypeID = this.TaskStatusTypeID,
                IsAnonymous = this.IsAnonymous,
                CanOneEmployeeAccept = this.CanOneEmployeeAccept,
                CompletedBySignatureAttachmentID = this.CompletedBySignatureAttachmentID,
                IsEvidenceRequiredToClose = this.IsEvidenceRequiredToClose,
                AssetDetails = this.AssetDetails,
                IsCreatorApprovalRequiredToClose = this.IsCreatorApprovalRequiredToClose,
                IsSubmittedForApproval = this.IsSubmittedForApproval,
                IsLiveDate = this.IsLiveDate,
                RelatedDocumentTypeName = this.RelatedDocumentTypeName,
                RelatedDocumentTitle = this.RelatedDocumentTitle,
                TribunalCaseID = this.TribunalCaseID,
                HRCaseID = this.HRCaseID,
                HRTypeID = this.HRTypeID,
                ExpiredDate = this.ExpiredDate,
                HasTravelCost = this.HasTravelCost,
                ExtraLocationIDList = this.ExtraLocationIDList,
                // Additional properties can be populated from related entities if needed
                CreatedByUserName = _taskEntity.CreatedByUser?.FullName,
                ModifiedByUserName = _taskEntity.ModifiedByUser?.FullName,
                ArchivedByUserName = _taskEntity.ArchivedByUser?.FullName
            };
        }

        #endregion

        #region Static Methods for Collections

        /// <summary>
        /// Gets all tasks for a user area
        /// </summary>
        public static async Task<List<BSSTaskViewModel>> GetAllTasksAsync(int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.BSSTasks.Where(t => t.ArchivedDate == null);
            
            if (userAreaId.HasValue)
            {
                query = query.Where(t => t.UserAreaID == userAreaId.Value);
            }

            var tasks = await query.OrderBy(t => t.DueDate).ToListAsync();
            return tasks.Select(t => new BSSTask(context, t.TaskID, t.UserAreaID).GetViewModel()).ToList();
        }

        /// <summary>
        /// Gets overdue tasks
        /// </summary>
        public static async Task<List<BSSTaskViewModel>> GetOverdueTasksAsync(int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var now = DateTime.UtcNow;
            
            var query = context.BSSTasks
                .Where(t => t.ArchivedDate == null 
                         && t.CompletedDate == null
                         && t.DueDate.HasValue 
                         && t.DueDate.Value < now);
                         
            if (userAreaId.HasValue)
            {
                query = query.Where(t => t.UserAreaID == userAreaId.Value);
            }
            
            var tasks = await query.OrderBy(t => t.DueDate).ToListAsync();
            return tasks.Select(t => new BSSTask(context, t.TaskID, t.UserAreaID).GetViewModel()).ToList();
        }

        /// <summary>
        /// Gets tasks by status
        /// </summary>
        public static async Task<List<BSSTaskViewModel>> GetTasksByStatusAsync(int statusTypeId, int? userAreaId = null)
        {
            using var context = new V7DBContext();
            var query = context.BSSTasks
                .Where(t => t.ArchivedDate == null && t.TaskStatusTypeID == statusTypeId);

            if (userAreaId.HasValue)
            {
                query = query.Where(t => t.UserAreaID == userAreaId.Value);
            }

            var tasks = await query.OrderBy(t => t.DueDate).ToListAsync();
            return tasks.Select(t => new BSSTask(context, t.TaskID, t.UserAreaID).GetViewModel()).ToList();
        }

        /// <summary>
        /// Gets a single task by ID
        /// </summary>
        public static async Task<BSSTaskViewModel?> GetTaskByIdAsync(int taskId, int userAreaId)
        {
            try
            {
                var task = new BSSTask(taskId, userAreaId);
                return task.GetViewModel();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        /// <summary>
        /// Gets basic task info by ID (without userAreaId requirement)
        /// </summary>
        public static async Task<(int TaskID, int UserAreaID)?> GetTaskInfoAsync(int taskId)
        {
            using var context = new V7DBContext();
            var task = await context.BSSTasks
                .Where(t => t.TaskID == taskId && t.ArchivedDate == null)
                .Select(t => new { t.TaskID, t.UserAreaID })
                .FirstOrDefaultAsync();

            return task != null ? (task.TaskID, task.UserAreaID) : null;
        }

        #endregion

        #region IDisposable

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                // Any additional cleanup if needed
            }
            base.Dispose(disposing);
        }

        #endregion
    }
}