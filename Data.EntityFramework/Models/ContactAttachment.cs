using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContactAttachment", Schema = "V7")]
public partial class ContactAttachment
{
    [Key]
    public int ContactAttachmentID { get; set; }

    public int ContactID { get; set; }

    public int AttachmentID { get; set; }

    public int ContactAttachmentTypeID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("ContactAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("ContactID")]
    [InverseProperty("ContactAttachments")]
    public virtual Contact Contact { get; set; } = null!;
}
