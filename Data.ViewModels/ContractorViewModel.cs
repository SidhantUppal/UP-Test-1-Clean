using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorViewModel
{
    [Key]
    public int ContractorID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string CompanyName { get; set; } = null!;

    [StringLength(255)]
    public string ContactPersonName { get; set; } = null!;

    [StringLength(255)]
    public string Email { get; set; } = null!;

    [StringLength(50)]
    public string? Phone { get; set; }

    [StringLength(500)]
    public string? StreetAddress { get; set; }

    [StringLength(100)]
    public string? City { get; set; }

    [StringLength(50)]
    public string? State { get; set; }

    [StringLength(20)]
    public string? PostalCode { get; set; }

    [StringLength(100)]
    public string? Country { get; set; }

    [StringLength(100)]
    public string? LicenseNumber { get; set; }

    public DateTimeOffset? InsuranceExpiryDate { get; set; }

    [StringLength(50)]
    public string? CertificationLevel { get; set; }

    [StringLength(500)]
    public string? SpecialtyAreas { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    public bool? IsActive { get; set; }

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
