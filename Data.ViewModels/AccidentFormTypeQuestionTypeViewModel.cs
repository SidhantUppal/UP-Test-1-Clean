using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentFormTypeQuestionTypeViewModel
{
    [Key]
    public int AccidentFormTypeQuestionTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int AccidentSectionTypeID { get; set; }

    public int AccidentQuestionTypeID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(100)]
    public string? ParentValues { get; set; }

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
