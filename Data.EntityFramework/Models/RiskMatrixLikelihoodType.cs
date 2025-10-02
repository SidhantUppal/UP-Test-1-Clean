using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskMatrixLikelihoodType", Schema = "V7")]
public partial class RiskMatrixLikelihoodType
{
    [Key]
    public int RiskMatrixLikelihoodTypeID { get; set; }

    public int RiskMatrixTypeID { get; set; }

    public int LikelihoodLevel { get; set; }

    [StringLength(100)]
    public string LikelihoodName { get; set; } = null!;

    [StringLength(500)]
    public string? LikelihoodDescription { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? Probability { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("RiskMatrixTypeID")]
    [InverseProperty("RiskMatrixLikelihoodTypes")]
    public virtual RiskMatrixType RiskMatrixType { get; set; } = null!;
}
