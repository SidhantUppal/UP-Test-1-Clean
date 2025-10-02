using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Question", Schema = "V7")]
[Index("QuestionnaireSectionID", "ArchivedDate", "UserAreaID", Name = "IX_Question_QuestionnaireSectionID")]
public partial class Question
{
    [Key]
    public int QuestionID { get; set; }

    public int? UserAreaID { get; set; }

    public int ElementTypeID { get; set; }

    public int AnswerTypeID { get; set; }

    public int? OptionListID { get; set; }

    public int? QuestionnaireStaticDataTypeID { get; set; }

    public int QuestionnaireSectionID { get; set; }

    public int OrderNum { get; set; }

    public bool IsScored { get; set; }

    public bool IsQuestionResponseRequiredAttachment { get; set; }

    public bool IsQuestionValidationRequired { get; set; }

    public int? MaximumScore { get; set; }

    public int? AttachmentID { get; set; }

    public bool AllowComments { get; set; }

    public int? QuestionnaireTypeKeyFieldID { get; set; }

    public int? ParentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IsReadOnly { get; set; }

    public bool IsNeededToPassed { get; set; }

    [StringLength(255)]
    public string? ParentIDValues { get; set; }

    public bool IsMandatory { get; set; }

    public bool AllowFurtherActions { get; set; }

    public bool IsPastDateDenied { get; set; }

    public bool IsFutureDateDenied { get; set; }

    public int? OriginalQuestionID { get; set; }

    public int? AnswerGridID { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AnswerGridID")]
    [InverseProperty("Questions")]
    public virtual AnswerGrid? AnswerGrid { get; set; }

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("Questions")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("Questions")]
    public virtual Attachment? Attachment { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ElementTypeID")]
    [InverseProperty("Questions")]
    public virtual ElementType ElementType { get; set; } = null!;

    [InverseProperty("Parent")]
    public virtual ICollection<Question> InverseParent { get; set; } = new List<Question>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OptionListID")]
    [InverseProperty("Questions")]
    public virtual OptionList? OptionList { get; set; }

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual Question? Parent { get; set; }

    [InverseProperty("Question")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("Question")]
    public virtual ICollection<QuestionOptionListItem> QuestionOptionListItems { get; set; } = new List<QuestionOptionListItem>();

    [InverseProperty("Question")]
    public virtual ICollection<QuestionResponse> QuestionResponses { get; set; } = new List<QuestionResponse>();

    [InverseProperty("Question")]
    public virtual ICollection<QuestionStaticDataItem> QuestionStaticDataItems { get; set; } = new List<QuestionStaticDataItem>();

    [InverseProperty("Question")]
    public virtual ICollection<QuestionValidation> QuestionValidations { get; set; } = new List<QuestionValidation>();

    [ForeignKey("QuestionnaireSectionID")]
    [InverseProperty("Questions")]
    public virtual QuestionnaireSection QuestionnaireSection { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeKeyFieldID")]
    [InverseProperty("Questions")]
    public virtual QuestionnaireTypeKeyField? QuestionnaireTypeKeyField { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Questions")]
    public virtual UserArea? UserArea { get; set; }
}
