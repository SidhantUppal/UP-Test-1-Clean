using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseNote", Schema = "V7")]
public partial class CaseNote
{
    [Key]
    public int CaseNoteID { get; set; }

    public int CaseID { get; set; }

    public string Notes { get; set; } = null!;

    public bool IsInternal { get; set; }

    public DateTimeOffset? ActionFromDate { get; set; }

    public DateTimeOffset? ActionToDate { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? ActionInHours { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CaseNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CaseID")]
    [InverseProperty("CaseNotes")]
    public virtual Case Case { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;
}
