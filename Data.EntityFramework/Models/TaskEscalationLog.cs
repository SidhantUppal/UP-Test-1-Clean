using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskEscalationLog", Schema = "V7")]
[Index("TaskID", Name = "IX_TaskEscalationLog_TaskID_includes")]
public partial class TaskEscalationLog
{
    [Key]
    public int TaskEscalationLogID { get; set; }

    public int TaskID { get; set; }

    public int EscalationType { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskEscalationLogs")]
    public virtual BSSTask Task { get; set; } = null!;
}
