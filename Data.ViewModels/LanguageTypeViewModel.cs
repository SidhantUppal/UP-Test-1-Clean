using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LanguageTypeViewModel
{
    [Key]
    public int LanguageTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(10)]
    public string Code { get; set; } = null!;

    public int DefaultRegionTypeID { get; set; }

    // Additional Properties
}
