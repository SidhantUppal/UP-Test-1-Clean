using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkResponseViewModel
{
    [Key]
    public int WalkResponseID { get; set; }

    public int WalkID { get; set; }

    public int? WalkAssignmentID { get; set; }

    public DateTimeOffset? ActualStartTime { get; set; }

    public DateTimeOffset? ActualFinishTime { get; set; }

    public int? ActualDuration { get; set; }

    public bool HasAutoClosed { get; set; }

    [StringLength(255)]
    public string? CloseReason { get; set; }

    public int? BreachedReasonTypeID { get; set; }

    [StringLength(500)]
    public string? BreachComment { get; set; }

    public string? GPSRoute { get; set; }

    public int? RandomImageID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? EmployeeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
