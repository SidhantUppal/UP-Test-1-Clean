using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaSetting", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaSetting_UserArea", IsUnique = true)]
public partial class UserAreaSetting
{
    [Key]
    public int UserAreaSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int IncidentInvestigationDueInDays { get; set; }

    public int DefaultManagerEmployeeID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? IncidentFormDisabledLocationIDList { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? IncidentFormDisabledOrgGroupIDList { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? DisabledEmailTypeIDList { get; set; }

    [StringLength(255)]
    public string? DefaultManagerEmail { get; set; }

    public int? DefaultSignOffEmployeeID { get; set; }

    public int? IncidentFormAlternativeSourceUserAreaID { get; set; }

    [ForeignKey("DefaultManagerEmployeeID")]
    [InverseProperty("UserAreaSettingDefaultManagerEmployees")]
    public virtual Employee DefaultManagerEmployee { get; set; } = null!;

    [ForeignKey("DefaultSignOffEmployeeID")]
    [InverseProperty("UserAreaSettingDefaultSignOffEmployees")]
    public virtual Employee? DefaultSignOffEmployee { get; set; }

    [ForeignKey("IncidentFormAlternativeSourceUserAreaID")]
    [InverseProperty("UserAreaSettingIncidentFormAlternativeSourceUserAreas")]
    public virtual UserArea? IncidentFormAlternativeSourceUserArea { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaSettingUserArea")]
    public virtual UserArea UserArea { get; set; } = null!;
}
