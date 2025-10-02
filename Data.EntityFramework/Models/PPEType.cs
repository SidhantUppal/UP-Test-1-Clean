using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PPEType", Schema = "V7")]
public partial class PPEType
{
    [Key]
    public int PPETypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string SymbolIcon { get; set; } = null!;

    public int? ControlMeasureID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("PPETypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ControlMeasureID")]
    [InverseProperty("PPETypes")]
    public virtual ControlMeasure? ControlMeasure { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("PPETypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("PPEType")]
    public virtual ICollection<EmployeePPE> EmployeePPEs { get; set; } = new List<EmployeePPE>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("PPETypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("PPETypes")]
    public virtual UserArea? UserArea { get; set; }
}
