using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BSSTask", Schema = "V7")]
[Index("UserAreaID", "CompletedDate", "ArchivedDate", "DueDate", Name = "IX_Task_CompletedArchivedDue")]
[Index("TaskScheduleID", "ArchivedDate", "DueDate", Name = "IX_Task_TaskScheduleID_ArchivedDate_DueDate")]
[Index("UserAreaID", "TaskID", Name = "IX_Task_UserAreaIDTaskID")]
[Index("UserAreaID", "CompletedDate", "ArchivedDate", "TaskTypeID", "IsLiveDate", Name = "IX_Task_UserAreaID_CompletedDate_ArchivedDate_TaskTypeID_IsLiveDate_includes")]
[Index("UserAreaID", "CompletedDate", "ArchivedDate", Name = "IX_Task_UserAreaID_CompletedDate_ArchivedDate_includes")]
[Index("UserAreaID", "CompletedDate", "TaskTypeID", Name = "IX_Task_UserAreaID_CompletedDate_TaskTypeID_includes")]
public partial class BSSTask
{
    [Key]
    public int TaskID { get; set; }

    [StringLength(1024)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    public int UserAreaID { get; set; }

    public int? LocationID { get; set; }

    public int TaskTypeID { get; set; }

    public int? TaskScheduleID { get; set; }

    public int? TaskSeverityID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? TaskSeverity { get; set; }

    public DateTimeOffset? DueFromDate { get; set; }

    public DateTimeOffset? DueByDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ParentID { get; set; }

    public int? TaskStatusTypeID { get; set; }

    public string? CompletedBySignature { get; set; }

    [StringLength(100)]
    public string? CompletedByFullName { get; set; }

    public bool IsAnonymous { get; set; }

    public bool IsAnonymouslyReported { get; set; }

    public bool CanOneEmployeeAccept { get; set; }

    public int? CompletedBySignatureAttachmentID { get; set; }

    public DateTimeOffset? DueFrom { get; set; }

    public bool IsEvidenceRequiredToClose { get; set; }

    [StringLength(1024)]
    public string? AssetDetails { get; set; }

    public bool IsCreatorApprovalRequiredToClose { get; set; }

    public bool IsSubmittedForApproval { get; set; }

    public DateTimeOffset? IsLiveDate { get; set; }

    [StringLength(30)]
    public string? RelatedDocumentTypeName { get; set; }

    [StringLength(255)]
    public string? RelatedDocumentTitle { get; set; }

    public int? TribunalCaseID { get; set; }

    public int? HRCaseID { get; set; }

    public int? HRTypeID { get; set; }

    public DateTimeOffset? ExpiredDate { get; set; }

    public int? TempID { get; set; }

    public bool HasTravelCost { get; set; }

    [StringLength(150)]
    public string? ExtraLocationIDList { get; set; }

    public int? InProgressByUserID { get; set; }

    public DateTimeOffset? InProgressStartDate { get; set; }

    public bool IsPooledTask { get; set; }

    public int MaxConcurrentWorkers { get; set; }

    public bool RequireAllUsersComplete { get; set; }

    public DateTimeOffset? ReturnedToPoolDate { get; set; }

    public int? ReturnedToPoolByUserID { get; set; }

    [StringLength(1024)]
    public string? ReturnToPoolReason { get; set; }

    public bool IsOpenToAll { get; set; }

    public int? OpenToOrgGroupID { get; set; }

    public int? OpenToLocationID { get; set; }

    public int? TaskPriorityID { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<AbsenceRequirement> AbsenceRequirements { get; set; } = new List<AbsenceRequirement>();

    [InverseProperty("Task")]
    public virtual ICollection<AbsenceTask> AbsenceTasks { get; set; } = new List<AbsenceTask>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("BSSTaskArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<ChecklistTemplateEnrolment> ChecklistTemplateEnrolments { get; set; } = new List<ChecklistTemplateEnrolment>();

    [ForeignKey("CompletedBySignatureAttachmentID")]
    [InverseProperty("BSSTasks")]
    public virtual Attachment? CompletedBySignatureAttachment { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; } = new List<ContractorSiteAccessRequirement>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("BSSTaskCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Task")]
    public virtual ICollection<DSECaseTask> DSECaseTasks { get; set; } = new List<DSECaseTask>();

    [InverseProperty("Task")]
    public virtual ICollection<DocRegisterTask> DocRegisterTasks { get; set; } = new List<DocRegisterTask>();

    [InverseProperty("Task")]
    public virtual ICollection<DocumentRegisterDocumentTask> DocumentRegisterDocumentTasks { get; set; } = new List<DocumentRegisterDocumentTask>();

    [InverseProperty("Task")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlocks { get; set; } = new List<EmployeeTextBlock>();

    [ForeignKey("HRCaseID")]
    [InverseProperty("BSSTasks")]
    public virtual HRCase? HRCase { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<HRCaseTask> HRCaseTasks { get; set; } = new List<HRCaseTask>();

    [ForeignKey("HRTypeID")]
    [InverseProperty("BSSTasks")]
    public virtual HRType? HRType { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<HazardReport> HazardReports { get; set; } = new List<HazardReport>();

    [ForeignKey("InProgressByUserID")]
    [InverseProperty("BSSTaskInProgressByUsers")]
    public virtual User? InProgressByUser { get; set; }

    [InverseProperty("Parent")]
    public virtual ICollection<BSSTask> InverseParent { get; set; } = new List<BSSTask>();

    [ForeignKey("LocationID")]
    [InverseProperty("BSSTasks")]
    public virtual Location? Location { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("BSSTaskModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual BSSTask? Parent { get; set; }

    [InverseProperty("GeneratedTask")]
    public virtual ICollection<ProcessStepExecution> ProcessStepExecutions { get; set; } = new List<ProcessStepExecution>();

    [ForeignKey("ReturnedToPoolByUserID")]
    [InverseProperty("BSSTaskReturnedToPoolByUsers")]
    public virtual User? ReturnedToPoolByUser { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<TaskActivity> TaskActivities { get; set; } = new List<TaskActivity>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskAssignmentLog> TaskAssignmentLogs { get; set; } = new List<TaskAssignmentLog>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskAttachment> TaskAttachments { get; set; } = new List<TaskAttachment>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskClassification> TaskClassifications { get; set; } = new List<TaskClassification>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskContractorCompany> TaskContractorCompanies { get; set; } = new List<TaskContractorCompany>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskEmployee> TaskEmployees { get; set; } = new List<TaskEmployee>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskEscalationLog> TaskEscalationLogs { get; set; } = new List<TaskEscalationLog>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskNonEmployee> TaskNonEmployees { get; set; } = new List<TaskNonEmployee>();

    [InverseProperty("Task")]
    public virtual ICollection<TaskOrgGroup> TaskOrgGroups { get; set; } = new List<TaskOrgGroup>();

    [ForeignKey("TaskPriorityID")]
    [InverseProperty("BSSTasks")]
    public virtual TaskPriority? TaskPriority { get; set; }

    [InverseProperty("Task")]
    public virtual ICollection<TaskReassignmentLog> TaskReassignmentLogs { get; set; } = new List<TaskReassignmentLog>();

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("BSSTasks")]
    public virtual TaskSchedule? TaskSchedule { get; set; }

    [ForeignKey("TaskSeverityID")]
    [InverseProperty("BSSTasks")]
    public virtual TaskSeverity? TaskSeverityNavigation { get; set; }

    [ForeignKey("TaskStatusTypeID")]
    [InverseProperty("BSSTasks")]
    public virtual TaskStatusType? TaskStatusType { get; set; }

    [ForeignKey("TaskTypeID")]
    [InverseProperty("BSSTasks")]
    public virtual TaskType TaskType { get; set; } = null!;

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("BSSTasks")]
    public virtual TribunalCase? TribunalCase { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("BSSTasks")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("Task")]
    public virtual ICollection<UserTextBlock> UserTextBlocks { get; set; } = new List<UserTextBlock>();

    [InverseProperty("Task")]
    public virtual ICollection<WalkAssignment> WalkAssignments { get; set; } = new List<WalkAssignment>();
}
