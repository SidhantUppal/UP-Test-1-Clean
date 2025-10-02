using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkAssignment", Schema = "V7")]
public partial class WalkAssignment
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkAssignmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CheckpointBreachAlertUserID")]
    [InverseProperty("WalkAssignmentCheckpointBreachAlertUsers")]
    public virtual Employee? CheckpointBreachAlertUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkAssignmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultHazardEmployeeID")]
    [InverseProperty("WalkAssignmentDefaultHazardEmployees")]
    public virtual Employee? DefaultHazardEmployee { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("WalkAssignmentEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("LateWalkBreachAlertEmployeeID")]
    [InverseProperty("WalkAssignmentLateWalkBreachAlertEmployees")]
    public virtual Employee? LateWalkBreachAlertEmployee { get; set; }

    [ForeignKey("ManagerSignatureID")]
    [InverseProperty("WalkAssignmentManagerSignatures")]
    public virtual Employee? ManagerSignature { get; set; }

    [ForeignKey("MissedWalkBreachAlertUserID")]
    [InverseProperty("WalkAssignmentMissedWalkBreachAlertUsers")]
    public virtual Employee? MissedWalkBreachAlertUser { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("WalkAssignmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SkipCheckpointBreachAlertUserID")]
    [InverseProperty("WalkAssignmentSkipCheckpointBreachAlertUsers")]
    public virtual Employee? SkipCheckpointBreachAlertUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("WalkAssignments")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("WalkAssignments")]
    public virtual TaskSchedule? TaskSchedule { get; set; }

    [ForeignKey("WalkID")]
    [InverseProperty("WalkAssignments")]
    public virtual Walk Walk { get; set; } = null!;

    [InverseProperty("WalkAssignment")]
    public virtual ICollection<WalkResponse> WalkResponses { get; set; } = new List<WalkResponse>();
}
