using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentFormQuestion", Schema = "V7")]
[Index("UserAreaID", "UserAreaAccidentFormID", "TemplateVersion", Name = "IX_UserAreaAccidentFormQuestion_UserAreaAccidentFormVersion")]
public partial class UserAreaAccidentFormQuestion
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

    [InverseProperty("UserAreaAccidentFormQuestion")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaAccidentFormQuestions")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaAccidentFormID")]
    [InverseProperty("UserAreaAccidentFormQuestions")]
    public virtual UserAreaAccidentForm UserAreaAccidentForm { get; set; } = null!;

    [InverseProperty("UserAreaAccidentFormQuestion")]
    public virtual ICollection<UserAreaAccidentFormQuestionTag> UserAreaAccidentFormQuestionTags { get; set; } = new List<UserAreaAccidentFormQuestionTag>();

    [ForeignKey("UserAreaAccidentQuestionID")]
    [InverseProperty("UserAreaAccidentFormQuestions")]
    public virtual UserAreaAccidentQuestion UserAreaAccidentQuestion { get; set; } = null!;

    [ForeignKey("UserAreaAccidentSectionID")]
    [InverseProperty("UserAreaAccidentFormQuestions")]
    public virtual UserAreaAccidentSection UserAreaAccidentSection { get; set; } = null!;
}
