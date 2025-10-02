using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetCategoryInspectionReminderEmployeeViewModel
{
    [Key]
    public int AssetCategoryInspectionReminderEmployeeID { get; set; }

    public int AssetCategoryInspectionReminderID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
