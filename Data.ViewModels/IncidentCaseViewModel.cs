using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentCaseViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
    public string? ReportedByUserName { get; set; }
    public string? AssignedToUserName { get; set; }
    public string? ClosedByUserName { get; set; }
    public string? IncidentTypeName { get; set; }
    public string? IncidentStatusTypeName { get; set; }
    public string? IncidentPriorityTypeName { get; set; }

    public string? IncidentSeverityCode { get; set; }
    public string? IncidentSeverityName { get; set; }
    public int IncidentSeverityLevel { get; set; }
    public string? IncidentSeverityColorCode { get; set; }
}
