using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ControlMeasureType", Schema = "V7")]
public partial class ControlMeasureType
{
    [Key]
    public int ControlMeasureTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string TypeName { get; set; } = null!;

    [StringLength(500)]
    public string? TypeDescription { get; set; }

    public int? HierarchyLevel { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ControlMeasureType")]
    public virtual ICollection<ControlMeasure> ControlMeasures { get; set; } = new List<ControlMeasure>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ControlMeasureTypes")]
    public virtual UserArea? UserArea { get; set; }
}
