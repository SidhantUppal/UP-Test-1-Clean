using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTaskSettings", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaTaskSettings_UserArea", IsUnique = true)]
public partial class UserAreaTaskSetting
{
    [Key]
    public int TaskSettingsID { get; set; }

    public int? TaskDueAlertPeriod { get; set; }

    public int TaskScheduleLookUpaheadPeriod { get; set; }

    public int TaskDueAlertFrequencyID { get; set; }

    public int AssignerOverDueFrequencyID { get; set; }

    public int UserAreaID { get; set; }

    public int? FurtherActionsDueWithinPeriod { get; set; }

    public int? FurtherActionsDueWithinFrequencyTypeID { get; set; }

    public int? DefaultManagerEmployeeID { get; set; }

    [ForeignKey("AssignerOverDueFrequencyID")]
    [InverseProperty("UserAreaTaskSettingAssignerOverDueFrequencies")]
    public virtual EmailFrequencyType AssignerOverDueFrequency { get; set; } = null!;

    [ForeignKey("DefaultManagerEmployeeID")]
    [InverseProperty("UserAreaTaskSettings")]
    public virtual Employee? DefaultManagerEmployee { get; set; }

    [ForeignKey("FurtherActionsDueWithinFrequencyTypeID")]
    [InverseProperty("UserAreaTaskSettings")]
    public virtual FrequencyType? FurtherActionsDueWithinFrequencyType { get; set; }

    [ForeignKey("TaskDueAlertFrequencyID")]
    [InverseProperty("UserAreaTaskSettingTaskDueAlertFrequencies")]
    public virtual EmailFrequencyType TaskDueAlertFrequency { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTaskSetting")]
    public virtual UserArea UserArea { get; set; } = null!;
}
