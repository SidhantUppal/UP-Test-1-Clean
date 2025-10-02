using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaChecklistSettings", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaChecklistSettings_UserArea", IsUnique = true)]
public partial class UserAreaChecklistSetting
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

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("UserAreaChecklistSettings")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaChecklistSetting")]
    public virtual UserArea UserArea { get; set; } = null!;
}
