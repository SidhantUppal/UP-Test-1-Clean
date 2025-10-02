using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeAbsenceConfigViewModel
{
    [Key]
    public int EmployeeAbsenceConfigID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public decimal? AnnualEntitlement { get; set; }

    public bool? CanRequestBankHolidays { get; set; }

    [StringLength(50)]
    public string? WorkDays { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
