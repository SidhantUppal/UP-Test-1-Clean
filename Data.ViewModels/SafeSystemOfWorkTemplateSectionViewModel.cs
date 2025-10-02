using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkTemplateSectionViewModel
{
    [Key]
    public int SafeSystemOfWorkTemplateSectionID { get; set; }

    public int SafeSystemOfWorkTemplateID { get; set; }

    public int TextBlockSectionID { get; set; }

    // Additional Properties
}
