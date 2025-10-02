using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormTypeQuestionType", Schema = "V7")]
[Index("UserAreaID", "AccidentFormTypeID", "TemplateVersion", Name = "IX_AccidentFormTypeQuestionType_UserAreaAccidentFormTypeVersion")]
public partial class AccidentFormTypeQuestionType
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

    [InverseProperty("AccidentFormTypeQuestionType")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AccidentFormTypeQuestionTypes")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("AccidentQuestionTypeID")]
    [InverseProperty("AccidentFormTypeQuestionTypes")]
    public virtual AccidentQuestionType AccidentQuestionType { get; set; } = null!;

    [ForeignKey("AccidentSectionTypeID")]
    [InverseProperty("AccidentFormTypeQuestionTypes")]
    public virtual AccidentSectionType AccidentSectionType { get; set; } = null!;

    [InverseProperty("Parent")]
    public virtual ICollection<AccidentFormTypeQuestionType> InverseParent { get; set; } = new List<AccidentFormTypeQuestionType>();

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual AccidentFormTypeQuestionType? Parent { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentFormTypeQuestionTypes")]
    public virtual UserArea? UserArea { get; set; }
}
