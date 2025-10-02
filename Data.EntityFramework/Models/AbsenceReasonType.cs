using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceReasonType", Schema = "V7")]
public partial class AbsenceReasonType
{
    [Key]
    public int AbsenceReasonTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? AbsenceTypeID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AbsenceTypeID")]
    [InverseProperty("AbsenceReasonTypes")]
    public virtual AbsenceType? AbsenceType { get; set; }

    [InverseProperty("AbsenceReasonType")]
    public virtual ICollection<Absence> Absences { get; set; } = new List<Absence>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceReasonTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceReasonTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceReasonTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AbsenceReasonTypes")]
    public virtual UserArea? UserArea { get; set; }
}
