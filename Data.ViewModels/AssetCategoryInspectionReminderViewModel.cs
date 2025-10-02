using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetCategoryInspectionReminderViewModel
{
    [Key]
    public int AssetCategoryInspectionReminderID { get; set; }

    public int AssetInspectionCategoryID { get; set; }

    public int AssetCategoryID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int FrequencyTypeID { get; set; }

    public int? FrequencyPeriod { get; set; }

    public int? TaskDueAlertPeriodOverride { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OLDID { get; set; }

    public int? AssetInspectionTypeID { get; set; }

    public int? ChecklistID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
