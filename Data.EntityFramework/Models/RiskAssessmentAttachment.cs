using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentAttachment", Schema = "V7")]
public partial class RiskAssessmentAttachment
{
    [Key]
    public int RiskAssessmentAttachmentID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? AttachmentType { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public int? SequenceOrder { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("RiskAssessmentAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentAttachments")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentAttachments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
