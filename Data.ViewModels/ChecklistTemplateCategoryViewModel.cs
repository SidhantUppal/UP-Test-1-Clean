using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistTemplateCategoryViewModel
{
    [Key]
    public int ChecklistTemplateCategoryID { get; set; }

    public int ChecklistTemplateID { get; set; }

    public int CategoryTypeID { get; set; }

    // Additional Properties
}
