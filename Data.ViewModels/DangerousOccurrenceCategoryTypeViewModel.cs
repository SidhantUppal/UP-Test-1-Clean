using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DangerousOccurrenceCategoryTypeViewModel
{
    [Key]
    public int DangerousOccurrenceCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(10)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
