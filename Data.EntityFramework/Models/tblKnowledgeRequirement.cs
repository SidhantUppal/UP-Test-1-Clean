using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblKnowledgeRequirement", Schema = "NVQ")]
public partial class tblKnowledgeRequirement
{
    [Key]
    public int KnowledgeId { get; set; }

    public int? UnitId { get; set; }

    public int? ElementId { get; set; }

    [StringLength(20)]
    public string? RequirementCode { get; set; }

    public string RequirementText { get; set; } = null!;

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("ElementId")]
    [InverseProperty("tblKnowledgeRequirements")]
    public virtual tblElement? Element { get; set; }

    [ForeignKey("UnitId")]
    [InverseProperty("tblKnowledgeRequirements")]
    public virtual tblUnit? Unit { get; set; }

    [InverseProperty("Knowledge")]
    public virtual ICollection<tblEvidenceKnowledgeRequirement> tblEvidenceKnowledgeRequirements { get; set; } = new List<tblEvidenceKnowledgeRequirement>();
}
