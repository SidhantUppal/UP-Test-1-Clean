using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EnquiryViewModel
{
    [Key]
    public int EnquiryID { get; set; }

    public int EnquiryTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [StringLength(150)]
    public string Subject { get; set; } = null!;

    public string Comments { get; set; } = null!;

    public DateTimeOffset SubmittedDate { get; set; }

    public string? ProcessedNote { get; set; }

    public int? ProcessedByUserID { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
}
