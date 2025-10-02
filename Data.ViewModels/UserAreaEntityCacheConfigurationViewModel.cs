using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaEntityCacheConfigurationViewModel
{
    [Key]
    public int UserAreaEntityCacheConfigurationID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int MaxCacheCount { get; set; }

    // Additional Properties
}
