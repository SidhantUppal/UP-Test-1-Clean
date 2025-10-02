using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseAttachment", Schema = "V7")]
[Index("TribunalCaseID", Name = "IX_TribunalCaseAttachment_TribunalCase")]
public partial class TribunalCaseAttachment
{
    [Key]
    public int TribunalCaseAttachmentID { get; set; }

    public int TribunalCaseID { get; set; }

    public int AttachmentID { get; set; }

    public int TribunalCaseAttachmentTypeID { get; set; }

    public int TribunalCaseSeverityTypeID { get; set; }

    public int TribunalCasePersonTypeID { get; set; }

    public int? TribunalCaseEventTypeID { get; set; }

    public bool IsET1Related { get; set; }

    public bool IsET3Related { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public DateTimeOffset? DocumentDate { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    public int? BundleOrderNum { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [InverseProperty("TribunalCaseAttachment")]
    public virtual ICollection<TribunalCaseAttachmentNote> TribunalCaseAttachmentNotes { get; set; } = new List<TribunalCaseAttachmentNote>();

    [InverseProperty("TribunalCaseAttachment")]
    public virtual ICollection<TribunalCaseAttachmentTagType> TribunalCaseAttachmentTagTypes { get; set; } = new List<TribunalCaseAttachmentTagType>();

    [ForeignKey("TribunalCaseAttachmentTypeID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual TribunalCaseAttachmentType TribunalCaseAttachmentType { get; set; } = null!;

    [ForeignKey("TribunalCaseEventTypeID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual TribunalCaseEventType? TribunalCaseEventType { get; set; }

    [ForeignKey("TribunalCasePersonTypeID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual TribunalCasePersonType TribunalCasePersonType { get; set; } = null!;

    [ForeignKey("TribunalCaseSeverityTypeID")]
    [InverseProperty("TribunalCaseAttachments")]
    public virtual TribunalCaseSeverityType TribunalCaseSeverityType { get; set; } = null!;
}
