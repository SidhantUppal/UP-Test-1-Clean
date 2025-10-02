using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistContent", Schema = "V7")]
public partial class ChecklistContent
{
    [Key]
    public int ChecklistContentID { get; set; }

    public int ChecklistTemplateID { get; set; }

    public int Version { get; set; }

    public string ContentJSON { get; set; } = null!;

    public int? QuestionCount { get; set; }

    public int? MaxScore { get; set; }

    public bool? HasCriticalQuestions { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("ChecklistTemplateID")]
    [InverseProperty("ChecklistContents")]
    public virtual ChecklistTemplate ChecklistTemplate { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistContentCreatedByUsers")]
    public virtual Employee CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistContentModifiedByUsers")]
    public virtual Employee? ModifiedByUser { get; set; }
}
