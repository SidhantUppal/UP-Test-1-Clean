using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCase", Schema = "V7")]
public partial class HRCase
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

    [Column(TypeName = "money")]
    public decimal? SettlementAgreementValue { get; set; }

    public int? AdvisorEmployeeID { get; set; }

    public int? SubmittedByUserTypeID { get; set; }

    public int RiskLevelID { get; set; }

    [ForeignKey("AppealOfficerEmployeeID")]
    [InverseProperty("HRCaseAppealOfficerEmployees")]
    public virtual Employee? AppealOfficerEmployee { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssumedLevelTagTypeID")]
    [InverseProperty("HRCaseAssumedLevelTagTypes")]
    public virtual TagType? AssumedLevelTagType { get; set; }

    [InverseProperty("HRCase")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [ForeignKey("CaseOfficerEmployeeID")]
    [InverseProperty("HRCaseCaseOfficerEmployees")]
    public virtual Employee? CaseOfficerEmployee { get; set; }

    [ForeignKey("ConfirmedLevelTagTypeID")]
    [InverseProperty("HRCaseConfirmedLevelTagTypes")]
    public virtual TagType? ConfirmedLevelTagType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("HRCaseEmployees")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("HRCaseAdvisorUserID")]
    [InverseProperty("HRCaseHRCaseAdvisorUsers")]
    public virtual User? HRCaseAdvisorUser { get; set; }

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisors { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseEmail> HRCaseEmails { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseEvent> HRCaseEvents { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetings { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [ForeignKey("HRCaseOutcomeTypeID")]
    [InverseProperty("HRCases")]
    public virtual HRCaseOutcomeType? HRCaseOutcomeType { get; set; }

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCasePing> HRCasePings { get; set; } = new List<HRCasePing>();

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCases")]
    public virtual HRCaseStatusType HRCaseStatusType { get; set; } = null!;

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseSupporter> HRCaseSupporters { get; set; } = new List<HRCaseSupporter>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseTagType> HRCaseTagTypes { get; set; } = new List<HRCaseTagType>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseTask> HRCaseTasks { get; set; } = new List<HRCaseTask>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseTemplateCategory> HRCaseTemplateCategories { get; set; } = new List<HRCaseTemplateCategory>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseTextBlockCollection> HRCaseTextBlockCollections { get; set; } = new List<HRCaseTextBlockCollection>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseTimePad> HRCaseTimePads { get; set; } = new List<HRCaseTimePad>();

    [InverseProperty("HRCase")]
    public virtual ICollection<HRCaseViewerUser> HRCaseViewerUsers { get; set; } = new List<HRCaseViewerUser>();

    [ForeignKey("HRCategoryID")]
    [InverseProperty("HRCases")]
    public virtual HRCategory? HRCategory { get; set; }

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRCases")]
    public virtual HRType HRType { get; set; } = null!;

    [ForeignKey("InvestigatingOfficerEmployeeID")]
    [InverseProperty("HRCaseInvestigatingOfficerEmployees")]
    public virtual Employee? InvestigatingOfficerEmployee { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("HRCases")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SeverityGenericStatusTypeID")]
    [InverseProperty("HRCases")]
    public virtual GenericStatusType? SeverityGenericStatusType { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("HRCases")]
    public virtual TaskSchedule? TaskSchedule { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCases")]
    public virtual UserArea UserArea { get; set; } = null!;
}
