using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AttachmentUserArea", Schema = "V7")]
[Index("AttachmentID", "UserAreaID", Name = "CK_AttachmentUserArea_Unique", IsUnique = true)]
[Index("AttachmentID", Name = "IX_AttachmentUserArea_AttachmentID")]
[Index("UserAreaID", Name = "IX_AttachmentUserArea_UserAreaID")]
public partial class AttachmentUserArea
{
    [Key]
    public int AttachmentUserAreaID { get; set; }

    public int AttachmentID { get; set; }

    public int UserAreaID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("AttachmentUserAreas")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AttachmentUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
