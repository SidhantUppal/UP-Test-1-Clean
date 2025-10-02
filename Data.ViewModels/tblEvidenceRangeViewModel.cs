using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblEvidenceRangeViewModel
{
    [Key]
    public int Id { get; set; }

    public int EvidenceId { get; set; }

    public int RangeId { get; set; }

    public bool? IsCovered { get; set; }

    public DateTimeOffset? AssessedDate { get; set; }

    public int? AssessedBy { get; set; }

    // Additional Properties
}
