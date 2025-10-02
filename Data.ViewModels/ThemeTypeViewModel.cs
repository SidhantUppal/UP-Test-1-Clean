using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ThemeTypeViewModel
{
    [Key]
    public int ThemeTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(255)]
    public string? CustomCultureRegionString { get; set; }

    public string? CssFolderRelativePath { get; set; }

    public string? ImagesFolderRelativePath { get; set; }

    public bool IsLive { get; set; }

    // Additional Properties
}
