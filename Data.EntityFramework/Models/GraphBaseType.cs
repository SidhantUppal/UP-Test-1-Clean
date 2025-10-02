using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("GraphBaseType", Schema = "Report")]
public partial class GraphBaseType
{
    [Key]
    public int GraphBaseTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [InverseProperty("GraphBaseType")]
    public virtual ICollection<GraphType> GraphTypes { get; set; } = new List<GraphType>();
}
