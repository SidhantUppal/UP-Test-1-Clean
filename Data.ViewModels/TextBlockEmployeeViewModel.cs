using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockEmployeeViewModel
{
    [Key]
    public int TextBlockEmployeeID { get; set; }

    public int TextBlockID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset? IssueDate { get; set; }

    // Additional Properties
}
