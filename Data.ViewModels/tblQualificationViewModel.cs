using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblQualificationViewModel
{
    [Key]
    public int QualificationId { get; set; }

    [StringLength(50)]
    public string QualificationCode { get; set; } = null!;

    [StringLength(200)]
    public string QualificationTitle { get; set; } = null!;

    public int? Level { get; set; }

    [StringLength(100)]
    public string? AwardingBody { get; set; }

    public int? TotalCredits { get; set; }

    public int? MinimumCredits { get; set; }

    public int? GLH { get; set; }

    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? ValidFrom { get; set; }

    public DateTimeOffset? ValidTo { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
