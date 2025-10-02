using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceSetting", Schema = "V7")]
public partial class AbsenceSetting
{
    [Key]
    public int AbsenceSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int? EmployeeID { get; set; }

    public int SettingType { get; set; }

    [StringLength(50)]
    public string? Type { get; set; }

    [StringLength(50)]
    public string? Value { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OrgGroupID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceSettingArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceSettingCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("AbsenceSettings")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceSettingModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("AbsenceSettings")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AbsenceSettings")]
    public virtual UserArea UserArea { get; set; } = null!;
}
