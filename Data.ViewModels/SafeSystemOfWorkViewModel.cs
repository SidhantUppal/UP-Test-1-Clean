using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkViewModel
{
    [Key]
    public int SafeSystemOfWorkID { get; set; }

    public int SafeSystemOfWorkTypeID { get; set; }

    public int SafeSystemOfWorkTemplateID { get; set; }

    public int ApprovalStatusTypeID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int UserAreaID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    public int? OriginalSafeSystemOfWorkID { get; set; }

    public int Version { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? LocationDetails { get; set; }

    public string? DurationDetails { get; set; }

    public string? RelatedRecordDetails { get; set; }

    public DateTimeOffset? WorkStartDate { get; set; }

    public DateTimeOffset? WorkEndDate { get; set; }

    public DateTimeOffset? ValidFromDate { get; set; }

    public DateTimeOffset? ValidToDate { get; set; }

    public DateTimeOffset? IssueDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public string? Signature { get; set; }

    public bool IsEnvironmental { get; set; }

    public bool IncludePPEOptions { get; set; }

    public bool IncludeRiskAssessmentOptions { get; set; }

    public bool IncludeSSOWLinks { get; set; }

    public bool IncludeAdvancedDetails { get; set; }

    public bool IsUploadedPermit { get; set; }

    public int? PermitAttachmentID { get; set; }

    public int? ContractorCompanyID { get; set; }

    public DateTimeOffset? ReviewDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
