using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireTypeKeyFieldLinkViewModel
{
    [Key]
    public int QuestionnaireTypeKeyFieldLinkId { get; set; }

    public int QuestionnaireTypeKeyFieldParent { get; set; }

    public int QuestionnaireTypeKeyFieldChild { get; set; }

    // Additional Properties
}
