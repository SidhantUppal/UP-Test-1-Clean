using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmployeeCaseViewModel
{
    [Key]
    public int EmployeeCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int EmployeeCaseTypeID { get; set; }

    public int EmployeeCaseStatusTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(1000)]
    public string? Comments { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
