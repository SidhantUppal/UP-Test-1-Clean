using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("JobRole", Schema = "V7")]
public partial class JobRole
{
    [Key]
    public int JobRoleID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("JobRoleArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("JobRole")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("JobRole")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilters { get; set; } = new List<CourseBundleFilter>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("JobRoleCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("JobRole")]
    public virtual ICollection<JobRoleEmployee> JobRoleEmployees { get; set; } = new List<JobRoleEmployee>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("JobRoleModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("JobRole")]
    public virtual ICollection<TaskNonEmployee> TaskNonEmployees { get; set; } = new List<TaskNonEmployee>();

    [InverseProperty("JobRole")]
    public virtual ICollection<TaskScheduleNonEmployee> TaskScheduleNonEmployees { get; set; } = new List<TaskScheduleNonEmployee>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("JobRoles")]
    public virtual UserArea UserArea { get; set; } = null!;
}
