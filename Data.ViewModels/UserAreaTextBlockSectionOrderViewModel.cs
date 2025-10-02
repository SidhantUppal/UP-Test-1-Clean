using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTextBlockSectionOrderViewModel
{
    [Key]
    public int UserAreaTextBlockSectionOrderID { get; set; }

    public int UserAreaID { get; set; }

    public int TextBlockSectionID { get; set; }

    public int OrderNum { get; set; }

    // Additional Properties
}
