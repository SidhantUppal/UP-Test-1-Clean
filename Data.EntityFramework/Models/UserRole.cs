using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserRole", Schema = "V7")]
[Index("UserID", "UserAreaID", Name = "IX_UserRole_UserIDUserAreaID")]
public partial class UserRole
{
    [Key]
    public int UserRoleID { get; set; }

    public int? UserID { get; set; }

    public int? RoleID { get; set; }

    public int? UserAreaID { get; set; }

    [ForeignKey("RoleID")]
    [InverseProperty("UserRoles")]
    public virtual Role? Role { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserRoles")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserRoles")]
    public virtual UserArea? UserArea { get; set; }
}
