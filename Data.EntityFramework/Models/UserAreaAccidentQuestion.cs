using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentQuestion", Schema = "V7")]
public partial class UserAreaAccidentQuestion
{
    [Key]
    public int UserAreaAccidentQuestionID { get; set; }

    public int UserAreaID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? FieldName { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? ChildFieldPrefix { get; set; }

    [StringLength(255)]
    public string? FieldOptions { get; set; }

    public int? oldid { get; set; }

    public int? OriginalUserAreaAccidentQuestionID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public string? AnswerTypeOptionsList { get; set; }

    [InverseProperty("UserAreaAccidentQuestion")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldData { get; set; } = new List<AccidentCaseFieldDatum>();

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("UserAreaAccidentQuestions")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [InverseProperty("OriginalUserAreaAccidentQuestion")]
    public virtual ICollection<UserAreaAccidentQuestion> InverseOriginalUserAreaAccidentQuestion { get; set; } = new List<UserAreaAccidentQuestion>();

    [ForeignKey("OriginalUserAreaAccidentQuestionID")]
    [InverseProperty("InverseOriginalUserAreaAccidentQuestion")]
    public virtual UserAreaAccidentQuestion? OriginalUserAreaAccidentQuestion { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaAccidentQuestions")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaAccidentQuestion")]
    public virtual ICollection<UserAreaAccidentFormQuestion> UserAreaAccidentFormQuestions { get; set; } = new List<UserAreaAccidentFormQuestion>();

    [InverseProperty("OriginalUserAreaAccidentQuestion")]
    public virtual ICollection<UserAreaAccidentQuestionTag> UserAreaAccidentQuestionTags { get; set; } = new List<UserAreaAccidentQuestionTag>();
}
