using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseAttachmentNote", Schema = "V7")]
[Index("TribunalCaseAttachmentID", Name = "IX_TribunalCaseAttachmentNote_TribunalCaseAttachment")]
public partial class TribunalCaseAttachmentNote
{
    [Key]
    public int TribunalCaseAttachmentNoteID { get; set; }

    public int TribunalCaseAttachmentID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseAttachmentNotes")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TribunalCaseAttachmentID")]
    [InverseProperty("TribunalCaseAttachmentNotes")]
    public virtual TribunalCaseAttachment TribunalCaseAttachment { get; set; } = null!;
}
