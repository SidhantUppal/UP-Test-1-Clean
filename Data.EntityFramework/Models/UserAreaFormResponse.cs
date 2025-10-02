using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaFormResponse", Schema = "V7")]
public partial class UserAreaFormResponse
{
    [Key]
    public int UserAreaFormResponseID { get; set; }

    public int? OriginalUserAreaFormResponseID { get; set; }

    public byte Version { get; set; }

    [StringLength(20)]
    public string Status { get; set; } = null!;

    public int UserAreaFormID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    public string? QuestionResponseData { get; set; }

    [StringLength(1000)]
    public string? AttachmentIDList { get; set; }

    [StringLength(1000)]
    public string? TaskIDList { get; set; }

    public DateTimeOffset? SubmissionDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaFormResponseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("UserAreaFormResponse")]
    public virtual ICollection<ChecklistResponseDatum> ChecklistResponseData { get; set; } = new List<ChecklistResponseDatum>();

    [InverseProperty("OriginalUserAreaFormResponse")]
    public virtual ICollection<ChecklistTemplateEnrolment> ChecklistTemplateEnrolments { get; set; } = new List<ChecklistTemplateEnrolment>();

    [InverseProperty("UserAreaFormResponse")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; } = new List<ContractorSiteAccessRequirement>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaFormResponseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("UserAreaFormResponses")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("UserAreaFormResponses")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaFormResponseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("UserAreaFormResponses")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaFormResponses")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaFormID")]
    [InverseProperty("UserAreaFormResponses")]
    public virtual UserAreaForm UserAreaForm { get; set; } = null!;
}
