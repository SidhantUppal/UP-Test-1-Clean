using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BSSTaskViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
