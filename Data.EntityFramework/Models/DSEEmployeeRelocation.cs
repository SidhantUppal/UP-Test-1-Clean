using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSEEmployeeRelocation", Schema = "V7")]
public partial class DSEEmployeeRelocation
{
    [Key]
    public int DSEEmployeeRelocationID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset RelocationDate { get; set; }

    [StringLength(128)]
    public string? OldSeatNumber { get; set; }

    [StringLength(128)]
    public string? NewSeatNumber { get; set; }

    [StringLength(1024)]
    public string? RelocationReason { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DSEEmployeeRelocationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DSEEmployeeRelocationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("DSEEmployeeRelocations")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DSEEmployeeRelocationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
