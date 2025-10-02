using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class FrequencyTypeViewModel
{
    [Key]
    public int FrequencyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    // Additional Properties
}
