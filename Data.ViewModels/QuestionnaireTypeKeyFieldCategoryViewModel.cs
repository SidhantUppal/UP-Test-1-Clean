using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireTypeKeyFieldCategoryViewModel
{
    [Key]
    public int QuestionnaireTypeKeyFieldCategoryID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? QuestionnaireTypeKeyFieldCategoryTranslation { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
