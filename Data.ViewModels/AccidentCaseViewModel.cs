using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseViewModel
{
    [Key]
    public int AccidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(8)]
    public string? Reference { get; set; }

    [StringLength(256)]
    public string? AdditionalReference { get; set; }

    public DateTimeOffset IncidentDate { get; set; }

    [StringLength(15)]
    public string? IncidentTime { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? OptionListItemID { get; set; }

    public bool HasLostTime { get; set; }

    [StringLength(255)]
    public string? OrganisationName { get; set; }

    [StringLength(255)]
    public string? LocationTitle { get; set; }

    [StringLength(255)]
    public string? Address1 { get; set; }

    [StringLength(255)]
    public string? Address2 { get; set; }

    [StringLength(255)]
    public string? Address3 { get; set; }

    [StringLength(255)]
    public string? Town { get; set; }

    [StringLength(255)]
    public string? County { get; set; }

    [StringLength(20)]
    public string? PostCode { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [StringLength(255)]
    public string? OrgGroupName { get; set; }

    public decimal? LostDays { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int? ClosedByEmployeeID { get; set; }

    public bool IsRIDDORReportable { get; set; }

    public int? RootCauseTypeID { get; set; }

    public int? SeverityTypeID { get; set; }

    public int? InjuryTypeID { get; set; }

    public int? IncidentKindID { get; set; }

    public bool IsReadyToClose { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public bool HasSuppressedAlerts { get; set; }

    public int? BodyPartID { get; set; }

    public bool IsFatality { get; set; }

    public bool IsRIDDORSpecifiedInjury { get; set; }

    public bool IsUnableToWorkForAbove7Days { get; set; }

    public bool IsNonWorkerInjuredAndHospitalised { get; set; }

    public bool IsAnonymousSubmission { get; set; }

    public bool IsApprovedSubmission { get; set; }

    public bool HasBeenHospitalisedForOver1Day { get; set; }

    public bool HasInvolvedUnconsciousness { get; set; }

    public bool HasInvolvedResuscitation { get; set; }

    public bool HasInvolvedEmergencyServices { get; set; }

    public bool IsWorkRelatedIncident { get; set; }

    [StringLength(255)]
    public string? ManagerEmployeeEmail { get; set; }

    [StringLength(20)]
    public string? PortalAccessToken { get; set; }

    public bool IsRIDDORDangerousOccurrence { get; set; }

    public bool IsRIDDOROccupationalDisease { get; set; }

    public bool IsSignOffRequired { get; set; }

    public bool IsSignedOff { get; set; }

    [StringLength(100)]
    public string? RootCauseOther { get; set; }

    public int? RootCauseCategoryTypeID { get; set; }

    public int? IncidentDateTimeZoneID { get; set; }

    public bool IsFirstAidRefused { get; set; }

    public string? FirstAidRefuserSignature { get; set; }

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
