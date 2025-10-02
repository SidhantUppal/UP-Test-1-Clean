using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AbsenceType", Schema = "V7")]
public partial class AbsenceType
{
    [Key]
    public int AbsenceTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsHoliday { get; set; }

    public bool IsAuthorised { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AbsenceType")]
    public virtual ICollection<AbsenceReasonType> AbsenceReasonTypes { get; set; } = new List<AbsenceReasonType>();

    [InverseProperty("AbsenceType")]
    public virtual ICollection<Absence> Absences { get; set; } = new List<Absence>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AbsenceTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AbsenceTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AbsenceTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AbsenceTypes")]
    public virtual UserArea? UserArea { get; set; }
}
