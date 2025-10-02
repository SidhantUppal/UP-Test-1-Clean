using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentFieldTypeResponse", Schema = "V7")]
[Index("RiskAssessmentID", "RiskAssessmentFieldTypeID", "UserAreaID", Name = "IX_RiskAssessmentFieldTypeResponse_RiskAssessmentID_RiskAssessmentFieldTypeID_UserAreaID_includes")]
[Index("RiskAssessmentID", "UserAreaID", Name = "IX_RiskAssessmentFieldTypeResponse_RiskAssessmentID_UserAreaID")]
public partial class RiskAssessmentFieldTypeResponse
{
    [Key]
    public int RiskAssessmentFieldTypeResponseID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int RiskAssessmentFieldTypeID { get; set; }

    public int UserAreaID { get; set; }

    public string Response { get; set; } = null!;

    [StringLength(400)]
    public string? CustomTitle { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentFieldTypeResponses")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentFieldTypeID")]
    [InverseProperty("RiskAssessmentFieldTypeResponses")]
    public virtual RiskAssessmentFieldType RiskAssessmentFieldType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentFieldTypeResponses")]
    public virtual UserArea UserArea { get; set; } = null!;
}
