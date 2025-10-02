using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskMatrixTypeColour", Schema = "V7")]
public partial class RiskMatrixTypeColour
{
    [Key]
    public int RiskMatrixTypeColourID { get; set; }

    public int RiskMatrixTypeID { get; set; }

    public int LikelihoodLevel { get; set; }

    public int ConsequenceLevel { get; set; }

    public int RiskLevelColourTypeID { get; set; }

    public int RiskScore { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("RiskLevelColourTypeID")]
    [InverseProperty("RiskMatrixTypeColours")]
    public virtual RiskLevelColourType RiskLevelColourType { get; set; } = null!;

    [ForeignKey("RiskMatrixTypeID")]
    [InverseProperty("RiskMatrixTypeColours")]
    public virtual RiskMatrixType RiskMatrixType { get; set; } = null!;
}
