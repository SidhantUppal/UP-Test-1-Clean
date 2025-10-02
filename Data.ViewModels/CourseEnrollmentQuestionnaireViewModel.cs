using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrollmentQuestionnaireViewModel
{
    [Key]
    public int CourseEnrollmentQuestionnaireID { get; set; }

    public int CourseEnrollmentID { get; set; }

    public int QuestionnaireID { get; set; }

    public int OrderNum { get; set; }

    public bool IsNeededToPassed { get; set; }

    // Additional Properties
}
