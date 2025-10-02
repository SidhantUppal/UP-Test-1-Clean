using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LegalRegisterAttachment", Schema = "V7")]
public partial class LegalRegisterAttachment1
{
    [Key]
    public int LegalRegisterAttachmentID { get; set; }

    public int LegalRegisterID { get; set; }

    public int AttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("LegalRegisterAttachment1ArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("LegalRegisterAttachment1s")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("LegalRegisterAttachment1CreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LegalRegisterID")]
    [InverseProperty("LegalRegisterAttachment1s")]
    public virtual LegalRegister1 LegalRegister { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("LegalRegisterAttachment1ModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
