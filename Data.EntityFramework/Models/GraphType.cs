using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("GraphType", Schema = "Report")]
public partial class GraphType
{
    [Key]
    public int GraphTypeID { get; set; }

    public int GraphBaseTypeID { get; set; }

    public int GraphTabTypeID { get; set; }

    public int ModuleTypeID { get; set; }

    public int OrderNumber { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool IsDefaultEnabled { get; set; }

    public bool IsActive { get; set; }

    [ForeignKey("GraphBaseTypeID")]
    [InverseProperty("GraphTypes")]
    public virtual GraphBaseType GraphBaseType { get; set; } = null!;

    [ForeignKey("GraphTabTypeID")]
    [InverseProperty("GraphTypes")]
    public virtual GraphTabType GraphTabType { get; set; } = null!;
}
