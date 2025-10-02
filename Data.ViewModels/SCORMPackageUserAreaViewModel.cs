using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SCORMPackageUserAreaViewModel
{
    [Key]
    public int SCORMPackageUserAreaID { get; set; }

    public int SCORMPackageID { get; set; }

    public int UserAreaID { get; set; }

    // Additional Properties
}
