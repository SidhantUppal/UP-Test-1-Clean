using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CategoryTypeViewModel
{
    [Key]
    public int CategoryTypeID { get; set; }

    [StringLength(50)]
    public string Type { get; set; } = null!;

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public bool IsLive { get; set; }

    // Additional Properties
}
