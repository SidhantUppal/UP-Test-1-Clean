using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseQuestionaireViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
