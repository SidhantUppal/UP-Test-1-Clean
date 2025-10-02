using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockQuestionnaireSection", Schema = "V7")]
public partial class TextBlockQuestionnaireSection
{
    [Key]
    public int TextBlockQuestionnaireSectionID { get; set; }

    public int TextBlockID { get; set; }

    public int QuestionnaireSectionID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int OrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockQuestionnaireSectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockQuestionnaireSectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockQuestionnaireSectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("TextBlockQuestionnaireSections")]
    public virtual QuestionnaireResponse? QuestionnaireResponse { get; set; }

    [ForeignKey("QuestionnaireSectionID")]
    [InverseProperty("TextBlockQuestionnaireSections")]
    public virtual QuestionnaireSection QuestionnaireSection { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockQuestionnaireSections")]
    public virtual TextBlock TextBlock { get; set; } = null!;
}
