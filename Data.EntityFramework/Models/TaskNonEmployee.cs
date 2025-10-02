using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskNonEmployee", Schema = "V7")]
public partial class TaskNonEmployee
{
    [Key]
    public int TaskNonEmployeeID { get; set; }

    public int TaskID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? JobRoleID { get; set; }

    [ForeignKey("JobRoleID")]
    [InverseProperty("TaskNonEmployees")]
    public virtual JobRole? JobRole { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("TaskNonEmployees")]
    public virtual Location? Location { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskNonEmployees")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskNonEmployees")]
    public virtual BSSTask Task { get; set; } = null!;
}
