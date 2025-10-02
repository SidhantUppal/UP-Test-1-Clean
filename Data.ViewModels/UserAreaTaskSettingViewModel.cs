using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTaskSettingViewModel
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

    // Additional Properties
}
