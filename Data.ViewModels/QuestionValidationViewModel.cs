using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionValidationViewModel
{
    [Key]
    public int QuestionValidationID { get; set; }

    public int QuestionID { get; set; }

    public int ValidationTypeID { get; set; }

    public bool? BooleanValue { get; set; }

    public int? IntegerValue { get; set; }

    public DateTimeOffset? DateValue { get; set; }

    // Additional Properties
}
