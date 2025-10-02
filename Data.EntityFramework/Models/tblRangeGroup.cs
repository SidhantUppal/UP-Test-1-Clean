using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblRangeGroup", Schema = "NVQ")]
public partial class tblRangeGroup
{
    [Key]
    public int RangeGroupId { get; set; }

    [StringLength(100)]
    public string GroupName { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [InverseProperty("RangeGroup")]
    public virtual ICollection<tblRange> tblRanges { get; set; } = new List<tblRange>();
}
