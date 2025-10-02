using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblElement", Schema = "NVQ")]
[Index("UnitId", Name = "IX_Element_UnitId")]
public partial class tblElement
{
    [Key]
    public int ElementId { get; set; }

    public int UnitId { get; set; }

    [StringLength(20)]
    public string ElementCode { get; set; } = null!;

    [StringLength(200)]
    public string ElementTitle { get; set; } = null!;

    public string? Description { get; set; }

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("UnitId")]
    [InverseProperty("tblElements")]
    public virtual tblUnit Unit { get; set; } = null!;

    [InverseProperty("Element")]
    public virtual ICollection<tblKnowledgeRequirement> tblKnowledgeRequirements { get; set; } = new List<tblKnowledgeRequirement>();

    [InverseProperty("Element")]
    public virtual ICollection<tblPerformanceCriterion> tblPerformanceCriteria { get; set; } = new List<tblPerformanceCriterion>();

    [InverseProperty("Element")]
    public virtual ICollection<tblRange> tblRanges { get; set; } = new List<tblRange>();
}
