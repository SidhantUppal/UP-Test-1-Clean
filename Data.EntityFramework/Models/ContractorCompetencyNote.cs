using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompetencyNote", Schema = "V7")]
public partial class ContractorCompetencyNote
{
    [Key]
    public int ContractorCompetencyNoteID { get; set; }

    public int ContractorCompetencyID { get; set; }

    public string Notes { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorCompetencyNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorCompetencyID")]
    [InverseProperty("ContractorCompetencyNotes")]
    public virtual ContractorCompetency ContractorCompetency { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorCompetencyNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;
}
