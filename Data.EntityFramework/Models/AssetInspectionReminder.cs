using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionReminder", Schema = "V7")]
public partial class AssetInspectionReminder
{
    [Key]
    public int AssetInspectionReminderID { get; set; }

    public int AssetInspectionCategoryID { get; set; }

    public int AssetID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    public int? AssetCategoryInspectionReminderID { get; set; }

    public string? Description { get; set; }

    public int TaskScheduleID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? AssetInspectionTypeID { get; set; }

    public int? ChecklistID { get; set; }
}
