using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmailMessageAttachment", Schema = "V7")]
public partial class EmailMessageAttachment
{
    [Key]
    public int EmailMessageAttachmentID { get; set; }

    public int EmailMessageID { get; set; }

    [StringLength(100)]
    public string ContentType { get; set; } = null!;

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSize { get; set; }

    public byte[] FileBytes { get; set; } = null!;

    [ForeignKey("EmailMessageID")]
    [InverseProperty("EmailMessageAttachments")]
    public virtual EmailMessage EmailMessage { get; set; } = null!;
}
