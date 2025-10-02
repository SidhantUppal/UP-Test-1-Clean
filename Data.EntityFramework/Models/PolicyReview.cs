using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyReview", Schema = "V7")]
[Index("PolicyID", Name = "IX_PolicyReview_PolicyID")]
[Index("ReviewerUserID", Name = "IX_PolicyReview_ReviewerUserID")]
public partial class PolicyReview
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

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyReviews")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("ReviewerUserID")]
    [InverseProperty("PolicyReviews")]
    public virtual User ReviewerUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyReviews")]
    public virtual UserArea UserArea { get; set; } = null!;
}
