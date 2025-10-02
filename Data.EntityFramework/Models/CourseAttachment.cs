using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseAttachment", Schema = "V7")]
public partial class CourseAttachment
{
    [Key]
    public int CourseAttachmentID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? AttachmentType { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public int? SequenceOrder { get; set; }

    public bool? IsRequired { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("CourseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CourseID")]
    [InverseProperty("CourseAttachments")]
    public virtual Course Course { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseAttachments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
