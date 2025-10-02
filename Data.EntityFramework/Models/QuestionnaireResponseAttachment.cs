using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireResponseAttachment", Schema = "V7")]
public partial class QuestionnaireResponseAttachment
{
    [Key]
    [Column("QuestionnaireResponseAttachment")]
    public int QuestionnaireResponseAttachment1 { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int AttachmentID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("QuestionnaireResponseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("QuestionnaireResponseAttachments")]
    public virtual QuestionnaireResponse QuestionnaireResponse { get; set; } = null!;
}
