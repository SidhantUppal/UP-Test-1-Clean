using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseAttachmentNote", Schema = "V7")]
[Index("HRCaseAttachmentID", Name = "IX_HRCaseAttachmentNote_HRCaseAttachment")]
public partial class HRCaseAttachmentNote
{
    [Key]
    public int HRCaseAttachmentNoteID { get; set; }

    public int HRCaseAttachmentID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseAttachmentNotes")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseAttachmentID")]
    [InverseProperty("HRCaseAttachmentNotes")]
    public virtual HRCaseAttachment HRCaseAttachment { get; set; } = null!;
}
