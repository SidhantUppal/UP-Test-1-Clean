using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HazardViewModel
{
    [Key]
    public int HazardID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string? Reference { get; set; }

    public string? Description { get; set; }

    public int UserAreaID { get; set; }

    public int? HazardCategoryTypeID { get; set; }

    public int? HazardSeverityTypeID { get; set; }

    public int? InherentLikelihood { get; set; }

    public int? InherentConsequence { get; set; }

    public int? InherentRiskScore { get; set; }

    public string? LegalRequirements { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? LocationID { get; set; }

    [StringLength(255)]
    public string? LocationName { get; set; }

    public int? AssignedToUserID { get; set; }

    public int? AssignedToRoleID { get; set; }

    public DateTimeOffset? AssignedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
