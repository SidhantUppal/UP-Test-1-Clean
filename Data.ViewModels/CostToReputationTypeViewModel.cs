using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CostToReputationTypeViewModel
{
    [Key]
    public int CostToReputationTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    // Additional Properties
}
