using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DangerousOccurrenceTypeViewModel
{
    [Key]
    public int DangerousOccurrenceTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int DangerousOccurrenceCategoryTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(20)]
    public string? V5Reference { get; set; }

    public bool IsHidden { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
