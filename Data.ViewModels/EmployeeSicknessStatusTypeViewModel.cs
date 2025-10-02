using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeSicknessStatusTypeViewModel
{
    [Key]
    public int EmployeeSicknessStatusTypeID { get; set; }

    public int EmployeeID { get; set; }

    public int SicknessStatusTypeID { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? DateSentHome { get; set; }

    public DateTimeOffset? ExpectedReturnDate { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int UserAreaID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
