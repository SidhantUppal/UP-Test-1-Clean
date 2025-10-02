using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LegalRegister")]
[Index("Name", Name = "IX_LegalRegister_Name")]
public partial class LegalRegister
{
    [Key]
    public int LegalRegisterID { get; set; }

    [StringLength(500)]
    public string Name { get; set; } = null!;

    [StringLength(1000)]
    public string? Link { get; set; }

    public DateTimeOffset? LatestUpdate { get; set; }

    [StringLength(50)]
    public string? RiskLevel { get; set; }

    [StringLength(50)]
    public string? ComplianceStatus { get; set; }

    public string? Notes { get; set; }

    [StringLength(200)]
    public string? IndustryName { get; set; }

    [StringLength(100)]
    public string? LegislationType { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [StringLength(100)]
    public string? CreatedBy { get; set; }

    [StringLength(100)]
    public string? ModifiedBy { get; set; }

    public DateTime? LastViewedDate { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? ResponsiblePersonId { get; set; }

    [StringLength(20)]
    public string EntryType { get; set; } = null!;

    [StringLength(50)]
    public string? UserDocumentType { get; set; }

    [InverseProperty("LegalRegister")]
    public virtual ICollection<LegalRegisterAttachment> LegalRegisterAttachments { get; set; } = new List<LegalRegisterAttachment>();
}
