using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaConfigurationViewModel
{
    [Key]
    public int UserAreaConfigurationID { get; set; }

    public int UserAreaID { get; set; }

    public int ConfigurationTypeID { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
