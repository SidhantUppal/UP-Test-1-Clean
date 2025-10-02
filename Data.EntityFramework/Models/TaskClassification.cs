using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskClassification", Schema = "V7")]
[Index("TaskID", "TaskClassificationTypeID", Name = "CK_TaskClassification_Unique", IsUnique = true)]
[Index("TaskID", Name = "IX_TaskClassification_TaskID_includes")]
public partial class TaskClassification
{
    [Key]
    public int TaskClassificationID { get; set; }

    public int TaskID { get; set; }

    public int TaskClassificationTypeID { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskClassifications")]
    public virtual BSSTask Task { get; set; } = null!;

    [ForeignKey("TaskClassificationTypeID")]
    [InverseProperty("TaskClassifications")]
    public virtual TaskClassificationType TaskClassificationType { get; set; } = null!;
}
