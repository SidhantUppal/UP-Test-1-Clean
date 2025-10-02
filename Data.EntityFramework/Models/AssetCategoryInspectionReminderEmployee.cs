using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetCategoryInspectionReminderEmployee", Schema = "V7")]
public partial class AssetCategoryInspectionReminderEmployee
{
    [Key]
    public int AssetCategoryInspectionReminderEmployeeID { get; set; }

    public int AssetCategoryInspectionReminderID { get; set; }

    public int EmployeeID { get; set; }
}
