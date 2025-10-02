using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrolmentQuestionnaireViewModel
{
    [Key]
    public int CourseEnrolmentQuestionnaireID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    public int CourseQuestionaireID { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset? SubmitDate { get; set; }

    public int? TimeSpentMinutes { get; set; }

    public decimal? Score { get; set; }

    public bool? Passed { get; set; }

    public string? ResponseData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
