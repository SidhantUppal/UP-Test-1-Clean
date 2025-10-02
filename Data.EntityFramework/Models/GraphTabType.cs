using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("GraphTabType", Schema = "Report")]
public partial class GraphTabType
{
    [Key]
    public int GraphTabTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [InverseProperty("GraphTabType")]
    public virtual ICollection<GraphType> GraphTypes { get; set; } = new List<GraphType>();
}
