using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRequirementFulfillment", Schema = "V7")]
[Index("DocumentID", Name = "IX_DocumentRequirementFulfillment_DocumentID")]
[Index("RequirementID", Name = "IX_DocumentRequirementFulfillment_RequirementID")]
[Index("Status", Name = "IX_DocumentRequirementFulfillment_Status")]
public partial class DocumentRequirementFulfillment
{
    [Key]
    public int FulfillmentID { get; set; }

    public int RequirementID { get; set; }

    public int DocumentID { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    public int SubmittedByUserID { get; set; }

    public DateTimeOffset SubmittedDate { get; set; }

    public int? ReviewedByUserID { get; set; }

    public DateTimeOffset? ReviewedDate { get; set; }

    public string? ReviewNotes { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    [ForeignKey("DocumentID")]
    [InverseProperty("DocumentRequirementFulfillments")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("RequirementID")]
    [InverseProperty("DocumentRequirementFulfillments")]
    public virtual DocumentRequirement Requirement { get; set; } = null!;

    [ForeignKey("ReviewedByUserID")]
    [InverseProperty("DocumentRequirementFulfillmentReviewedByUsers")]
    public virtual User? ReviewedByUser { get; set; }

    [ForeignKey("SubmittedByUserID")]
    [InverseProperty("DocumentRequirementFulfillmentSubmittedByUsers")]
    public virtual User SubmittedByUser { get; set; } = null!;
}
