using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentQuestionType", Schema = "V7")]
public partial class AccidentQuestionType
{
    [Key]
    public int AccidentQuestionTypeID { get; set; }

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? FieldName { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? ChildFieldPrefix { get; set; }

    [StringLength(50)]
    public string? FieldOptions { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public string? AnswerTypeOptionsList { get; set; }

    [InverseProperty("AccidentQuestionType")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldData { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("AccidentQuestionType")]
    public virtual ICollection<AccidentFormTypeQuestionType> AccidentFormTypeQuestionTypes { get; set; } = new List<AccidentFormTypeQuestionType>();

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("AccidentQuestionTypes")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentQuestionTypes")]
    public virtual UserArea? UserArea { get; set; }
}
