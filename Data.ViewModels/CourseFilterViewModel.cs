using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseFilterViewModel
{
    [Key]
    public int CourseFilterID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string FilterName { get; set; } = null!;

    [StringLength(50)]
    public string FilterType { get; set; } = null!;

    [StringLength(255)]
    public string FilterValue { get; set; } = null!;

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
