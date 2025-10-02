using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorComplianceViewModel
{
    [Key]
    public int ComplianceID { get; set; }

    public int ContractorID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string ComplianceType { get; set; } = null!;

    [StringLength(50)]
    public string ComplianceStatus { get; set; } = null!;

    public DateTimeOffset? ExpiryDate { get; set; }

    [StringLength(500)]
    public string? DocumentPath { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
