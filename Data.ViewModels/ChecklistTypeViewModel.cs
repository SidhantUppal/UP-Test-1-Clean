using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistTypeViewModel
{
    [Key]
    public int ChecklistTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public bool IsAudit { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
