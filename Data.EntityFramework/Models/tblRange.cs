using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblRange", Schema = "NVQ")]
public partial class tblRange
{
    [Key]
    public int RangeId { get; set; }

    public int ElementId { get; set; }

    public int? RangeGroupId { get; set; }

    public string RangeText { get; set; } = null!;

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("ElementId")]
    [InverseProperty("tblRanges")]
    public virtual tblElement Element { get; set; } = null!;

    [ForeignKey("RangeGroupId")]
    [InverseProperty("tblRanges")]
    public virtual tblRangeGroup? RangeGroup { get; set; }

    [InverseProperty("Range")]
    public virtual ICollection<tblEvidenceRange> tblEvidenceRanges { get; set; } = new List<tblEvidenceRange>();
}
