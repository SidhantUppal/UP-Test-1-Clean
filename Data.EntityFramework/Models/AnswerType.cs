using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AnswerType", Schema = "V7")]
public partial class AnswerType
{
    [Key]
    public int AnswerTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Reference { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public bool IsLive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AnswerType")]
    public virtual ICollection<AccidentQuestionType> AccidentQuestionTypes { get; set; } = new List<AccidentQuestionType>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AnswerTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AnswerTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AnswerTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("AnswerType")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<QuestionResponse> QuestionResponses { get; set; } = new List<QuestionResponse>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<QuestionnaireTypeKeyField> QuestionnaireTypeKeyFields { get; set; } = new List<QuestionnaireTypeKeyField>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<ReportingFieldType> ReportingFieldTypes { get; set; } = new List<ReportingFieldType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AnswerTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("AnswerType")]
    public virtual ICollection<UserAreaAccidentQuestion> UserAreaAccidentQuestions { get; set; } = new List<UserAreaAccidentQuestion>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<UserAreaFormQuestion> UserAreaFormQuestions { get; set; } = new List<UserAreaFormQuestion>();

    [InverseProperty("AnswerType")]
    public virtual ICollection<UserAreaQuestionType> UserAreaQuestionTypes { get; set; } = new List<UserAreaQuestionType>();
}
