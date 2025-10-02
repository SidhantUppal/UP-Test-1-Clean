using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaAccidentFormQuestionTagViewModel
{
    [Key]
    public int UserAreaAccidentFormQuestionTagID { get; set; }

    public int UserAreaAccidentFormQuestionID { get; set; }

    public int UserAreaAccidentTagID { get; set; }

    // Additional Properties
}
