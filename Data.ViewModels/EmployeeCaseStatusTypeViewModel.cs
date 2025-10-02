using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeCaseStatusTypeViewModel
{
    [Key]
    public int EmployeeCaseStatusTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
