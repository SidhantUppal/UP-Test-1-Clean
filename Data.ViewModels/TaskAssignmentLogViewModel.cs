using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskAssignmentLogViewModel
{
    [Key]
    public int TaskAssignmentLogID { get; set; }

    public int UserAreaID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
