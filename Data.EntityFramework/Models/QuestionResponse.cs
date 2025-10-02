using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionResponse", Schema = "V7")]
[Index("QuestionnaireResponseID", "ArchivedDate", Name = "ix_QuestionResponse_QuestionnaireResponseID_ArchivedDate")]
public partial class QuestionResponse
{
    [Key]
    public int QuestionResponseID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int QuestionID { get; set; }

    public int UserAreaID { get; set; }

    public int AnswerTypeID { get; set; }

    [Unicode(false)]
    public string? ResponseText { get; set; }

    [Unicode(false)]
    public string? OptionListResponse { get; set; }

    public int? IntegerResponse { get; set; }

    public bool? BoolResponse { get; set; }

    public DateTimeOffset? DateResponse { get; set; }

    [Unicode(false)]
    public string? StaticDataResponse { get; set; }

    public string? Comments { get; set; }

    public int? AttachmentID { get; set; }

    [StringLength(2000)]
    public string? Attachments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int MajorMinorNonConformityScore { get; set; }

    public bool IsSkipped { get; set; }

    public bool IsHidden { get; set; }

    [Unicode(false)]
    public string? AnswerGridResponse { get; set; }

    [Unicode(false)]
    public string? WELResponse { get; set; }

    [InverseProperty("QuestionResponse")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("QuestionResponses")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionResponseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("QuestionResponses")]
    public virtual Attachment? Attachment { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionResponseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionResponseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("QuestionID")]
    [InverseProperty("QuestionResponses")]
    public virtual Question Question { get; set; } = null!;

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("QuestionResponses")]
    public virtual QuestionnaireResponse QuestionnaireResponse { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("QuestionResponses")]
    public virtual UserArea UserArea { get; set; } = null!;
}
