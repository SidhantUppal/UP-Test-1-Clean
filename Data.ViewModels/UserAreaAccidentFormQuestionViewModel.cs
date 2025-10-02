using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaAccidentFormQuestionViewModel
{
    [Key]
    public int UserAreaAccidentFormQuestionID { get; set; }

    public int UserAreaID { get; set; }

    public int UserAreaAccidentFormID { get; set; }

    public int UserAreaAccidentSectionID { get; set; }

    public int UserAreaAccidentQuestionID { get; set; }

    [StringLength(255)]
    public string? ParentIDValues { get; set; }

    public byte TemplateVersion { get; set; }

    public byte OrderNum { get; set; }

    public bool IsRequired { get; set; }

    public bool IsHidden { get; set; }

    public bool IsReadOnly { get; set; }

    [StringLength(100)]
    public string? DefaultValue { get; set; }

    public int? oldid { get; set; }

    // Additional Properties
}
