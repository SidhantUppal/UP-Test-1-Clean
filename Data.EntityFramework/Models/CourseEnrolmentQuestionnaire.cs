using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrolmentQuestionnaire", Schema = "V7")]
public partial class CourseEnrolmentQuestionnaire
{
    [Key]
    public int CourseEnrolmentQuestionnaireID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    public int CourseQuestionaireID { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset? SubmitDate { get; set; }

    public int? TimeSpentMinutes { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? Score { get; set; }

    public bool? Passed { get; set; }

    public string? ResponseData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("CourseEnrolmentID")]
    [InverseProperty("CourseEnrolmentQuestionnaires")]
    public virtual CourseEnrolment CourseEnrolment { get; set; } = null!;

    [ForeignKey("CourseQuestionaireID")]
    [InverseProperty("CourseEnrolmentQuestionnaires")]
    public virtual CourseQuestionaire CourseQuestionaire { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseEnrolmentQuestionnaires")]
    public virtual UserArea UserArea { get; set; } = null!;
}
