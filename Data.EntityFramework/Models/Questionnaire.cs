using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Questionnaire", Schema = "V7")]
[Index("OriginalQuestionnaireID", "MajorVersion", "MinorVersion", "UserAreaID", Name = "IX_Questionnaire_OriginalQuestionnaireID", IsDescending = new[] { false, true, true, false })]
[Index("OriginalQuestionnaireID", Name = "IX_Questionnaire_OriginalQuestionnaireID_Simple")]
public partial class Questionnaire
{
    [Key]
    public int QuestionnaireID { get; set; }

    public int? OriginalQuestionnaireID { get; set; }

    public int QuestionnaireTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Reference { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? PermissionKey { get; set; }

    public int MajorVersion { get; set; }

    public int MinorVersion { get; set; }

    public int? MaxScore { get; set; }

    public int? PassScore { get; set; }

    public int QuestionnaireStatusTypeID { get; set; }

    public int? QuestionnaireDisclaimerTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("Questionnaire")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionnaireArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Questionnaire")]
    public virtual ICollection<CourseEnrollmentQuestionnaire> CourseEnrollmentQuestionnaires { get; set; } = new List<CourseEnrollmentQuestionnaire>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionnaireCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("OriginalQuestionnaire")]
    public virtual ICollection<Questionnaire> InverseOriginalQuestionnaire { get; set; } = new List<Questionnaire>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionnaireModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Questionnaire")]
    public virtual ICollection<OptionList> OptionLists { get; set; } = new List<OptionList>();

    [ForeignKey("OriginalQuestionnaireID")]
    [InverseProperty("InverseOriginalQuestionnaire")]
    public virtual Questionnaire? OriginalQuestionnaire { get; set; }

    [ForeignKey("QuestionnaireDisclaimerTypeID")]
    [InverseProperty("Questionnaires")]
    public virtual QuestionnaireDisclaimerType? QuestionnaireDisclaimerType { get; set; }

    [InverseProperty("Questionnaire")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("Questionnaire")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSections { get; set; } = new List<QuestionnaireSection>();

    [ForeignKey("QuestionnaireTypeID")]
    [InverseProperty("Questionnaires")]
    public virtual QuestionnaireType QuestionnaireType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Questionnaires")]
    public virtual UserArea? UserArea { get; set; }
}
