using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentCase", Schema = "V7")]
[Index("CaseNumber", Name = "UQ__tmp_ms_x__103BB8D8A7C0CF9E", IsUnique = true)]
public partial class IncidentCase
{
    [Key]
    public int IncidentCaseID { get; set; }

    [StringLength(50)]
    public string CaseNumber { get; set; } = null!;

    [StringLength(255)]
    public string? AdditionalReference { get; set; }

    public string? Description { get; set; }

    public int IncidentTypeID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset IncidentDate { get; set; }

    public DateTimeOffset? ReportedDate { get; set; }

    public int? LocationID { get; set; }

    public int? IncidentSeverityTypeID { get; set; }

    public int? IncidentStatusTypeID { get; set; }

    public int? IncidentPriorityTypeID { get; set; }

    public int ReportedByUserID { get; set; }

    public int? AssignedToUserID { get; set; }

    public int? InvolvedEmployeeID { get; set; }

    public DateTimeOffset? InvestigationStartDate { get; set; }

    public DateTimeOffset? InvestigationEndDate { get; set; }

    public string? RootCause { get; set; }

    public string? CorrectiveActions { get; set; }

    public string? PreventiveActions { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int? ClosedByUserID { get; set; }

    public string? ClosureNotes { get; set; }

    public bool? IsDeleted { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int ModifiedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    [InverseProperty("SourceIncidentCase")]
    public virtual ICollection<IncidentCaseLink> IncidentCaseLinks { get; set; } = new List<IncidentCaseLink>();

    [InverseProperty("IncidentCase")]
    public virtual ICollection<IncidentCaseNote> IncidentCaseNotes { get; set; } = new List<IncidentCaseNote>();

    [InverseProperty("IncidentCase")]
    public virtual ICollection<IncidentFormDatum> IncidentFormData { get; set; } = new List<IncidentFormDatum>();

    [ForeignKey("IncidentPriorityTypeID")]
    [InverseProperty("IncidentCases")]
    public virtual IncidentPriorityType? IncidentPriorityType { get; set; }

    [ForeignKey("IncidentSeverityTypeID")]
    [InverseProperty("IncidentCases")]
    public virtual IncidentSeverityType? IncidentSeverityType { get; set; }

    [ForeignKey("IncidentStatusTypeID")]
    [InverseProperty("IncidentCases")]
    public virtual IncidentStatusType? IncidentStatusType { get; set; }

    [ForeignKey("IncidentTypeID")]
    [InverseProperty("IncidentCases")]
    public virtual IncidentType IncidentType { get; set; } = null!;
}
