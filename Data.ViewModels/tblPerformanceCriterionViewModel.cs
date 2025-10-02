using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblPerformanceCriterionViewModel
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

    // Additional Properties
}
