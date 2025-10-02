using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceTask", Schema = "V7")]
[Index("TaskID", "AbsenceID", Name = "CK_AbsenceTask_Unique", IsUnique = true)]
public partial class AbsenceTask
{
    [Key]
    public int AbsenceTaskID { get; set; }

    public int TaskID { get; set; }

    public int AbsenceID { get; set; }

    [ForeignKey("AbsenceID")]
    [InverseProperty("AbsenceTasks")]
    public virtual Absence Absence { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("AbsenceTasks")]
    public virtual BSSTask Task { get; set; } = null!;
}
