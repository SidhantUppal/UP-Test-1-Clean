using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskLevelColourType", Schema = "V7")]
public partial class RiskLevelColourType
{
    [Key]
    public int RiskLevelColourTypeID { get; set; }

    [StringLength(50)]
    public string ColorName { get; set; } = null!;

    [StringLength(7)]
    public string ColorHex { get; set; } = null!;

    [StringLength(200)]
    public string? ColorDescription { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [InverseProperty("RiskLevelColourType")]
    public virtual ICollection<RiskMatrixTypeColour> RiskMatrixTypeColours { get; set; } = new List<RiskMatrixTypeColour>();
}
