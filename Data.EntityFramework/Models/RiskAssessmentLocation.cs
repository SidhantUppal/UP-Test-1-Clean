using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentLocation", Schema = "V7")]
[Index("LocationID", Name = "IX_RiskAssessmentLocation_LocationID")]
[Index("RiskAssessmentID", "LocationID", Name = "UQ_RiskAssessmentLocation", IsUnique = true)]
public partial class RiskAssessmentLocation
{
    [Key]
    public int RiskAssessmentLocationID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int LocationID { get; set; }

    public string? LocationSpecificNotes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("RiskAssessmentLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentLocations")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentLocations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
