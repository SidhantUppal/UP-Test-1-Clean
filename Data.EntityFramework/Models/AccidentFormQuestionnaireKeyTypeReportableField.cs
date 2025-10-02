using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormQuestionnaireKeyTypeReportableField", Schema = "V7")]
public partial class AccidentFormQuestionnaireKeyTypeReportableField
{
    [Key]
    public int AccidentFormQuestionnaireKeyTypeReportableFieldID { get; set; }

    public int? UserAreaID { get; set; }

    public int AccidentFormTypeID { get; set; }

    public int QuestionnaireTypeKeyFieldID { get; set; }

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("AccidentFormQuestionnaireKeyTypeReportableFields")]
    public virtual AccidentFormType AccidentFormType { get; set; } = null!;

    [ForeignKey("QuestionnaireTypeKeyFieldID")]
    [InverseProperty("AccidentFormQuestionnaireKeyTypeReportableFields")]
    public virtual QuestionnaireTypeKeyField QuestionnaireTypeKeyField { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentFormQuestionnaireKeyTypeReportableFields")]
    public virtual UserArea? UserArea { get; set; }
}
