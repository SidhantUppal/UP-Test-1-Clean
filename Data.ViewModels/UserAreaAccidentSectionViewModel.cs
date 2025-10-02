using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaAccidentSectionViewModel
{
    [Key]
    public int UserAreaAccidentSectionID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? oldid { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? HelpText { get; set; }

    // Additional Properties
}
