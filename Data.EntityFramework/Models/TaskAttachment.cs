using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskAttachment", Schema = "V7")]
[Index("TaskID", "AttachmentID", Name = "IX_TaskAttachment_TaskIDAttachmentID")]
public partial class TaskAttachment
{
    [Key]
    public int TaskAttachmentID { get; set; }

    public int TaskID { get; set; }

    public int AttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? TaskActivityID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskAttachmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("TaskAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskAttachmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("TaskAttachments")]
    public virtual BSSTask Task { get; set; } = null!;

    [ForeignKey("TaskActivityID")]
    [InverseProperty("TaskAttachments")]
    public virtual TaskActivity? TaskActivity { get; set; }
}
