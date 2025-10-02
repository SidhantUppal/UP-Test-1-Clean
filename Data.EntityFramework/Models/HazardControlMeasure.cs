using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardControlMeasure", Schema = "V7")]
public partial class HazardControlMeasure
{
    [Key]
    public int HazardControlMeasureID { get; set; }

    public int HazardID { get; set; }

    public int ControlMeasureID { get; set; }

    [ForeignKey("ControlMeasureID")]
    [InverseProperty("HazardControlMeasures")]
    public virtual ControlMeasure ControlMeasure { get; set; } = null!;

    [ForeignKey("HazardID")]
    [InverseProperty("HazardControlMeasures")]
    public virtual Hazard Hazard { get; set; } = null!;
}
