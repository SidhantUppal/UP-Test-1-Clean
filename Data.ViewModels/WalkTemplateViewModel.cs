using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkTemplateViewModel
{
    [Key]
    public int WalkTemplateID { get; set; }

    public int TagTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? MaxPreStartDuration { get; set; }

    public int? MaxPostStartDuration { get; set; }

    public int? MaxExtensionDuration { get; set; }

    // Additional Properties
}
