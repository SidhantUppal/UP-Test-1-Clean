using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaRiskAssessmentType", Schema = "V7")]
public partial class UserAreaRiskAssessmentType
{
    [Key]
    public int UserAreaRiskAssessmentTypeID { get; set; }

    public int RiskAssessmentTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaRiskAssessmentTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RiskAssessmentTypeID")]
    [InverseProperty("UserAreaRiskAssessmentTypes")]
    public virtual RiskAssessmentType RiskAssessmentType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaRiskAssessmentTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
