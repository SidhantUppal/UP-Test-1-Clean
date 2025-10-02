using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UnarchiveLogViewModel
{
    [Key]
    public int UnarchiveLogID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    public string Items { get; set; } = null!;

    [StringLength(255)]
    public string Comments { get; set; } = null!;

    // Additional Properties
}
