using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTrainingSettings", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaTrainingSettings_UserArea", IsUnique = true)]
public partial class UserAreaTrainingSetting
{
    [Key]
    public int UserAreaTrainingSettingsID { get; set; }

    public int? TrainingManagerEmployeeID { get; set; }

    public int? AssessmentTaskDueDateLookAhead { get; set; }

    public int UserAreaID { get; set; }

    public int? DefaultSendEmailDate { get; set; }

    public int? DefaultDueDate { get; set; }

    [ForeignKey("TrainingManagerEmployeeID")]
    [InverseProperty("UserAreaTrainingSettings")]
    public virtual Employee? TrainingManagerEmployee { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTrainingSetting")]
    public virtual UserArea UserArea { get; set; } = null!;
}
