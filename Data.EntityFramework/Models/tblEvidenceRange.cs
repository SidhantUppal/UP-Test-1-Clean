using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblEvidenceRange", Schema = "NVQ")]
public partial class tblEvidenceRange
{
    [Key]
    public int Id { get; set; }

    public int EvidenceId { get; set; }

    public int RangeId { get; set; }

    public bool? IsCovered { get; set; }

    public DateTimeOffset? AssessedDate { get; set; }

    public int? AssessedBy { get; set; }

    [ForeignKey("EvidenceId")]
    [InverseProperty("tblEvidenceRanges")]
    public virtual tblEvidence Evidence { get; set; } = null!;

    [ForeignKey("RangeId")]
    [InverseProperty("tblEvidenceRanges")]
    public virtual tblRange Range { get; set; } = null!;
}
