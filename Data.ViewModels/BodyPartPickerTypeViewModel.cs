using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BodyPartPickerTypeViewModel
{
    [Key]
    public int BodyPartPickerTypeID { get; set; }

    public int? ParentID { get; set; }

    public int BodyPartID { get; set; }

    public bool IsBackView { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
