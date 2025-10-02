using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("JobRoleEmployee", Schema = "V7")]
[Index("JobRoleID", "EmployeeID", Name = "CK_JobRoleEmployee_Unique", IsUnique = true)]
[Index("EmployeeID", Name = "IX_JobRoleEmployee_EmployeeID")]
[Index("JobRoleID", Name = "IX_JobRoleEmployee_JobRoleID")]
public partial class JobRoleEmployee
{
    [Key]
    public int JobRoleEmployeeID { get; set; }

    public int JobRoleID { get; set; }

    public int EmployeeID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("JobRoleEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("JobRoleID")]
    [InverseProperty("JobRoleEmployees")]
    public virtual JobRole JobRole { get; set; } = null!;
}
