using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblEvidenceKnowledgeRequirement", Schema = "NVQ")]
public partial class tblEvidenceKnowledgeRequirement
{
    [Key]
    public int Id { get; set; }

    public int EvidenceId { get; set; }

    public int KnowledgeId { get; set; }

    public bool? IsMet { get; set; }

    public DateTimeOffset? AssessedDate { get; set; }

    public int? AssessedBy { get; set; }

    [ForeignKey("EvidenceId")]
    [InverseProperty("tblEvidenceKnowledgeRequirements")]
    public virtual tblEvidence Evidence { get; set; } = null!;

    [ForeignKey("KnowledgeId")]
    [InverseProperty("tblEvidenceKnowledgeRequirements")]
    public virtual tblKnowledgeRequirement Knowledge { get; set; } = null!;
}
