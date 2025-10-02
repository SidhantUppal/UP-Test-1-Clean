using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkLog", Schema = "V7")]
public partial class SafeSystemOfWorkLog
{
    [Key]
    public int SafeSystemOfWorkLogID { get; set; }

    public int UserAreaID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int SafeSystemOfWorkLogTypeID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateTimeOffset LoggedDate { get; set; }

    public int LoggedByUserID { get; set; }

    [StringLength(100)]
    public string? LoggedByFullName { get; set; }

    [StringLength(100)]
    public string? LoggedByJobTitle { get; set; }

    public string? LoggedBySignature { get; set; }

    [ForeignKey("LoggedByUserID")]
    [InverseProperty("SafeSystemOfWorkLogs")]
    public virtual User LoggedByUser { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkID")]
    [InverseProperty("SafeSystemOfWorkLogs")]
    public virtual SafeSystemOfWork SafeSystemOfWork { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkLogTypeID")]
    [InverseProperty("SafeSystemOfWorkLogs")]
    public virtual SafeSystemOfWorkLogType SafeSystemOfWorkLogType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SafeSystemOfWorkLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
