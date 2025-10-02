using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeTimePadViewModel
{
    [Key]
    public int EmployeeTimePadID { get; set; }

    public int EmployeeID { get; set; }

    [StringLength(100)]
    public string Description { get; set; } = null!;

    public DateTimeOffset? DateTimeFrom { get; set; }

    public DateTimeOffset? DateTimeTo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
