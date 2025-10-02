using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LegalRegister", Schema = "V7")]
public partial class LegalRegister1
{
    [Key]
    public int LegalRegisterID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(500)]
    public string Name { get; set; } = null!;

    [StringLength(1000)]
    public string Link { get; set; } = null!;

    [StringLength(100)]
    public string IndustryName { get; set; } = null!;

    [StringLength(50)]
    public string RiskLevel { get; set; } = null!;

    [StringLength(50)]
    public string ComplianceStatus { get; set; } = null!;

    public string? Notes { get; set; }

    public DateTimeOffset LatestUpdate { get; set; }

    public bool IsRecent { get; set; }

    [StringLength(500)]
    public string? LegislationURI { get; set; }

    [StringLength(100)]
    public string? LegislationType { get; set; }

    public int? LegislationYear { get; set; }

    public DateTimeOffset? APILastSync { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("LegalRegister1ArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("LegalRegister1CreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("LegalRegister")]
    public virtual ICollection<LegalRegisterAttachment1> LegalRegisterAttachment1s { get; set; } = new List<LegalRegisterAttachment1>();

    [InverseProperty("LegalRegister")]
    public virtual ICollection<LegalRegisterLinkedRecord> LegalRegisterLinkedRecords { get; set; } = new List<LegalRegisterLinkedRecord>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("LegalRegister1ModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("LegalRegister1s")]
    public virtual UserArea UserArea { get; set; } = null!;
}
