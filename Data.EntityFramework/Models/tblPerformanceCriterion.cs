using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblPerformanceCriteria", Schema = "NVQ")]
[Index("ElementId", Name = "IX_PerformanceCriteria_ElementId")]
public partial class tblPerformanceCriterion
{
    [Key]
    public int CriteriaId { get; set; }

    public int ElementId { get; set; }

    [StringLength(20)]
    public string? CriteriaCode { get; set; }

    public string CriteriaText { get; set; } = null!;

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("ElementId")]
    [InverseProperty("tblPerformanceCriteria")]
    public virtual tblElement Element { get; set; } = null!;

    [InverseProperty("Criteria")]
    public virtual ICollection<tblEvidencePerformanceCriterion> tblEvidencePerformanceCriteria { get; set; } = new List<tblEvidencePerformanceCriterion>();
}
