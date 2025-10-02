using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OperationTypeViewModel
{
    [Key]
    public int OperationTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
