using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaAccidentQuestionTagViewModel
{
    [Key]
    public int UserAreaAccidentQuestionTagID { get; set; }

    public int UserAreaAccidentFormID { get; set; }

    public int OriginalUserAreaAccidentQuestionID { get; set; }

    public int UserAreaAccidentTagID { get; set; }

    // Additional Properties
}
