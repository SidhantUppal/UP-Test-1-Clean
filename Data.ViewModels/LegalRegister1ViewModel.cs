using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LegalRegister1ViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
