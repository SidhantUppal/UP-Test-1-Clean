using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserConfigurationViewModel
{
    [Key]
    public int UserConfigurationID { get; set; }

    public int UserID { get; set; }

    public int ConfigurationTypeID { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
