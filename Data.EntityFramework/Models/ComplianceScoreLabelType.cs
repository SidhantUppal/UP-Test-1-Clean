using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ComplianceScoreLabelType", Schema = "V7")]
public partial class ComplianceScoreLabelType
{
    [Key]
    public int ComplianceScoreLabelTypeID { get; set; }

    public int ComplianceScoreTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int Score { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string? Colour { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [ForeignKey("ComplianceScoreTypeID")]
    [InverseProperty("ComplianceScoreLabelTypes")]
    public virtual ComplianceScoreType ComplianceScoreType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ComplianceScoreLabelTypes")]
    public virtual UserArea? UserArea { get; set; }
}
