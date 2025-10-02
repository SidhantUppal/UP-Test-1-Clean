using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistSectorTypeViewModel
{
    [Key]
    public int ChecklistSectorTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
