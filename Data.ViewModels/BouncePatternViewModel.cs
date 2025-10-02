using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BouncePatternViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
