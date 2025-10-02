using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ProductTypeHighLevelProductTypeViewModel
{
    [Key]
    public int ProductTypeHighLevelProductTypeID { get; set; }

    public int HighLevelProductTypeID { get; set; }

    public int ProductTypeID { get; set; }

    // Additional Properties
}
