using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskScheduleViewModel
{
    [Key]
    public int TaskScheduleID { get; set; }

    public int UserAreaID { get; set; }

    public int TaskTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(1000)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? NextProcessingDate { get; set; }

    public int FrequencyTypeID { get; set; }

    public int? FrequencyPeriod { get; set; }

    public byte TaskDueAlertPeriodOverride { get; set; }

    public bool IsOneTaskCreatedForMultiple { get; set; }

    public bool IsNextProcessingDone { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
