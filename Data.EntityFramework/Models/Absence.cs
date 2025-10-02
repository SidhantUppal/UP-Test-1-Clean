using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Absence", Schema = "V7")]
public partial class Absence
{
    [Key]
    public int AbsenceID { get; set; }

    public int EmployeeID { get; set; }

    public int AbsenceTypeID { get; set; }

    public int? AbsenceReasonTypeID { get; set; }

    [StringLength(100)]
    public string? OtherAbsenceReason { get; set; }

    public int UserAreaID { get; set; }

    public bool IsClosed { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset? ExpectedReturnToWorkDate { get; set; }

    public DateTimeOffset? ActualReturnToWorkDate { get; set; }

    public bool IsAuthorised { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool LongTermAbsenceAlertSent { get; set; }

    [InverseProperty("Absence")]
    public virtual ICollection<AbsenceAttachment> AbsenceAttachments { get; set; } = new List<AbsenceAttachment>();

    [InverseProperty("Absence")]
    public virtual ICollection<AbsencePeriod> AbsencePeriods { get; set; } = new List<AbsencePeriod>();

    [ForeignKey("AbsenceReasonTypeID")]
    [InverseProperty("Absences")]
    public virtual AbsenceReasonType? AbsenceReasonType { get; set; }

    [InverseProperty("Absence")]
    public virtual ICollection<AbsenceRequirement> AbsenceRequirements { get; set; } = new List<AbsenceRequirement>();

    [InverseProperty("Absence")]
    public virtual ICollection<AbsenceTask> AbsenceTasks { get; set; } = new List<AbsenceTask>();

    [ForeignKey("AbsenceTypeID")]
    [InverseProperty("Absences")]
    public virtual AbsenceType AbsenceType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("Absences")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Absences")]
    public virtual UserArea UserArea { get; set; } = null!;
}
