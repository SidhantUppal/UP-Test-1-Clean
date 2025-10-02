using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionValidation", Schema = "V7")]
public partial class QuestionValidation
{
    [Key]
    public int QuestionValidationID { get; set; }

    public int QuestionID { get; set; }

    public int ValidationTypeID { get; set; }

    public bool? BooleanValue { get; set; }

    public int? IntegerValue { get; set; }

    public DateTimeOffset? DateValue { get; set; }

    [ForeignKey("QuestionID")]
    [InverseProperty("QuestionValidations")]
    public virtual Question Question { get; set; } = null!;

    [ForeignKey("ValidationTypeID")]
    [InverseProperty("QuestionValidations")]
    public virtual ValidationType ValidationType { get; set; } = null!;
}
