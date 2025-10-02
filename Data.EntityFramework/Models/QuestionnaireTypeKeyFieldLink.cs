using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireTypeKeyFieldLink", Schema = "V7")]
public partial class QuestionnaireTypeKeyFieldLink
{
    [Key]
    public int QuestionnaireTypeKeyFieldLinkId { get; set; }

    public int QuestionnaireTypeKeyFieldParent { get; set; }

    public int QuestionnaireTypeKeyFieldChild { get; set; }

    [ForeignKey("QuestionnaireTypeKeyFieldChild")]
    [InverseProperty("QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldChildNavigations")]
    public virtual QuestionnaireTypeKeyField QuestionnaireTypeKeyFieldChildNavigation { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeKeyFieldParent")]
    [InverseProperty("QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldParentNavigations")]
    public virtual QuestionnaireTypeKeyField QuestionnaireTypeKeyFieldParentNavigation { get; set; } = null!;
}
