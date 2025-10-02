using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaChecklistSettingViewModel
{
    [Key]
    public int UserAreaChecklistSettingsID { get; set; }

    public int UserAreaID { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int? AssessmentTaskDueDateLookAhead { get; set; }

    public bool DisableSectorTypes { get; set; }

    public bool DisableColouredChecklistAnswers { get; set; }

    public byte? MaxCompleteNowChecklist { get; set; }

    public bool DisplayIncorrectAnswersAtTheTop { get; set; }

    [StringLength(50)]
    public string? UserTaskSeverityLookAheadPeriod { get; set; }

    [StringLength(50)]
    public string? ManagerTaskSeverityLookAheadPeriod { get; set; }

    // Additional Properties
}
