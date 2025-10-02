using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaFormSectionQuestion", Schema = "V7")]
[Index("UserAreaID", "UserAreaFormID", "TemplateVersion", Name = "IX_UserAreaFormSectionQuestion_FormVersion")]
public partial class UserAreaFormSectionQuestion
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

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaFormSectionQuestions")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaFormID")]
    [InverseProperty("UserAreaFormSectionQuestions")]
    public virtual UserAreaForm UserAreaForm { get; set; } = null!;

    [ForeignKey("UserAreaFormQuestionID")]
    [InverseProperty("UserAreaFormSectionQuestions")]
    public virtual UserAreaFormQuestion UserAreaFormQuestion { get; set; } = null!;

    [ForeignKey("UserAreaFormSectionID")]
    [InverseProperty("UserAreaFormSectionQuestions")]
    public virtual UserAreaFormSection UserAreaFormSection { get; set; } = null!;
}
