using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionOptionListItemViewModel
{
    [Key]
    public int QuestionOptionListItemID { get; set; }

    public int QuestionID { get; set; }

    public int OptionListItemID { get; set; }

    // Additional Properties
}
