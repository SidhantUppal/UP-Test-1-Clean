using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("VideoCaption", Schema = "V7")]
public partial class VideoCaption
{
    [Key]
    public int VideoCaptionID { get; set; }

    public int AttachmentID { get; set; }

    public int CaptionAttachmentID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [ForeignKey("AttachmentID")]
    [InverseProperty("VideoCaptionAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CaptionAttachmentID")]
    [InverseProperty("VideoCaptionCaptionAttachments")]
    public virtual Attachment CaptionAttachment { get; set; } = null!;
}
