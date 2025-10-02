using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblKnowledgeRequirementViewModel
{
    [Key]
    public int KnowledgeId { get; set; }

    public int? UnitId { get; set; }

    public int? ElementId { get; set; }

    [StringLength(20)]
    public string? RequirementCode { get; set; }

    public string RequirementText { get; set; } = null!;

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
