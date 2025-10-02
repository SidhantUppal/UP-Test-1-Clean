using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireStaticDataTypeViewModel
{
    [Key]
    public int QuestionnaireStaticDataTypeID { get; set; }

    [StringLength(255)]
    public string Description { get; set; } = null!;

    public bool IsPostBackRequired { get; set; }

    // Additional Properties
}
