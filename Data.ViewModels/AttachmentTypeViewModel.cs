using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentTypeViewModel
{
    [Key]
    public int AttachmentTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    // Additional Properties
}
