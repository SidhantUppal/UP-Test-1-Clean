using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceAttachment", Schema = "V7")]
[Index("AbsenceID", Name = "IX_AbsenceAttachment_AbsenceID_includes")]
public partial class AbsenceAttachment
{
    [Key]
    public int AbsenceAttachmentID { get; set; }

    public int AbsenceID { get; set; }

    public int AttachmentID { get; set; }

    public int AbsenceAttachmentTypeID { get; set; }

    public int? AbsenceTaskID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public bool? IsVerified { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AbsenceID")]
    [InverseProperty("AbsenceAttachments")]
    public virtual Absence Absence { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceAttachmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("AbsenceAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceAttachmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceAttachmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
