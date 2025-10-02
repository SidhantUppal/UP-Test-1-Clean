using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseAttachmentTagType", Schema = "V7")]
[Index("TribunalCaseAttachmentID", Name = "IX_TribunalCaseAttachmentTagType_TribunalCaseAttachment")]
public partial class TribunalCaseAttachmentTagType
{
    [Key]
    public int TribunalCaseAttachmentTagTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int TribunalCaseAttachmentID { get; set; }

    public int TagTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseAttachmentTagTypes")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TagTypeID")]
    [InverseProperty("TribunalCaseAttachmentTagTypes")]
    public virtual TagType TagType { get; set; } = null!;

    [ForeignKey("TribunalCaseAttachmentID")]
    [InverseProperty("TribunalCaseAttachmentTagTypes")]
    public virtual TribunalCaseAttachment TribunalCaseAttachment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseAttachmentTagTypes")]
    public virtual UserArea? UserArea { get; set; }
}
