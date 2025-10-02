using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrollmentQuestionnaire", Schema = "V7")]
public partial class CourseEnrollmentQuestionnaire
{
    [Key]
    public int CourseEnrollmentQuestionnaireID { get; set; }

    public int CourseEnrollmentID { get; set; }

    public int QuestionnaireID { get; set; }

    public int OrderNum { get; set; }

    public bool IsNeededToPassed { get; set; }

    [ForeignKey("CourseEnrollmentID")]
    [InverseProperty("CourseEnrollmentQuestionnaires")]
    public virtual CourseEnrollment CourseEnrollment { get; set; } = null!;

    [ForeignKey("QuestionnaireID")]
    [InverseProperty("CourseEnrollmentQuestionnaires")]
    public virtual Questionnaire Questionnaire { get; set; } = null!;
}
