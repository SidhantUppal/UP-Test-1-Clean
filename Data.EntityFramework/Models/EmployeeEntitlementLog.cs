using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeEntitlementLog", Schema = "V7")]
public partial class EmployeeEntitlementLog
{
    [Key]
    public int EmployeeEntitlementLogID { get; set; }

    public int EmployeeAbsenceConfigID { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? Added { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? Subtracted { get; set; }

    public DateTimeOffset ValidFrom { get; set; }

    public DateTimeOffset ValidTo { get; set; }

    public string? Comment { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeEntitlementLogArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeEntitlementLogCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeAbsenceConfigID")]
    [InverseProperty("EmployeeEntitlementLogs")]
    public virtual EmployeeAbsenceConfig EmployeeAbsenceConfig { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeEntitlementLogModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
