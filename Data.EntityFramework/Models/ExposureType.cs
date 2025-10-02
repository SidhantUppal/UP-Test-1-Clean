using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ExposureType", Schema = "V7")]
public partial class ExposureType
{
    [Key]
    public int ExposureTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ExposureTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ExposureType")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ExposureTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("ExposureType")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainings { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("ExposureType")]
    public virtual ICollection<ExposuresEmployee> ExposuresEmployees { get; set; } = new List<ExposuresEmployee>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ExposureTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("ExposureType")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ExposureTypes")]
    public virtual UserArea? UserArea { get; set; }
}
