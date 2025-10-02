using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ExposureTypeTraining", Schema = "V7")]
public partial class ExposureTypeTraining
{
    [Key]
    public int ExposureTypeTrainingID { get; set; }

    public int ExposureTypeID { get; set; }

    public int? CourseID { get; set; }

    public int? ChecklistID { get; set; }

    public int? FrequencyTypeID { get; set; }

    public int? Frequency { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? DocumentID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ExposureTypeTrainingArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistID")]
    [InverseProperty("ExposureTypeTrainings")]
    public virtual Checklist? Checklist { get; set; }

    [ForeignKey("CourseID")]
    [InverseProperty("ExposureTypeTrainings")]
    public virtual Course? Course { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ExposureTypeTrainingCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("ExposureTypeTrainings")]
    public virtual DocumentLinkTableType? DocumentLinkTableType { get; set; }

    [ForeignKey("ExposureTypeID")]
    [InverseProperty("ExposureTypeTrainings")]
    public virtual ExposureType ExposureType { get; set; } = null!;

    [ForeignKey("FrequencyTypeID")]
    [InverseProperty("ExposureTypeTrainings")]
    public virtual FrequencyType? FrequencyType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ExposureTypeTrainingModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
