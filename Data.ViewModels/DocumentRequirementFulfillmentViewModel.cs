using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRequirementFulfillmentViewModel
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

    // Additional Properties
}
