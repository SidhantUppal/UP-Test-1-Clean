using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRequirement", Schema = "V7")]
[Index("RequirementSetID", Name = "IX_DocumentRequirement_RequirementSetID")]
public partial class DocumentRequirement
{
    [Key]
    public int RequirementID { get; set; }

    public int RequirementSetID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? DocumentType { get; set; }

    public bool IsRequired { get; set; }

    [StringLength(50)]
    public string? ExpectedFormat { get; set; }

    public long? MaxFileSize { get; set; }

    public int? ValidityDays { get; set; }

    public int OrderIndex { get; set; }

    [InverseProperty("Requirement")]
    public virtual ICollection<DocumentRequirementFulfillment> DocumentRequirementFulfillments { get; set; } = new List<DocumentRequirementFulfillment>();

    [ForeignKey("RequirementSetID")]
    [InverseProperty("DocumentRequirements")]
    public virtual DocumentRequirementSet RequirementSet { get; set; } = null!;
}
