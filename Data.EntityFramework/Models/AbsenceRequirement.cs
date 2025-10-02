using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceRequirement", Schema = "V7")]
public partial class AbsenceRequirement
{
    [Key]
    public int AbsenceRequirementID { get; set; }

    public int AbsenceID { get; set; }

    public int RequirementTypeID { get; set; }

    public int? TaskID { get; set; }

    public bool IsRequired { get; set; }

    public bool IsCompleted { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AbsenceID")]
    [InverseProperty("AbsenceRequirements")]
    public virtual Absence Absence { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceRequirementArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceRequirementCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceRequirementModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RequirementTypeID")]
    [InverseProperty("AbsenceRequirements")]
    public virtual RequirementType RequirementType { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("AbsenceRequirements")]
    public virtual BSSTask? Task { get; set; }
}
