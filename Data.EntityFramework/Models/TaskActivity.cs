using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskActivity", Schema = "V7")]
public partial class TaskActivity
{
    [Key]
    public int TaskActivityID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public DateTimeOffset ActivityDate { get; set; }

    public byte ActivityType { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? SessionID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskActivityArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskActivityCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("TaskActivities")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TaskActivityModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskActivities")]
    public virtual BSSTask Task { get; set; } = null!;

    [InverseProperty("TaskActivity")]
    public virtual ICollection<TaskAttachment> TaskAttachments { get; set; } = new List<TaskAttachment>();

    [InverseProperty("TaskActivity")]
    public virtual ICollection<TaskNote> TaskNotes { get; set; } = new List<TaskNote>();
}
