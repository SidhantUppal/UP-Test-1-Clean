using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CostToReputationType", Schema = "V7")]
public partial class CostToReputationType
{
    [Key]
    public int CostToReputationTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    [InverseProperty("CostToReputationType")]
    public virtual ICollection<CostSheet> CostSheets { get; set; } = new List<CostSheet>();
}
