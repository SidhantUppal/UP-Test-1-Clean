using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionReminderViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
