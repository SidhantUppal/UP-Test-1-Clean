using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseQuestionaire", Schema = "V7")]
public partial class CourseQuestionaire
{
    [Key]
    public int CourseQuestionaireID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseID { get; set; }

    [StringLength(255)]
    public string QuestionnaireName { get; set; } = null!;

    [StringLength(50)]
    public string? QuestionnaireType { get; set; }

    public string? Instructions { get; set; }

    public int? TotalQuestions { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? PassingScore { get; set; }

    public int? TimeLimit { get; set; }

    public bool? RandomizeQuestions { get; set; }

    public bool? ShowResults { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsMandatory { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("CourseID")]
    [InverseProperty("CourseQuestionaires")]
    public virtual Course Course { get; set; } = null!;

    [InverseProperty("CourseQuestionaire")]
    public virtual ICollection<CourseEnrolmentQuestionnaire> CourseEnrolmentQuestionnaires { get; set; } = new List<CourseEnrolmentQuestionnaire>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseQuestionaires")]
    public virtual UserArea UserArea { get; set; } = null!;
}
