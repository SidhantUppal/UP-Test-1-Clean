using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireResponseSignOff", Schema = "V7")]
[Index("PrimaryQuestionnaireResponseID", Name = "IX_QuestionnaireResponseSignOff_SignOff")]
public partial class QuestionnaireResponseSignOff
{
    [Key]
    public int QuestionnaireResponseSignOffID { get; set; }

    public int PrimaryQuestionnaireResponseID { get; set; }

    public int SignOffQuestionnaireResponseID { get; set; }

    public byte OrderNum { get; set; }

    [ForeignKey("PrimaryQuestionnaireResponseID")]
    [InverseProperty("QuestionnaireResponseSignOffPrimaryQuestionnaireResponses")]
    public virtual QuestionnaireResponse PrimaryQuestionnaireResponse { get; set; } = null!;

    [ForeignKey("SignOffQuestionnaireResponseID")]
    [InverseProperty("QuestionnaireResponseSignOffSignOffQuestionnaireResponses")]
    public virtual QuestionnaireResponse SignOffQuestionnaireResponse { get; set; } = null!;
}
