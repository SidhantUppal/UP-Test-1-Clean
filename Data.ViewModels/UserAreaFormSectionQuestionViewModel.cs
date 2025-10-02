using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaFormSectionQuestionViewModel
{
    [Key]
    public int UserAreaFormSectionQuestionID { get; set; }

    public int UserAreaID { get; set; }

    public int UserAreaFormID { get; set; }

    public int UserAreaFormSectionID { get; set; }

    public int UserAreaFormQuestionID { get; set; }

    [StringLength(255)]
    public string? ParentIDValues { get; set; }

    public byte TemplateVersion { get; set; }

    public byte OrderNum { get; set; }

    public bool IsRequired { get; set; }

    public bool IsHidden { get; set; }

    public bool IsReadOnly { get; set; }

    [StringLength(100)]
    public string? DefaultValue { get; set; }

    // Additional Properties
}
