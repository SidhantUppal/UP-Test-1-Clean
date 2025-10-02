using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentOperation", Schema = "V7")]
public partial class RiskAssessmentOperation
{
    [Key]
    public int RiskAssessmentOperationID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    [StringLength(255)]
    public string OperationName { get; set; } = null!;

    public string? OperationDescription { get; set; }

    public int? OperationSequence { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentOperations")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentOperations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
