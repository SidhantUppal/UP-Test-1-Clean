using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyReviewViewModel
{
    [Key]
    public int PolicyReviewID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int ReviewerUserID { get; set; }

    public DateTimeOffset ReviewDate { get; set; }

    [StringLength(50)]
    public string ReviewType { get; set; } = null!;

    [StringLength(50)]
    public string ReviewStatus { get; set; } = null!;

    public string? ReviewNotes { get; set; }

    public string? RecommendedChanges { get; set; }

    public string? ComplianceCheck { get; set; }

    public string? RegulatoryCheck { get; set; }

    [StringLength(50)]
    public string? ReviewOutcome { get; set; }

    public DateTimeOffset? NextReviewDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
