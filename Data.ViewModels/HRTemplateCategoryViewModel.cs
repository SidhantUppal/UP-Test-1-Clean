using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRTemplateCategoryViewModel
{
    [Key]
    public int HRTemplateCategoryID { get; set; }

    public int HRTemplateID { get; set; }

    public int HRCategoryID { get; set; }

    public byte OrderNum { get; set; }

    public bool IsMandatory { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? ArchivedByUserName { get; set; }
}
