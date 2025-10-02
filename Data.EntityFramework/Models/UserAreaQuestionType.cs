using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaQuestionType", Schema = "V7")]
public partial class UserAreaQuestionType
{
    [Key]
    public int UserAreaQuestionTypeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(250)]
    public string FieldName { get; set; } = null!;

    public int? OptionListID { get; set; }

    public int AnswerTypeID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("UserAreaQuestionType")]
    public virtual ICollection<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeData { get; set; } = new List<AccidentCaseUserAreaQuestionTypeDatum>();

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("UserAreaQuestionTypes")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("UserAreaQuestionTypes")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("OptionListID")]
    [InverseProperty("UserAreaQuestionTypes")]
    public virtual OptionList? OptionList { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaQuestionTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
