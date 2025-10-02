using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class XsltTransformerTypeViewModel
{
    [Key]
    public int XsltTransformerTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    // Additional Properties
}
