using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserArea", Schema = "V7")]
[Index("Title", Name = "CK_UserArea_Title", IsUnique = true)]
[Index("GUID", Name = "IX_V7UserArea_Guid")]
public partial class UserArea
{
    [Key]
    public int UserAreaID { get; set; }

    public int ThemeTypeID { get; set; }

    public Guid GUID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(10)]
    public string? Prefix { get; set; }

    public bool IsDemo { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    [StringLength(255)]
    public string? BaseURL { get; set; }

    [StringLength(255)]
    public string? SSOLoginURL { get; set; }

    public int? MobileIdentityAPIInstanceID { get; set; }

    public int? UploadedFileMBLimit { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsenceApprovalType> AbsenceApprovalTypes { get; set; } = new List<AbsenceApprovalType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsenceDurationType> AbsenceDurationTypes { get; set; } = new List<AbsenceDurationType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsencePeriod> AbsencePeriods { get; set; } = new List<AbsencePeriod>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsenceReasonType> AbsenceReasonTypes { get; set; } = new List<AbsenceReasonType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsenceSetting> AbsenceSettings { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AbsenceType> AbsenceTypes { get; set; } = new List<AbsenceType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Absence> Absences { get; set; } = new List<Absence>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentCaseExport> AccidentCaseExports { get; set; } = new List<AccidentCaseExport>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentCaseNote> AccidentCaseNotes { get; set; } = new List<AccidentCaseNote>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentFormQuestionnaireKeyTypeReportableField> AccidentFormQuestionnaireKeyTypeReportableFields { get; set; } = new List<AccidentFormQuestionnaireKeyTypeReportableField>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentFormTypeQuestionType> AccidentFormTypeQuestionTypes { get; set; } = new List<AccidentFormTypeQuestionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentFormTypeUserArea> AccidentFormTypeUserAreas { get; set; } = new List<AccidentFormTypeUserArea>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentFormType> AccidentFormTypes { get; set; } = new List<AccidentFormType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentPerson> AccidentPeople { get; set; } = new List<AccidentPerson>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentQuestionType> AccidentQuestionTypes { get; set; } = new List<AccidentQuestionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AccidentSectionType> AccidentSectionTypes { get; set; } = new List<AccidentSectionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ActionPlan> ActionPlans { get; set; } = new List<ActionPlan>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ActionType> ActionTypes { get; set; } = new List<ActionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AffectedItemType> AffectedItemTypes { get; set; } = new List<AffectedItemType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AffectedItem> AffectedItems { get; set; } = new List<AffectedItem>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployees { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AlertType> AlertTypes { get; set; } = new List<AlertType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AnonymousAccidentForm> AnonymousAccidentForms { get; set; } = new List<AnonymousAccidentForm>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AnswerGrid> AnswerGrids { get; set; } = new List<AnswerGrid>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AnswerType> AnswerTypes { get; set; } = new List<AnswerType>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlans { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetInspectionAllianzImport> AssetInspectionAllianzImports { get; set; } = new List<AssetInspectionAllianzImport>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetInspectionCrimsonImport> AssetInspectionCrimsonImports { get; set; } = new List<AssetInspectionCrimsonImport>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetStatusChangeType> AssetStatusChangeTypes { get; set; } = new List<AssetStatusChangeType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AssetStatusType> AssetStatusTypes { get; set; } = new List<AssetStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AttachmentBackup> AttachmentBackups { get; set; } = new List<AttachmentBackup>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AttachmentUserArea> AttachmentUserAreas { get; set; } = new List<AttachmentUserArea>();

    [InverseProperty("UserArea")]
    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("UserArea")]
    public virtual ICollection<BankHolidayType> BankHolidayTypes { get; set; } = new List<BankHolidayType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<BodyPart> BodyParts { get; set; } = new List<BodyPart>();

    [InverseProperty("UserArea")]
    public virtual ICollection<BounceStatus> BounceStatuses { get; set; } = new List<BounceStatus>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CaseAssignableUser> CaseAssignableUsers { get; set; } = new List<CaseAssignableUser>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CaseType> CaseTypes { get; set; } = new List<CaseType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ChecklistEnrolment> ChecklistEnrolments { get; set; } = new List<ChecklistEnrolment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ChecklistSectorType> ChecklistSectorTypes { get; set; } = new List<ChecklistSectorType>();

    [InverseProperty("AssignedUserArea")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignmentAssignedUserAreas { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("IssuingUserArea")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignmentIssuingUserAreas { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplates { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ChecklistViewResponseUser> ChecklistViewResponseUsers { get; set; } = new List<ChecklistViewResponseUser>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Competency> Competencies { get; set; } = new List<Competency>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ComplianceScoreLabelType> ComplianceScoreLabelTypes { get; set; } = new List<ComplianceScoreLabelType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ConformityType> ConformityTypes { get; set; } = new List<ConformityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContactContactType> ContactContactTypes { get; set; } = new List<ContactContactType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContactType> ContactTypes { get; set; } = new List<ContactType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCategory> ContractorCategories { get; set; } = new List<ContractorCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCompany> ContractorCompanies { get; set; } = new List<ContractorCompany>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogs { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCompanyLog> ContractorCompanyLogs { get; set; } = new List<ContractorCompanyLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencies { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorCompliance> ContractorCompliances { get; set; } = new List<ContractorCompliance>();

    [InverseProperty("SiteUserArea")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccesses { get; set; } = new List<ContractorSiteAccess>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ContractorType> ContractorTypes { get; set; } = new List<ContractorType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Contractor> Contractors { get; set; } = new List<Contractor>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ControlMeasureType> ControlMeasureTypes { get; set; } = new List<ControlMeasureType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ControlMeasure> ControlMeasures { get; set; } = new List<ControlMeasure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CostType> CostTypes { get; set; } = new List<CostType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CostUnitType> CostUnitTypes { get; set; } = new List<CostUnitType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CounselChamber> CounselChambers { get; set; } = new List<CounselChamber>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Counsel> Counsels { get; set; } = new List<Counsel>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseAllocation> CourseAllocations { get; set; } = new List<CourseAllocation>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseAssignment> CourseAssignments { get; set; } = new List<CourseAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseAttachment> CourseAttachments { get; set; } = new List<CourseAttachment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseBundle> CourseBundles { get; set; } = new List<CourseBundle>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseCategory> CourseCategories { get; set; } = new List<CourseCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseCertificate> CourseCertificates { get; set; } = new List<CourseCertificate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseEnrolmentQuestionnaire> CourseEnrolmentQuestionnaires { get; set; } = new List<CourseEnrolmentQuestionnaire>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseEnrolmentSCORMActivity> CourseEnrolmentSCORMActivities { get; set; } = new List<CourseEnrolmentSCORMActivity>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseEnrolmentSignature> CourseEnrolmentSignatures { get; set; } = new List<CourseEnrolmentSignature>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseEnrolment> CourseEnrolments { get; set; } = new List<CourseEnrolment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseFilter> CourseFilters { get; set; } = new List<CourseFilter>();

    [InverseProperty("UserArea")]
    public virtual ICollection<CourseQuestionaire> CourseQuestionaires { get; set; } = new List<CourseQuestionaire>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("UserArea")]
    public virtual ICollection<CurrencyType> CurrencyTypes { get; set; } = new List<CurrencyType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DSECaseTask> DSECaseTasks { get; set; } = new List<DSECaseTask>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DSECase> DSECases { get; set; } = new List<DSECase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DangerType> DangerTypes { get; set; } = new List<DangerType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DangerousOccurrenceCategoryType> DangerousOccurrenceCategoryTypes { get; set; } = new List<DangerousOccurrenceCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DangerousOccurrenceType> DangerousOccurrenceTypes { get; set; } = new List<DangerousOccurrenceType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; } = new List<DashboardUserShortcutSlot>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DataActivityLog> DataActivityLogs { get; set; } = new List<DataActivityLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DataStructure> DataStructures { get; set; } = new List<DataStructure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DefaultDashboard> DefaultDashboards { get; set; } = new List<DefaultDashboard>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocPack> DocPacks { get; set; } = new List<DocPack>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocRegisterEmployee> DocRegisterEmployees { get; set; } = new List<DocRegisterEmployee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocRegisterTask> DocRegisterTasks { get; set; } = new List<DocRegisterTask>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentAssignment> DocumentAssignments { get; set; } = new List<DocumentAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignments { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentBundle> DocumentBundles { get; set; } = new List<DocumentBundle>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentFolder> DocumentFolders { get; set; } = new List<DocumentFolder>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentLink> DocumentLinks { get; set; } = new List<DocumentLink>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentRegister> DocumentRegisters { get; set; } = new List<DocumentRegister>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentRequirementSet> DocumentRequirementSets { get; set; } = new List<DocumentRequirementSet>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentTemplateTag> DocumentTemplateTags { get; set; } = new List<DocumentTemplateTag>();

    [InverseProperty("UserArea")]
    public virtual ICollection<DocumentTemplate> DocumentTemplates { get; set; } = new List<DocumentTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    [InverseProperty("UserArea")]
    public virtual EmailServiceConfiguration? EmailServiceConfiguration { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<EmailTemplate> EmailTemplates { get; set; } = new List<EmailTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeAbsenceConfig> EmployeeAbsenceConfigs { get; set; } = new List<EmployeeAbsenceConfig>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeCase> EmployeeCases { get; set; } = new List<EmployeeCase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalks { get; set; } = new List<EmployeeFavouriteWalk>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeFolder> EmployeeFolders { get; set; } = new List<EmployeeFolder>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeSicknessStatusType> EmployeeSicknessStatusTypes { get; set; } = new List<EmployeeSicknessStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlocks { get; set; } = new List<EmployeeTextBlock>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmployeeType> EmployeeTypes { get; set; } = new List<EmployeeType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EmploymentStatusType> EmploymentStatusTypes { get; set; } = new List<EmploymentStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Enquiry> Enquiries { get; set; } = new List<Enquiry>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EnquiryType> EnquiryTypes { get; set; } = new List<EnquiryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<EventAudience> EventAudiences { get; set; } = new List<EventAudience>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ExposureType> ExposureTypes { get; set; } = new List<ExposureType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ExposuresEmployee> ExposuresEmployees { get; set; } = new List<ExposuresEmployee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ExternalLink> ExternalLinks { get; set; } = new List<ExternalLink>();

    [InverseProperty("UserArea")]
    public virtual ICollection<FavouriteChecklist> FavouriteChecklists { get; set; } = new List<FavouriteChecklist>();

    [InverseProperty("UserArea")]
    public virtual ICollection<FavouriteRiskAssessment> FavouriteRiskAssessments { get; set; } = new List<FavouriteRiskAssessment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<FavouriteWalk> FavouriteWalks { get; set; } = new List<FavouriteWalk>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Favourite> Favourites { get; set; } = new List<Favourite>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Folder> Folders { get; set; } = new List<Folder>();

    [InverseProperty("UserArea")]
    public virtual ICollection<FrequencyType> FrequencyTypes { get; set; } = new List<FrequencyType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<GenderType> GenderTypes { get; set; } = new List<GenderType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<GenericStatusType> GenericStatusTypes { get; set; } = new List<GenericStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<GeographicalAreaType> GeographicalAreaTypes { get; set; } = new List<GeographicalAreaType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HAVSRegisterEntry> HAVSRegisterEntries { get; set; } = new List<HAVSRegisterEntry>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HAVSToolApplicableEmployee> HAVSToolApplicableEmployees { get; set; } = new List<HAVSToolApplicableEmployee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HAVSToolBannedEmployee> HAVSToolBannedEmployees { get; set; } = new List<HAVSToolBannedEmployee>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HAVSTool> HAVSTools { get; set; } = new List<HAVSTool>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisors { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCaseAttachmentType> HRCaseAttachmentTypes { get; set; } = new List<HRCaseAttachmentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCaseOutcomeType> HRCaseOutcomeTypes { get; set; } = new List<HRCaseOutcomeType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCaseStatusType> HRCaseStatusTypes { get; set; } = new List<HRCaseStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCaseViewerUser> HRCaseViewerUsers { get; set; } = new List<HRCaseViewerUser>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRCategory> HRCategories { get; set; } = new List<HRCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRMeetingType> HRMeetingTypes { get; set; } = new List<HRMeetingType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HRTemplate> HRTemplates { get; set; } = new List<HRTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HazardCategoryType> HazardCategoryTypes { get; set; } = new List<HazardCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HazardReportType> HazardReportTypes { get; set; } = new List<HazardReportType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HazardReport> HazardReports { get; set; } = new List<HazardReport>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HazardSeverityType> HazardSeverityTypes { get; set; } = new List<HazardSeverityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Hazard> Hazards { get; set; } = new List<Hazard>();

    [InverseProperty("UserArea")]
    public virtual ICollection<HighLevelProductType> HighLevelProductTypes { get; set; } = new List<HighLevelProductType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentCaseViewerRole> IncidentCaseViewerRoles { get; set; } = new List<IncidentCaseViewerRole>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentCategoryType> IncidentCategoryTypes { get; set; } = new List<IncidentCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentKind> IncidentKinds { get; set; } = new List<IncidentKind>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentPriorityType> IncidentPriorityTypes { get; set; } = new List<IncidentPriorityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentSeverityType> IncidentSeverityTypes { get; set; } = new List<IncidentSeverityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentStatusType> IncidentStatusTypes { get; set; } = new List<IncidentStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<IncidentType> IncidentTypes { get; set; } = new List<IncidentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<InductionAllocation> InductionAllocations { get; set; } = new List<InductionAllocation>();

    [InverseProperty("UserArea")]
    public virtual ICollection<InductionBundle> InductionBundles { get; set; } = new List<InductionBundle>();

    [InverseProperty("UserArea")]
    public virtual ICollection<InductionEnrolment> InductionEnrolments { get; set; } = new List<InductionEnrolment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<InjuryType> InjuryTypes { get; set; } = new List<InjuryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<JobExecution> JobExecutions { get; set; } = new List<JobExecution>();

    [InverseProperty("UserArea")]
    public virtual ICollection<JobRole> JobRoles { get; set; } = new List<JobRole>();

    [InverseProperty("UserArea")]
    public virtual ICollection<JobTemplate> JobTemplates { get; set; } = new List<JobTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<LanguageType> LanguageTypes { get; set; } = new List<LanguageType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<LegalRegister1> LegalRegister1s { get; set; } = new List<LegalRegister1>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Licence> Licences { get; set; } = new List<Licence>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Location> Locations { get; set; } = new List<Location>();

    [InverseProperty("UserArea")]
    public virtual ICollection<LogUserLogin> LogUserLogins { get; set; } = new List<LogUserLogin>();

    [InverseProperty("UserArea")]
    public virtual ICollection<LoginAction> LoginActions { get; set; } = new List<LoginAction>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MainActivityType> MainActivityTypes { get; set; } = new List<MainActivityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MainFactorType> MainFactorTypes { get; set; } = new List<MainFactorType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MainIndustryType> MainIndustryTypes { get; set; } = new List<MainIndustryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ManagerType> ManagerTypes { get; set; } = new List<ManagerType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MaritalStatusType> MaritalStatusTypes { get; set; } = new List<MaritalStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MobileProperty> MobileProperties { get; set; } = new List<MobileProperty>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MobileSubmissionDataLog> MobileSubmissionDataLogs { get; set; } = new List<MobileSubmissionDataLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<NonWorkingDay> NonWorkingDays { get; set; } = new List<NonWorkingDay>();

    [InverseProperty("UserArea")]
    public virtual ICollection<NotWorkingCategoryType> NotWorkingCategoryTypes { get; set; } = new List<NotWorkingCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    [InverseProperty("UserArea")]
    public virtual ICollection<OccupationalDiseaseType> OccupationalDiseaseTypes { get; set; } = new List<OccupationalDiseaseType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<OptionList> OptionLists { get; set; } = new List<OptionList>();

    [InverseProperty("UserArea")]
    public virtual ICollection<OrgGroupCategory> OrgGroupCategories { get; set; } = new List<OrgGroupCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<OrgGroupTaskSetting> OrgGroupTaskSettings { get; set; } = new List<OrgGroupTaskSetting>();

    [InverseProperty("UserArea")]
    public virtual ICollection<OrgGroup> OrgGroups { get; set; } = new List<OrgGroup>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PPEType> PPETypes { get; set; } = new List<PPEType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PersonTitleType> PersonTitleTypes { get; set; } = new List<PersonTitleType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PersonsAtRisk> PersonsAtRisks { get; set; } = new List<PersonsAtRisk>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PersonsInCharge> PersonsInCharges { get; set; } = new List<PersonsInCharge>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PlanCollectionType> PlanCollectionTypes { get; set; } = new List<PlanCollectionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyAcknowledgment> PolicyAcknowledgments { get; set; } = new List<PolicyAcknowledgment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyApprovalLog> PolicyApprovalLogs { get; set; } = new List<PolicyApprovalLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyAttachment> PolicyAttachments { get; set; } = new List<PolicyAttachment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyCategory> PolicyCategories { get; set; } = new List<PolicyCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyCompliance> PolicyCompliances { get; set; } = new List<PolicyCompliance>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyExternalLink> PolicyExternalLinks { get; set; } = new List<PolicyExternalLink>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyLocationAssignment> PolicyLocationAssignments { get; set; } = new List<PolicyLocationAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyOrgGroupAssignment> PolicyOrgGroupAssignments { get; set; } = new List<PolicyOrgGroupAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyReview> PolicyReviews { get; set; } = new List<PolicyReview>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyTag> PolicyTags { get; set; } = new List<PolicyTag>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyType> PolicyTypes { get; set; } = new List<PolicyType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PolicyUserAssignment> PolicyUserAssignments { get; set; } = new List<PolicyUserAssignment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<PrintedHeader> PrintedHeaders { get; set; } = new List<PrintedHeader>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ProcessExecution> ProcessExecutions { get; set; } = new List<ProcessExecution>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ProcessedDocument> ProcessedDocuments { get; set; } = new List<ProcessedDocument>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Process> Processes { get; set; } = new List<Process>();

    [InverseProperty("UserArea")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("UserArea")]
    public virtual ICollection<QuestionResponse> QuestionResponses { get; set; } = new List<QuestionResponse>();

    [InverseProperty("UserArea")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("UserArea")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSections { get; set; } = new List<QuestionnaireSection>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RIDDORSubmission> RIDDORSubmissions { get; set; } = new List<RIDDORSubmission>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RecruitmentType> RecruitmentTypes { get; set; } = new List<RecruitmentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RecruitmentVacancy> RecruitmentVacancies { get; set; } = new List<RecruitmentVacancy>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ReportingFieldType> ReportingFieldTypes { get; set; } = new List<ReportingFieldType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RequirementType> RequirementTypes { get; set; } = new List<RequirementType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ResourceCreditLimit> ResourceCreditLimits { get; set; } = new List<ResourceCreditLimit>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Resource> Resources { get; set; } = new List<Resource>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentApprovalLog> RiskAssessmentApprovalLogs { get; set; } = new List<RiskAssessmentApprovalLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentAttachment> RiskAssessmentAttachments { get; set; } = new List<RiskAssessmentAttachment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; } = new List<RiskAssessmentControlMeasure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentConversion> RiskAssessmentConversions { get; set; } = new List<RiskAssessmentConversion>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentExternalLink> RiskAssessmentExternalLinks { get; set; } = new List<RiskAssessmentExternalLink>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentFieldTypeResponse> RiskAssessmentFieldTypeResponses { get; set; } = new List<RiskAssessmentFieldTypeResponse>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypes { get; set; } = new List<RiskAssessmentFieldType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypes { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentHazard> RiskAssessmentHazards { get; set; } = new List<RiskAssessmentHazard>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentLocation> RiskAssessmentLocations { get; set; } = new List<RiskAssessmentLocation>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; } = new List<RiskAssessmentMonitorEventScore>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEvents { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentOperation> RiskAssessmentOperations { get; set; } = new List<RiskAssessmentOperation>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentOrgGroup> RiskAssessmentOrgGroups { get; set; } = new List<RiskAssessmentOrgGroup>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessmentPersonsAtRisk> RiskAssessmentPersonsAtRisks { get; set; } = new List<RiskAssessmentPersonsAtRisk>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskAssessment> RiskAssessments { get; set; } = new List<RiskAssessment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RiskSafetyPhrase> RiskSafetyPhrases { get; set; } = new List<RiskSafetyPhrase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RootCauseCategoryType> RootCauseCategoryTypes { get; set; } = new List<RootCauseCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<RootCauseType> RootCauseTypes { get; set; } = new List<RootCauseType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SCORMPackageUserArea> SCORMPackageUserAreas { get; set; } = new List<SCORMPackageUserArea>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWApprovalLog> SSOWApprovalLogs { get; set; } = new List<SSOWApprovalLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWAttachment> SSOWAttachments { get; set; } = new List<SSOWAttachment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWDocumentType> SSOWDocumentTypes { get; set; } = new List<SSOWDocumentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWExternalLink> SSOWExternalLinks { get; set; } = new List<SSOWExternalLink>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWLocation> SSOWLocations { get; set; } = new List<SSOWLocation>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWOrgGroup> SSOWOrgGroups { get; set; } = new List<SSOWOrgGroup>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SSOWRiskCategory> SSOWRiskCategories { get; set; } = new List<SSOWRiskCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeSystemOfWorkLog> SafeSystemOfWorkLogs { get; set; } = new List<SafeSystemOfWorkLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplates { get; set; } = new List<SafeSystemOfWorkTemplate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeSystemOfWorkType> SafeSystemOfWorkTypes { get; set; } = new List<SafeSystemOfWorkType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeWorkingProcedureStep> SafeWorkingProcedureSteps { get; set; } = new List<SafeWorkingProcedureStep>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SafeWorkingProcedure> SafeWorkingProcedures { get; set; } = new List<SafeWorkingProcedure>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ScheduledEvent> ScheduledEvents { get; set; } = new List<ScheduledEvent>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ScheduledJob> ScheduledJobs { get; set; } = new List<ScheduledJob>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SectorType> SectorTypes { get; set; } = new List<SectorType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SeverityOfInjuryType> SeverityOfInjuryTypes { get; set; } = new List<SeverityOfInjuryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SeverityType> SeverityTypes { get; set; } = new List<SeverityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ShortcutSystem> ShortcutSystems { get; set; } = new List<ShortcutSystem>();

    [InverseProperty("UserArea")]
    public virtual ICollection<ShortcutUserFavourite> ShortcutUserFavourites { get; set; } = new List<ShortcutUserFavourite>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SicknessStatusType> SicknessStatusTypes { get; set; } = new List<SicknessStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<SourceStaticDatum> SourceStaticData { get; set; } = new List<SourceStaticDatum>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TagType> TagTypes { get; set; } = new List<TagType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskAssignableUser> TaskAssignableUsers { get; set; } = new List<TaskAssignableUser>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskAssignmentLog> TaskAssignmentLogs { get; set; } = new List<TaskAssignmentLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskCategoryType> TaskCategoryTypes { get; set; } = new List<TaskCategoryType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskClassificationType> TaskClassificationTypes { get; set; } = new List<TaskClassificationType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskNote> TaskNotes { get; set; } = new List<TaskNote>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskReassignmentLog> TaskReassignmentLogs { get; set; } = new List<TaskReassignmentLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskSchedule> TaskSchedules { get; set; } = new List<TaskSchedule>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskSeverity> TaskSeverities { get; set; } = new List<TaskSeverity>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskTypeUserArea> TaskTypeUserAreas { get; set; } = new List<TaskTypeUserArea>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TaskType> TaskTypes { get; set; } = new List<TaskType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TextBlockApprovalLog> TextBlockApprovalLogs { get; set; } = new List<TextBlockApprovalLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TextBlockCategory> TextBlockCategories { get; set; } = new List<TextBlockCategory>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TextBlockSection> TextBlockSections { get; set; } = new List<TextBlockSection>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("ThemeTypeID")]
    [InverseProperty("UserAreas")]
    public virtual ThemeType ThemeType { get; set; } = null!;

    [InverseProperty("OwnerUserArea")]
    public virtual ICollection<Theme> Themes { get; set; } = new List<Theme>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseAttachmentTagType> TribunalCaseAttachmentTagTypes { get; set; } = new List<TribunalCaseAttachmentTagType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseAttachmentType> TribunalCaseAttachmentTypes { get; set; } = new List<TribunalCaseAttachmentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContacts { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounsels { get; set; } = new List<TribunalCaseCounsel>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseDistribution> TribunalCaseDistributions { get; set; } = new List<TribunalCaseDistribution>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseEventType> TribunalCaseEventTypes { get; set; } = new List<TribunalCaseEventType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCasePersonType> TribunalCasePersonTypes { get; set; } = new List<TribunalCasePersonType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseSeverityType> TribunalCaseSeverityTypes { get; set; } = new List<TribunalCaseSeverityType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseStatusType> TribunalCaseStatusTypes { get; set; } = new List<TribunalCaseStatusType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypes { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCaseType> TribunalCaseTypes { get; set; } = new List<TribunalCaseType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<TribunalCase> TribunalCases { get; set; } = new List<TribunalCase>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Update> Updates { get; set; } = new List<Update>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaAccidentFormQuestion> UserAreaAccidentFormQuestions { get; set; } = new List<UserAreaAccidentFormQuestion>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaAccidentForm> UserAreaAccidentForms { get; set; } = new List<UserAreaAccidentForm>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaAccidentQuestion> UserAreaAccidentQuestions { get; set; } = new List<UserAreaAccidentQuestion>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaAccidentSection> UserAreaAccidentSections { get; set; } = new List<UserAreaAccidentSection>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaAccidentTag> UserAreaAccidentTags { get; set; } = new List<UserAreaAccidentTag>();

    [InverseProperty("UserArea")]
    public virtual UserAreaActivity? UserAreaActivity { get; set; }

    [InverseProperty("UserArea")]
    public virtual UserAreaChecklistSetting? UserAreaChecklistSetting { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaConfiguration> UserAreaConfigurations { get; set; } = new List<UserAreaConfiguration>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaContact> UserAreaContacts { get; set; } = new List<UserAreaContact>();

    [InverseProperty("ContractorUserArea")]
    public virtual ICollection<UserAreaContractor> UserAreaContractorContractorUserAreas { get; set; } = new List<UserAreaContractor>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaContractor> UserAreaContractorUserAreas { get; set; } = new List<UserAreaContractor>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaCostType> UserAreaCostTypes { get; set; } = new List<UserAreaCostType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogs { get; set; } = new List<UserAreaCreditLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaCredit> UserAreaCredits { get; set; } = new List<UserAreaCredit>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaDivision> UserAreaDivisions { get; set; } = new List<UserAreaDivision>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaDocRegisterDocType> UserAreaDocRegisterDocTypes { get; set; } = new List<UserAreaDocRegisterDocType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaEntityCacheConfiguration> UserAreaEntityCacheConfigurations { get; set; } = new List<UserAreaEntityCacheConfiguration>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponses { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaFormSectionQuestion> UserAreaFormSectionQuestions { get; set; } = new List<UserAreaFormSectionQuestion>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaFormType> UserAreaFormTypes { get; set; } = new List<UserAreaFormType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaForm> UserAreaForms { get; set; } = new List<UserAreaForm>();

    [InverseProperty("UserArea")]
    public virtual UserAreaHRCost? UserAreaHRCost { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaHRCostLog> UserAreaHRCostLogs { get; set; } = new List<UserAreaHRCostLog>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaHRCostTransaction> UserAreaHRCostTransactions { get; set; } = new List<UserAreaHRCostTransaction>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaLanguage> UserAreaLanguages { get; set; } = new List<UserAreaLanguage>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaMonitoringConfiguration> UserAreaMonitoringConfigurations { get; set; } = new List<UserAreaMonitoringConfiguration>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaMonitoringMailingList> UserAreaMonitoringMailingLists { get; set; } = new List<UserAreaMonitoringMailingList>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; } = new List<UserAreaMonitoringReport>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaQuestionType> UserAreaQuestionTypes { get; set; } = new List<UserAreaQuestionType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaRegion> UserAreaRegions { get; set; } = new List<UserAreaRegion>();

    [InverseProperty("UserArea")]
    public virtual UserAreaRiskAssessmentSetting? UserAreaRiskAssessmentSetting { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypes { get; set; } = new List<UserAreaRiskAssessmentType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaSector> UserAreaSectors { get; set; } = new List<UserAreaSector>();

    [InverseProperty("IncidentFormAlternativeSourceUserArea")]
    public virtual ICollection<UserAreaSetting> UserAreaSettingIncidentFormAlternativeSourceUserAreas { get; set; } = new List<UserAreaSetting>();

    [InverseProperty("UserArea")]
    public virtual UserAreaSetting? UserAreaSettingUserArea { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaSystemProductType> UserAreaSystemProductTypes { get; set; } = new List<UserAreaSystemProductType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaTag> UserAreaTags { get; set; } = new List<UserAreaTag>();

    [InverseProperty("UserArea")]
    public virtual UserAreaTaskSetting? UserAreaTaskSetting { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaTaskType> UserAreaTaskTypes { get; set; } = new List<UserAreaTaskType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaTextBlockSectionOrder> UserAreaTextBlockSectionOrders { get; set; } = new List<UserAreaTextBlockSectionOrder>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaTextBlock> UserAreaTextBlocks { get; set; } = new List<UserAreaTextBlock>();

    [InverseProperty("UserArea")]
    public virtual UserAreaTextSetting? UserAreaTextSetting { get; set; }

    [InverseProperty("UserArea")]
    public virtual UserAreaTrainingSetting? UserAreaTrainingSetting { get; set; }

    [InverseProperty("UserArea")]
    public virtual ICollection<UserAreaUpdate> UserAreaUpdates { get; set; } = new List<UserAreaUpdate>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserContact> UserContacts { get; set; } = new List<UserContact>();

    [InverseProperty("PermittedUserArea")]
    public virtual ICollection<UserEmulator> UserEmulators { get; set; } = new List<UserEmulator>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklists { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessments { get; set; } = new List<UserFavouriteRiskAssessment>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserFilterSetting> UserFilterSettings { get; set; } = new List<UserFilterSetting>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserSystemProductType> UserSystemProductTypes { get; set; } = new List<UserSystemProductType>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserTextBlock> UserTextBlocks { get; set; } = new List<UserTextBlock>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserTwoStepAuthToken> UserTwoStepAuthTokens { get; set; } = new List<UserTwoStepAuthToken>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserUserArea> UserUserAreas { get; set; } = new List<UserUserArea>();

    [InverseProperty("UserArea")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklists { get; set; } = new List<UserWebFavouriteChecklist>();

    [InverseProperty("MasterUserArea")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();

    [InverseProperty("UserArea")]
    public virtual ICollection<Walk> Walks { get; set; } = new List<Walk>();

    [InverseProperty("UserArea")]
    public virtual ICollection<WorkInstruction> WorkInstructions { get; set; } = new List<WorkInstruction>();
}
