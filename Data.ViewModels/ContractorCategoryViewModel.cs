using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorCategoryViewModel
{
    [Key]
    public int ContractorCategoryID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
