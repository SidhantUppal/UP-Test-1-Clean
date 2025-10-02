using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskAssignment", Schema = "V7")]
[Index("TaskID", Name = "IX_TaskAssignment_TaskID")]
public partial class TaskAssignment
{
    [Key]
    public int TaskAssignmentID { get; set; }

    public int TaskID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskAssignmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskAssignmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("TaskAssignments")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("TaskAssignments")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TaskAssignmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskAssignments")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskAssignments")]
    public virtual BSSTask Task { get; set; } = null!;
}
