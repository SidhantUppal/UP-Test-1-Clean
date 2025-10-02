using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskMatrixConsequenceType", Schema = "V7")]
public partial class RiskMatrixConsequenceType
{
    [Key]
    public int RiskMatrixConsequenceTypeID { get; set; }

    public int RiskMatrixTypeID { get; set; }

    public int ConsequenceLevel { get; set; }

    [StringLength(100)]
    public string ConsequenceName { get; set; } = null!;

    [StringLength(500)]
    public string? ConsequenceDescription { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("RiskMatrixTypeID")]
    [InverseProperty("RiskMatrixConsequenceTypes")]
    public virtual RiskMatrixType RiskMatrixType { get; set; } = null!;
}
