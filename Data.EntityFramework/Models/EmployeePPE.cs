using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeePPE", Schema = "V7")]
public partial class EmployeePPE
{
    [Key]
    public int EmployeePPEID { get; set; }

    public int EmployeeID { get; set; }

    public int PPETypeID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateTimeOffset? Issued { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeePPEArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeePPECreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeePPEs")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeePPEModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("PPETypeID")]
    [InverseProperty("EmployeePPEs")]
    public virtual PPEType PPEType { get; set; } = null!;
}
