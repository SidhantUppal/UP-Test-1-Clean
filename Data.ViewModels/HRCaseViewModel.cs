using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseViewModel
{
    [Key]
    public int HRCaseID { get; set; }

    public int HRTypeID { get; set; }

    public int? HRCategoryID { get; set; }

    [StringLength(50)]
    public string? HRCategoryOther { get; set; }

    public int HRCaseStatusTypeID { get; set; }

    public int? SeverityGenericStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int? EmployeeID { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    public DateTimeOffset? OpenedDate { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? HRCaseAdvisorUserID { get; set; }

    public int? AssumedLevelTagTypeID { get; set; }

    public int? ConfirmedLevelTagTypeID { get; set; }

    public int? HRCaseOutcomeTypeID { get; set; }

    public bool IsSuspensionRequired { get; set; }

    public bool HasLessThan2YearsService { get; set; }

    public bool IsInProbationaryPeriod { get; set; }

    public bool IsMedicalReportRequired { get; set; }

    [StringLength(30)]
    public string? MedicalReportProviderType { get; set; }

    [StringLength(30)]
    public string? MedicalReportProviderOccHealthType { get; set; }

    public bool? HasDisability { get; set; }

    public bool? HasAgreedAdjustments { get; set; }

    [StringLength(2000)]
    public string? Adjustments { get; set; }

    public DateTimeOffset? AdjustmentsEffectiveFromDate { get; set; }

    public bool HasSkippedInvestigation { get; set; }

    public int? InvestigatingOfficerEmployeeID { get; set; }

    [StringLength(100)]
    public string? InvestigatingOfficerName { get; set; }

    public int? CaseOfficerEmployeeID { get; set; }

    public int? AppealOfficerEmployeeID { get; set; }

    public int? TaskScheduleID { get; set; }

    public int? LocationID { get; set; }

    public DateTimeOffset? InvestigationCompletedDate { get; set; }

    public DateTimeOffset? DecisionDate { get; set; }

    public DateTimeOffset? AppealDecisionDate { get; set; }

    public DateOnly? NextMeetingDate { get; set; }

    public DateTimeOffset? ReferralDate { get; set; }

    public decimal? SettlementAgreementValue { get; set; }

    public int? AdvisorEmployeeID { get; set; }

    public int? SubmittedByUserTypeID { get; set; }

    public int RiskLevelID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
