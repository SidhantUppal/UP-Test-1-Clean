using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskClassificationType", Schema = "V7")]
public partial class TaskClassificationType
{
    [Key]
    public int TaskClassificationTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskClassificationTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskClassificationTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TaskClassificationTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TaskClassificationType")]
    public virtual ICollection<TaskClassification> TaskClassifications { get; set; } = new List<TaskClassification>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskClassificationTypes")]
    public virtual UserArea? UserArea { get; set; }
}
