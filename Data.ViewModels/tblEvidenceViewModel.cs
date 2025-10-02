using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblEvidenceViewModel
{
    [Key]
    public int EvidenceId { get; set; }

    public int PortfolioId { get; set; }

    [StringLength(50)]
    public string EvidenceRef { get; set; } = null!;

    [StringLength(200)]
    public string EvidenceTitle { get; set; } = null!;

    public int? EvidenceTypeId { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? EvidenceDate { get; set; }

    [StringLength(200)]
    public string? Location { get; set; }

    public string? AssessorComments { get; set; }

    public string? IVComments { get; set; }

    [StringLength(500)]
    public string? DocumentPath { get; set; }

    public bool? IsDirectObservation { get; set; }

    public bool? IsQuestioning { get; set; }

    public bool? IsProductEvidence { get; set; }

    public bool? IsWitnessTestimony { get; set; }

    public bool? IsProfessionalDiscussion { get; set; }

    public bool? IsSimulation { get; set; }

    public bool? IsAuthentic { get; set; }

    public bool? IsCurrent { get; set; }

    public bool? IsSufficient { get; set; }

    public bool? IsValid { get; set; }

    public int? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
