using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkAssignmentViewModel
{
    [Key]
    public int WalkAssignmentID { get; set; }

    public int WalkID { get; set; }

    public int EmployeeID { get; set; }

    public int? TaskScheduleID { get; set; }

    public int? TaskID { get; set; }

    public bool IsSignatureRequired { get; set; }

    public int? ManagerSignatureID { get; set; }

    public string? SignatureText { get; set; }

    [StringLength(100)]
    public string? CompletedByFullName { get; set; }

    public DateTimeOffset DueDate { get; set; }

    public int? PreStartDuration { get; set; }

    public int? PostStartDuration { get; set; }

    public DateTimeOffset? MinStartDate { get; set; }

    public DateTimeOffset? MaxStartDate { get; set; }

    public int? ExtensionDuration { get; set; }

    public int? LateWalkBreachAlertEmployeeID { get; set; }

    public int? MissedWalkBreachAlertUserID { get; set; }

    public int? CheckpointBreachAlertUserID { get; set; }

    public int? SkipCheckpointBreachAlertUserID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? DefaultHazardEmployeeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
