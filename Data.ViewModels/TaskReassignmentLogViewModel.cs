using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskReassignmentLogViewModel
{
    [Key]
    public int TaskReassignmentLogID { get; set; }

    public int UserAreaID { get; set; }

    public int? TaskID { get; set; }

    public int? TaskScheduleID { get; set; }

    [StringLength(256)]
    public string? PreviousEmployeeIDs { get; set; }

    [StringLength(256)]
    public string? CurrentEmployeeIDs { get; set; }

    public string ReassignmentNotes { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
