using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AttachmentChild", Schema = "V7")]
public partial class AttachmentChild
{
    [Key]
    public int AttachmentChildID { get; set; }

    public int FolderID { get; set; }

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSize { get; set; }

    public int? ParentAttachmentID { get; set; }

    [ForeignKey("ParentAttachmentID")]
    [InverseProperty("AttachmentChildren")]
    public virtual Attachment? ParentAttachment { get; set; }
}
