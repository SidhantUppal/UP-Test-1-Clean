using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireSection", Schema = "V7")]
[Index("QuestionnaireID", "ArchivedDate", "UserAreaID", Name = "IX_QuestionnaireSection_QuestionnaireID")]
public partial class QuestionnaireSection
{
    [Key]
    public int QuestionnaireSectionID { get; set; }

    public int QuestionnaireID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int OrderNum { get; set; }

    public bool ShowByDefault { get; set; }

    public bool ShowSlideTitle { get; set; }

    public int? QuestionnaireTypeKeyFieldCategoryID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? HelpText { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionnaireSectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionnaireSectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionnaireSectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("JumpToSectionNavigation")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [ForeignKey("QuestionnaireID")]
    [InverseProperty("QuestionnaireSections")]
    public virtual Questionnaire Questionnaire { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeKeyFieldCategoryID")]
    [InverseProperty("QuestionnaireSections")]
    public virtual QuestionnaireTypeKeyFieldCategory? QuestionnaireTypeKeyFieldCategory { get; set; }

    [InverseProperty("QuestionnaireSection")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("QuestionnaireSection")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSections { get; set; } = new List<TextBlockQuestionnaireSection>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("QuestionnaireSections")]
    public virtual UserArea? UserArea { get; set; }
}
