using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskNote", Schema = "V7")]
[Index("TaskID", "UserAreaID", "ArchivedDate", Name = "IX_TaskNote_TaskID_UserAreaID_ArchivedDate")]
[Index("UserAreaID", "TaskID", Name = "IX_TaskNote_UserAreaIDTaskID")]
public partial class TaskNote
{
    [Key]
    public int TaskNoteID { get; set; }

    public int TaskID { get; set; }

    public string Notes { get; set; } = null!;

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? TaskActivityID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TaskActivityID")]
    [InverseProperty("TaskNotes")]
    public virtual TaskActivity? TaskActivity { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskNotes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
