using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseAttachment", Schema = "V7")]
[Index("HRCaseID", Name = "IX_HRCaseAttachment_HRCaseID_includes")]
public partial class HRCaseAttachment
{
    [Key]
    public int HRCaseAttachmentID { get; set; }

    public int HRCaseID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int? BundleOrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int HRCaseAttachmentTypeID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCaseTaskID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    public int? HRCaseTemplateCategoryID { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseAttachmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseAttachmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCase HRCase { get; set; } = null!;

    [InverseProperty("HRCaseAttachment")]
    public virtual ICollection<HRCaseAttachmentNote> HRCaseAttachmentNotes { get; set; } = new List<HRCaseAttachmentNote>();

    [ForeignKey("HRCaseAttachmentTypeID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseAttachmentType HRCaseAttachmentType { get; set; } = null!;

    [ForeignKey("HRCaseEventID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseEvent? HRCaseEvent { get; set; }

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseMeeting? HRCaseMeeting { get; set; }

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseStatusType? HRCaseStatusType { get; set; }

    [ForeignKey("HRCaseTaskID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseTask? HRCaseTask { get; set; }

    [ForeignKey("HRCaseTemplateCategoryID")]
    [InverseProperty("HRCaseAttachments")]
    public virtual HRCaseTemplateCategory? HRCaseTemplateCategory { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseAttachmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
