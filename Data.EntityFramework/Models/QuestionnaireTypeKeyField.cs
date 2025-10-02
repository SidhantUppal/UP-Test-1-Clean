using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireTypeKeyField", Schema = "V7")]
public partial class QuestionnaireTypeKeyField
{
    [Key]
    public int QuestionnaireTypeKeyFieldID { get; set; }

    public int QuestionnaireTypeID { get; set; }

    public int QuestionnaireTypeKeyFieldCategoryID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    [InverseProperty("QuestionnaireTypeKeyField")]
    public virtual ICollection<AccidentFormQuestionnaireKeyTypeReportableField> AccidentFormQuestionnaireKeyTypeReportableFields { get; set; } = new List<AccidentFormQuestionnaireKeyTypeReportableField>();

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("QuestionnaireTypeKeyFields")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeID")]
    [InverseProperty("QuestionnaireTypeKeyFields")]
    public virtual QuestionnaireType QuestionnaireType { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeKeyFieldCategoryID")]
    [InverseProperty("QuestionnaireTypeKeyFields")]
    public virtual QuestionnaireTypeKeyFieldCategory QuestionnaireTypeKeyFieldCategory { get; set; } = null!;

    [InverseProperty("QuestionnaireTypeKeyFieldChildNavigation")]
    public virtual ICollection<QuestionnaireTypeKeyFieldLink> QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldChildNavigations { get; set; } = new List<QuestionnaireTypeKeyFieldLink>();

    [InverseProperty("QuestionnaireTypeKeyFieldParentNavigation")]
    public virtual ICollection<QuestionnaireTypeKeyFieldLink> QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldParentNavigations { get; set; } = new List<QuestionnaireTypeKeyFieldLink>();

    [InverseProperty("QuestionnaireTypeKeyField")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
