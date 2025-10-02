using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWork", Schema = "V7")]
public partial class SafeSystemOfWork
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

    [ForeignKey("ApprovalStatusTypeID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual ApprovalStatusType ApprovalStatusType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SafeSystemOfWorkArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual ContractorCompany? ContractorCompany { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SafeSystemOfWorkCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("OriginalSafeSystemOfWork")]
    public virtual ICollection<SafeSystemOfWork> InverseOriginalSafeSystemOfWork { get; set; } = new List<SafeSystemOfWork>();

    [ForeignKey("LocationID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SafeSystemOfWorkModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("OriginalSafeSystemOfWorkID")]
    [InverseProperty("InverseOriginalSafeSystemOfWork")]
    public virtual SafeSystemOfWork? OriginalSafeSystemOfWork { get; set; }

    [ForeignKey("PermitAttachmentID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual Attachment? PermitAttachment { get; set; }

    [InverseProperty("SafeSystemOfWork")]
    public virtual ICollection<SafeSystemOfWorkCompetency> SafeSystemOfWorkCompetencies { get; set; } = new List<SafeSystemOfWorkCompetency>();

    [InverseProperty("SafeSystemOfWork")]
    public virtual ICollection<SafeSystemOfWorkLink> SafeSystemOfWorkLinks { get; set; } = new List<SafeSystemOfWorkLink>();

    [InverseProperty("SafeSystemOfWork")]
    public virtual ICollection<SafeSystemOfWorkLocation> SafeSystemOfWorkLocations { get; set; } = new List<SafeSystemOfWorkLocation>();

    [InverseProperty("SafeSystemOfWork")]
    public virtual ICollection<SafeSystemOfWorkLog> SafeSystemOfWorkLogs { get; set; } = new List<SafeSystemOfWorkLog>();

    [ForeignKey("SafeSystemOfWorkTemplateID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual SafeSystemOfWorkTemplate SafeSystemOfWorkTemplate { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkTypeID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual SafeSystemOfWorkType SafeSystemOfWorkType { get; set; } = null!;

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual TextBlockCollection? TextBlockCollection { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("SafeSystemOfWorks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
