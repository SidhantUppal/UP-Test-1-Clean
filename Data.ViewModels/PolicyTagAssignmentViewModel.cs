using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyTagAssignmentViewModel
{
    [Key]
    public int PolicyTagAssignmentID { get; set; }

    public int PolicyID { get; set; }

    public int PolicyTagID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
