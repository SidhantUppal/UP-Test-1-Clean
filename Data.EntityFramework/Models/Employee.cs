using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Employee", Schema = "V7")]
public partial class Employee
{
    [Key]
    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? PersonTitleType { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? GenderType { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    public int? UserID { get; set; }

    public bool IsHidden { get; set; }

    public bool IsGloballyViewable { get; set; }

    public bool IsArchivableViaImport { get; set; }

    public bool IsHomeWorker { get; set; }

    public bool IsNotWorking { get; set; }

    public bool IsComputerUser { get; set; }

    public bool HasEmailsDisabled { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateOnly? AnnualReviewDate { get; set; }

    [StringLength(50)]
    public string? NINumber { get; set; }

    [StringLength(255)]
    public string? JobTitle { get; set; }

    [StringLength(255)]
    public string? Telephone { get; set; }

    [StringLength(255)]
    public string? Mobile { get; set; }

    public int? LineManagerEmployeeID { get; set; }

    public int? ProfileAttachmentID { get; set; }

    public string? Signature { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("Employee")]
    public virtual ICollection<AbsenceSetting> AbsenceSettings { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("Employee")]
    public virtual ICollection<Absence> Absences { get; set; } = new List<Absence>();

    [InverseProperty("ClosedByEmployee")]
    public virtual ICollection<AccidentCase> AccidentCaseClosedByEmployees { get; set; } = new List<AccidentCase>();

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<AccidentCase> AccidentCaseManagerEmployees { get; set; } = new List<AccidentCase>();

    [InverseProperty("Employee")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("AssessorEmployee")]
    public virtual ICollection<AccidentPerson> AccidentPersonAssessorEmployees { get; set; } = new List<AccidentPerson>();

    [InverseProperty("Employee")]
    public virtual ICollection<AccidentPerson> AccidentPersonEmployees { get; set; } = new List<AccidentPerson>();

    [InverseProperty("Employee")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployees { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Employee")]
    public virtual ICollection<AssetDSEEmployee> AssetDSEEmployees { get; set; } = new List<AssetDSEEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ChecklistContent> ChecklistContentCreatedByUsers { get; set; } = new List<ChecklistContent>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ChecklistContent> ChecklistContentModifiedByUsers { get; set; } = new List<ChecklistContent>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ChecklistResponseDatum> ChecklistResponseDatumCreatedByUsers { get; set; } = new List<ChecklistResponseDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ChecklistResponseDatum> ChecklistResponseDatumModifiedByUsers { get; set; } = new List<ChecklistResponseDatum>();

    [InverseProperty("Employee")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignmentEmployees { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignmentManagerEmployees { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("DefaultManagerEmployee")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplates { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [InverseProperty("Employee")]
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    [InverseProperty("Employee")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencies { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("Employee")]
    public virtual ICollection<ContractorRegister> ContractorRegisters { get; set; } = new List<ContractorRegister>();

    [InverseProperty("Employee")]
    public virtual ICollection<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnel { get; set; } = new List<ContractorSiteAccessPersonnel>();

    [InverseProperty("CounselEmployee")]
    public virtual ICollection<Counsel> Counsels { get; set; } = new List<Counsel>();

    [InverseProperty("AssessorEmployee")]
    public virtual ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Employee")]
    public virtual ICollection<DSECase> DSECases { get; set; } = new List<DSECase>();

    [InverseProperty("Employee")]
    public virtual ICollection<DSEEmployeeRelocation> DSEEmployeeRelocations { get; set; } = new List<DSEEmployeeRelocation>();

    [InverseProperty("Employee")]
    public virtual ICollection<DocRegisterEmployee> DocRegisterEmployees { get; set; } = new List<DocRegisterEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<DocumentRegisterEmployee> DocumentRegisterEmployees { get; set; } = new List<DocumentRegisterEmployee>();

    [InverseProperty("TaskAssigneeEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTaskAssigneeEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier1ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier1ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier2ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier2ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier3ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier3ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier4ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier4ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier5ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier5ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Tier6ManagerEmployee")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeTier6ManagerEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeAbsenceConfig> EmployeeAbsenceConfigs { get; set; } = new List<EmployeeAbsenceConfig>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeAttachment> EmployeeAttachments { get; set; } = new List<EmployeeAttachment>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeCase> EmployeeCases { get; set; } = new List<EmployeeCase>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalks { get; set; } = new List<EmployeeFavouriteWalk>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeFolder> EmployeeFolders { get; set; } = new List<EmployeeFolder>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeePPE> EmployeePPEs { get; set; } = new List<EmployeePPE>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeQualification> EmployeeQualifications { get; set; } = new List<EmployeeQualification>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeSicknessStatusType> EmployeeSicknessStatusTypes { get; set; } = new List<EmployeeSicknessStatusType>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlocks { get; set; } = new List<EmployeeTextBlock>();

    [InverseProperty("Employee")]
    public virtual ICollection<EmployeeTimePad> EmployeeTimePads { get; set; } = new List<EmployeeTimePad>();

    [InverseProperty("Employee")]
    public virtual ICollection<ExposuresEmployee> ExposuresEmployees { get; set; } = new List<ExposuresEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<HAVSRegisterEntry> HAVSRegisterEntries { get; set; } = new List<HAVSRegisterEntry>();

    [InverseProperty("Employee")]
    public virtual ICollection<HAVSToolApplicableEmployee> HAVSToolApplicableEmployees { get; set; } = new List<HAVSToolApplicableEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<HAVSToolBannedEmployee> HAVSToolBannedEmployees { get; set; } = new List<HAVSToolBannedEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisors { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("AppealOfficerEmployee")]
    public virtual ICollection<HRCase> HRCaseAppealOfficerEmployees { get; set; } = new List<HRCase>();

    [InverseProperty("CaseOfficerEmployee")]
    public virtual ICollection<HRCase> HRCaseCaseOfficerEmployees { get; set; } = new List<HRCase>();

    [InverseProperty("Employee")]
    public virtual ICollection<HRCase> HRCaseEmployees { get; set; } = new List<HRCase>();

    [InverseProperty("InvestigatingOfficerEmployee")]
    public virtual ICollection<HRCase> HRCaseInvestigatingOfficerEmployees { get; set; } = new List<HRCase>();

    [InverseProperty("Employee")]
    public virtual ICollection<HRCaseMeetingAttendee> HRCaseMeetingAttendees { get; set; } = new List<HRCaseMeetingAttendee>();

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetings { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("Employee")]
    public virtual ICollection<InductionAllocation> InductionAllocations { get; set; } = new List<InductionAllocation>();

    [InverseProperty("LineManagerEmployee")]
    public virtual ICollection<Employee> InverseLineManagerEmployee { get; set; } = new List<Employee>();

    [InverseProperty("Employee")]
    public virtual ICollection<JobRoleEmployee> JobRoleEmployees { get; set; } = new List<JobRoleEmployee>();

    [ForeignKey("LineManagerEmployeeID")]
    [InverseProperty("InverseLineManagerEmployee")]
    public virtual Employee? LineManagerEmployee { get; set; }

    [InverseProperty("Employee")]
    public virtual ICollection<LocationEmployee> LocationEmployees { get; set; } = new List<LocationEmployee>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Employee")]
    public virtual ICollection<OrgGroupEmployee> OrgGroupEmployees { get; set; } = new List<OrgGroupEmployee>();

    [InverseProperty("TaskOverdueAlertEmployee")]
    public virtual ICollection<OrgGroupTaskSetting> OrgGroupTaskSettings { get; set; } = new List<OrgGroupTaskSetting>();

    [ForeignKey("ProfileAttachmentID")]
    [InverseProperty("Employees")]
    public virtual Attachment? ProfileAttachment { get; set; }

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("Employee")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("CheckedByEmployee")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventCheckedByEmployees { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("MonitorEmployee")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventMonitorEmployees { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("Employee")]
    public virtual ICollection<TaskActivity> TaskActivities { get; set; } = new List<TaskActivity>();

    [InverseProperty("Employee")]
    public virtual ICollection<TaskAssignmentLog> TaskAssignmentLogs { get; set; } = new List<TaskAssignmentLog>();

    [InverseProperty("Employee")]
    public virtual ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();

    [InverseProperty("Employee")]
    public virtual ICollection<TaskScheduleAssignment> TaskScheduleAssignments { get; set; } = new List<TaskScheduleAssignment>();

    [InverseProperty("Employee")]
    public virtual ICollection<TaskScheduleEmployee> TaskScheduleEmployees { get; set; } = new List<TaskScheduleEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<TextBlockCollectionEmployee> TextBlockCollectionEmployees { get; set; } = new List<TextBlockCollectionEmployee>();

    [InverseProperty("Employee")]
    public virtual ICollection<TextBlockEmployee> TextBlockEmployees { get; set; } = new List<TextBlockEmployee>();

    [InverseProperty("ClaimantEmployee")]
    public virtual ICollection<TribunalCase> TribunalCaseClaimantEmployees { get; set; } = new List<TribunalCase>();

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<TribunalCase> TribunalCaseManagerEmployees { get; set; } = new List<TribunalCase>();

    [ForeignKey("UserID")]
    [InverseProperty("EmployeeUsers")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Employees")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("ManagerEmployee")]
    public virtual ICollection<UserAreaChecklistSetting> UserAreaChecklistSettings { get; set; } = new List<UserAreaChecklistSetting>();

    [InverseProperty("Employee")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponses { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("Employee")]
    public virtual ICollection<UserAreaMonitoringMailingList> UserAreaMonitoringMailingLists { get; set; } = new List<UserAreaMonitoringMailingList>();

    [InverseProperty("DefaultManagerEmployee")]
    public virtual ICollection<UserAreaSetting> UserAreaSettingDefaultManagerEmployees { get; set; } = new List<UserAreaSetting>();

    [InverseProperty("DefaultSignOffEmployee")]
    public virtual ICollection<UserAreaSetting> UserAreaSettingDefaultSignOffEmployees { get; set; } = new List<UserAreaSetting>();

    [InverseProperty("DefaultManagerEmployee")]
    public virtual ICollection<UserAreaTaskSetting> UserAreaTaskSettings { get; set; } = new List<UserAreaTaskSetting>();

    [InverseProperty("TrainingManagerEmployee")]
    public virtual ICollection<UserAreaTrainingSetting> UserAreaTrainingSettings { get; set; } = new List<UserAreaTrainingSetting>();

    [InverseProperty("Employee")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklists { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("Employee")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessments { get; set; } = new List<UserFavouriteRiskAssessment>();

    [InverseProperty("Employee")]
    public virtual ICollection<WalkAdhocEmployee> WalkAdhocEmployees { get; set; } = new List<WalkAdhocEmployee>();

    [InverseProperty("CheckpointBreachAlertUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentCheckpointBreachAlertUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("DefaultHazardEmployee")]
    public virtual ICollection<WalkAssignment> WalkAssignmentDefaultHazardEmployees { get; set; } = new List<WalkAssignment>();

    [InverseProperty("Employee")]
    public virtual ICollection<WalkAssignment> WalkAssignmentEmployees { get; set; } = new List<WalkAssignment>();

    [InverseProperty("LateWalkBreachAlertEmployee")]
    public virtual ICollection<WalkAssignment> WalkAssignmentLateWalkBreachAlertEmployees { get; set; } = new List<WalkAssignment>();

    [InverseProperty("ManagerSignature")]
    public virtual ICollection<WalkAssignment> WalkAssignmentManagerSignatures { get; set; } = new List<WalkAssignment>();

    [InverseProperty("MissedWalkBreachAlertUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentMissedWalkBreachAlertUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("SkipCheckpointBreachAlertUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentSkipCheckpointBreachAlertUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("Employee")]
    public virtual ICollection<WalkResponse> WalkResponses { get; set; } = new List<WalkResponse>();

    [InverseProperty("DefaultHazardEmployee")]
    public virtual ICollection<Walk> Walks { get; set; } = new List<Walk>();
}
