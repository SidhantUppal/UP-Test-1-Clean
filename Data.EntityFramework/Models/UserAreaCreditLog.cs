using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaCreditLog", Schema = "V7")]
public partial class UserAreaCreditLog
{
    [Key]
    public int UserAreaCreditLogID { get; set; }

    public int UserAreaID { get; set; }

    public int UserAreaCreditID { get; set; }

    public int Credits { get; set; }

    public bool Operation { get; set; }

    [StringLength(1024)]
    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? RoleID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaCreditLogArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaCreditLogCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaCreditLogModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RoleID")]
    [InverseProperty("UserAreaCreditLogs")]
    public virtual Role? Role { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaCreditLogs")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaCreditID")]
    [InverseProperty("UserAreaCreditLogs")]
    public virtual UserAreaCredit UserAreaCredit { get; set; } = null!;
}
