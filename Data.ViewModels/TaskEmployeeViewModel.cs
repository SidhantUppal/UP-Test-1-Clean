using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskEmployeeViewModel
{
    [Key]
    public int TaskEmployeeID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    [StringLength(20)]
    public string AssignmentType { get; set; } = null!;

    public DateTimeOffset? StartDateTime { get; set; }

    public int? TimeSpentMinutes { get; set; }

    public bool? NotificationSent { get; set; }

    public DateTimeOffset? NotificationSentDate { get; set; }

    public DateTimeOffset? AcknowledgedDate { get; set; }

    public bool? CompletedByThisUser { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    [StringLength(1024)]
    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
