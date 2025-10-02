using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentOrgGroup", Schema = "V7")]
[Index("OrgGroupID", Name = "IX_RiskAssessmentOrgGroup_OrgGroupID")]
[Index("RiskAssessmentID", "OrgGroupID", Name = "UQ_RiskAssessmentOrgGroup", IsUnique = true)]
public partial class RiskAssessmentOrgGroup
{
    [Key]
    public int RiskAssessmentOrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int OrgGroupID { get; set; }

    public string? OrgGroupSpecificNotes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("RiskAssessmentOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentOrgGroups")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentOrgGroups")]
    public virtual UserArea UserArea { get; set; } = null!;
}
