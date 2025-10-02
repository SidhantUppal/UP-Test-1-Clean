using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireDisclaimerTypeViewModel
{
    [Key]
    public int QuestionnaireDisclaimerTypeID { get; set; }

    public bool IsActive { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
