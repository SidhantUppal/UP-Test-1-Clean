using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class GenericStatusTypeViewModel
{
    [Key]
    public int GenericStatusTypeID { get; set; }

    [StringLength(30)]
    public string Type { get; set; } = null!;

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(150)]
    public string? Title { get; set; }

    // Additional Properties
}
