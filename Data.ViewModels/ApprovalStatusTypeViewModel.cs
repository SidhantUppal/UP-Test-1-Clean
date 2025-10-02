using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ApprovalStatusTypeViewModel
{
    [Key]
    public int ApprovalStatusTypeID { get; set; }

    public bool IsVisible { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
