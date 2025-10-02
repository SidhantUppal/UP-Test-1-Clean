using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsencePeriod", Schema = "V7")]
public partial class AbsencePeriod
{
    [Key]
    public int AbsencePeriodID { get; set; }

    public int AbsenceID { get; set; }

    public int AbsenceDurationTypeID { get; set; }

    public int AbsenceApprovalTypeID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsAutomated { get; set; }

    public DateOnly AbsenceDate { get; set; }

    public DateTimeOffset? CustomStartTime { get; set; }

    public DateTimeOffset? CustomEndTime { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AbsenceID")]
    [InverseProperty("AbsencePeriods")]
    public virtual Absence Absence { get; set; } = null!;

    [ForeignKey("AbsenceApprovalTypeID")]
    [InverseProperty("AbsencePeriods")]
    public virtual AbsenceApprovalType AbsenceApprovalType { get; set; } = null!;

    [ForeignKey("AbsenceDurationTypeID")]
    [InverseProperty("AbsencePeriods")]
    public virtual AbsenceDurationType AbsenceDurationType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsencePeriodArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsencePeriodCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsencePeriodModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AbsencePeriods")]
    public virtual UserArea UserArea { get; set; } = null!;
}
