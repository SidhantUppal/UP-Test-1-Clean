using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BouncePattern", Schema = "V7")]
public partial class BouncePattern
{
    [Key]
    public int BouncePatternID { get; set; }

    [StringLength(100)]
    public string PatternName { get; set; } = null!;

    [StringLength(500)]
    public string? SubjectPattern { get; set; }

    [StringLength(500)]
    public string? BodyPattern { get; set; }

    [StringLength(500)]
    public string? SenderPattern { get; set; }

    [StringLength(50)]
    public string PatternType { get; set; } = null!;

    public bool IsActive { get; set; }

    public int Priority { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("BouncePatternArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("BouncePatternCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("BouncePatternModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
