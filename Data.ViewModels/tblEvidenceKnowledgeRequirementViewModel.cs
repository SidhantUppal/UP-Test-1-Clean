using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblEvidenceKnowledgeRequirementViewModel
{
    [Key]
    public int Id { get; set; }

    public int EvidenceId { get; set; }

    public int KnowledgeId { get; set; }

    public bool? IsMet { get; set; }

    public DateTimeOffset? AssessedDate { get; set; }

    public int? AssessedBy { get; set; }

    // Additional Properties
}
