using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeAbsenceConfig", Schema = "V7")]
public partial class EmployeeAbsenceConfig
{
    [Key]
    public int EmployeeAbsenceConfigID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? AnnualEntitlement { get; set; }

    public bool? CanRequestBankHolidays { get; set; }

    [StringLength(50)]
    public string? WorkDays { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeAbsenceConfigArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeAbsenceConfigCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeAbsenceConfigs")]
    public virtual Employee Employee { get; set; } = null!;

    [InverseProperty("EmployeeAbsenceConfig")]
    public virtual ICollection<EmployeeEntitlementLog> EmployeeEntitlementLogs { get; set; } = new List<EmployeeEntitlementLog>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeAbsenceConfigModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeAbsenceConfigs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
