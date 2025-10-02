using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblEvidencePerformanceCriteria", Schema = "NVQ")]
public partial class tblEvidencePerformanceCriterion
{
    [Key]
    public int Id { get; set; }

    public int EvidenceId { get; set; }

    public int CriteriaId { get; set; }

    public bool? IsMet { get; set; }

    public DateTimeOffset? AssessedDate { get; set; }

    public int? AssessedBy { get; set; }

    [ForeignKey("CriteriaId")]
    [InverseProperty("tblEvidencePerformanceCriteria")]
    public virtual tblPerformanceCriterion Criteria { get; set; } = null!;

    [ForeignKey("EvidenceId")]
    [InverseProperty("tblEvidencePerformanceCriteria")]
    public virtual tblEvidence Evidence { get; set; } = null!;
}
