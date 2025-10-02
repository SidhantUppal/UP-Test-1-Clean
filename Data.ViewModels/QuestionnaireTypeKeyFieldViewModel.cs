using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireTypeKeyFieldViewModel
{
    [Key]
    public int QuestionnaireTypeKeyFieldID { get; set; }

    public int QuestionnaireTypeID { get; set; }

    public int QuestionnaireTypeKeyFieldCategoryID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    // Additional Properties
}
