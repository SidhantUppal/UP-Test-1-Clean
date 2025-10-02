using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class FolderTypeViewModel
{
    [Key]
    public int FolderTypeID { get; set; }

    [StringLength(255)]
    public string Description { get; set; } = null!;

    public bool IsHidden { get; set; }

    // Additional Properties
}
