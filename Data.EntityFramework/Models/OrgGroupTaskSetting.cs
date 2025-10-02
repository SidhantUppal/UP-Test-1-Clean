using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OrgGroupTaskSetting", Schema = "V7")]
public partial class OrgGroupTaskSetting
{
    [Key]
    public int OrgGroupTaskSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int OrgGroupID { get; set; }

    public int TaskOverdueAlertEmployeeID { get; set; }

    public int? TaskOverdueAlertMinDays { get; set; }

    public int? TaskOverdueAlertMaxDays { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("OrgGroupTaskSettings")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("TaskOverdueAlertEmployeeID")]
    [InverseProperty("OrgGroupTaskSettings")]
    public virtual Employee TaskOverdueAlertEmployee { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("OrgGroupTaskSettings")]
    public virtual UserArea UserArea { get; set; } = null!;
}
