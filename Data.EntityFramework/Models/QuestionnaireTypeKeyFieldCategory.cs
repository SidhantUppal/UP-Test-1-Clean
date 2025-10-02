using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireTypeKeyFieldCategory", Schema = "V7")]
public partial class QuestionnaireTypeKeyFieldCategory
{
    [Key]
    public int QuestionnaireTypeKeyFieldCategoryID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? QuestionnaireTypeKeyFieldCategoryTranslation { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("QuestionnaireTypeKeyFieldCategory")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSections { get; set; } = new List<QuestionnaireSection>();

    [InverseProperty("QuestionnaireTypeKeyFieldCategory")]
    public virtual ICollection<QuestionnaireTypeKeyField> QuestionnaireTypeKeyFields { get; set; } = new List<QuestionnaireTypeKeyField>();
}
