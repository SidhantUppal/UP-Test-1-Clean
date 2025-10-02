using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaTrainingSettingViewModel
{
    [Key]
    public int UserAreaTrainingSettingsID { get; set; }

    public int? TrainingManagerEmployeeID { get; set; }

    public int? AssessmentTaskDueDateLookAhead { get; set; }

    public int UserAreaID { get; set; }

    public int? DefaultSendEmailDate { get; set; }

    public int? DefaultDueDate { get; set; }

    // Additional Properties
}
