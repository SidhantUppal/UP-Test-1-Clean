using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SourceStaticDataTypeViewModel
{
    [Key]
    public int SourceStaticDataTypeID { get; set; }

    [StringLength(64)]
    public string? Title { get; set; }

    [StringLength(256)]
    public string? IconFileName { get; set; }

    // Additional Properties
}
