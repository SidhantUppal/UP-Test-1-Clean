using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OrgGroupTaskSettingViewModel
{
    [Key]
    public int OrgGroupTaskSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int OrgGroupID { get; set; }

    public int TaskOverdueAlertEmployeeID { get; set; }

    public int? TaskOverdueAlertMinDays { get; set; }

    public int? TaskOverdueAlertMaxDays { get; set; }

    // Additional Properties
}
