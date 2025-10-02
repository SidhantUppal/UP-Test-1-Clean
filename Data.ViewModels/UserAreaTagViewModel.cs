using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTagViewModel
{
    [Key]
    public int UserAreaTagID { get; set; }

    public int UserAreaID { get; set; }

    public int TagTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    // Additional Properties
}
