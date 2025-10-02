using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskAssignableUser", Schema = "V7")]
public partial class TaskAssignableUser
{
    [Key]
    public int TaskAssignableUserID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset? LastAssignedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskAssignableUserArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskAssignableUserCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("TaskAssignableUserUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskAssignableUsers")]
    public virtual UserArea UserArea { get; set; } = null!;
}
