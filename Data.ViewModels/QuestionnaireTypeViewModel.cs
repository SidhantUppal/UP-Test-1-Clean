using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireTypeViewModel
{
    [Key]
    public int QuestionnaireTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public bool? IsELearning { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
