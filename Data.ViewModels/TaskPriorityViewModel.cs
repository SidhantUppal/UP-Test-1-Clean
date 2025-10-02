using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskPriorityViewModel
{
    [Key]
    public int TaskPriorityID { get; set; }

    [StringLength(50)]
    public string PriorityName { get; set; } = null!;

    [StringLength(20)]
    public string PriorityCode { get; set; } = null!;

    public int PriorityLevel { get; set; }

    [StringLength(7)]
    public string? ColorCode { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    // Additional Properties
}
