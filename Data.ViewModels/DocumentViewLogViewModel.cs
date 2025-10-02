using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentViewLogViewModel
{
    [Key]
    public int ViewLogID { get; set; }

    public int DocumentID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset ViewedAt { get; set; }

    [StringLength(50)]
    public string ViewMethod { get; set; } = null!;

    public int? ViewDurationSeconds { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    [StringLength(255)]
    public string? GeographicLocation { get; set; }

    // Additional Properties
}
