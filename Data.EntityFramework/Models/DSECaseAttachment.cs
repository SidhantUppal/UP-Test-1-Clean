using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECaseAttachment", Schema = "V7")]
[Index("DSECaseID", "AttachmentID", Name = "IX_DSECaseAttachment_DSECaseIDAttachmentID")]
public partial class DSECaseAttachment
{
    [Key]
    public int DSECaseAttachmentID { get; set; }

    public int DSECaseID { get; set; }

    public int AttachmentID { get; set; }

    [ForeignKey("DSECaseID")]
    [InverseProperty("DSECaseAttachments")]
    public virtual DSECase DSECase { get; set; } = null!;
}
