using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringConfigurationViewModel
{
    [Key]
    public int UserAreaMonitoringConfigurationID { get; set; }

    public int UserAreaID { get; set; }

    public int UserAreaMonitoringSectionID { get; set; }

    // Additional Properties
}
