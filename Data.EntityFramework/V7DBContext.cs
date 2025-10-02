using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Data.EntityFramework.Models;
using Bus.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework;

public partial class V7DBContext : DbContext, IDbContext
{
    public V7DBContext()
    {
    }
        public V7DBContext(DbContextOptions<V7DBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Absence> Absences { get; set; }

    public virtual DbSet<AbsenceApprovalType> AbsenceApprovalTypes { get; set; }

    public virtual DbSet<AbsenceAttachment> AbsenceAttachments { get; set; }

    public virtual DbSet<AbsenceDurationType> AbsenceDurationTypes { get; set; }

    public virtual DbSet<AbsencePeriod> AbsencePeriods { get; set; }

    public virtual DbSet<AbsenceReasonType> AbsenceReasonTypes { get; set; }

    public virtual DbSet<AbsenceRequirement> AbsenceRequirements { get; set; }

    public virtual DbSet<AbsenceSetting> AbsenceSettings { get; set; }

    public virtual DbSet<AbsenceTask> AbsenceTasks { get; set; }

    public virtual DbSet<AbsenceType> AbsenceTypes { get; set; }

    public virtual DbSet<AccidentCase> AccidentCases { get; set; }

    public virtual DbSet<AccidentCaseAssociation> AccidentCaseAssociations { get; set; }

    public virtual DbSet<AccidentCaseAttachment> AccidentCaseAttachments { get; set; }

    public virtual DbSet<AccidentCaseExport> AccidentCaseExports { get; set; }

    public virtual DbSet<AccidentCaseFieldDatum> AccidentCaseFieldData { get; set; }

    public virtual DbSet<AccidentCaseNote> AccidentCaseNotes { get; set; }

    public virtual DbSet<AccidentCasePersonDatum> AccidentCasePersonData { get; set; }

    public virtual DbSet<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; }

    public virtual DbSet<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeData { get; set; }

    public virtual DbSet<AccidentCaseViewerUser> AccidentCaseViewerUsers { get; set; }

    public virtual DbSet<AccidentForm> AccidentForms { get; set; }

    public virtual DbSet<AccidentFormCrossPopulationType> AccidentFormCrossPopulationTypes { get; set; }

    public virtual DbSet<AccidentFormQuestionnaireKeyTypeReportableField> AccidentFormQuestionnaireKeyTypeReportableFields { get; set; }

    public virtual DbSet<AccidentFormStatusType> AccidentFormStatusTypes { get; set; }

    public virtual DbSet<AccidentFormType> AccidentFormTypes { get; set; }

    public virtual DbSet<AccidentFormTypeQuestionType> AccidentFormTypeQuestionTypes { get; set; }

    public virtual DbSet<AccidentFormTypeUserArea> AccidentFormTypeUserAreas { get; set; }

    public virtual DbSet<AccidentPerson> AccidentPeople { get; set; }

    public virtual DbSet<AccidentPersonBodyPart> AccidentPersonBodyParts { get; set; }

    public virtual DbSet<AccidentPersonType> AccidentPersonTypes { get; set; }

    public virtual DbSet<AccidentQuestionType> AccidentQuestionTypes { get; set; }

    public virtual DbSet<AccidentSectionType> AccidentSectionTypes { get; set; }

    public virtual DbSet<ActionPlan> ActionPlans { get; set; }

    public virtual DbSet<ActionPlanItem> ActionPlanItems { get; set; }

    public virtual DbSet<ActionType> ActionTypes { get; set; }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<AffectedItem> AffectedItems { get; set; }

    public virtual DbSet<AffectedItemType> AffectedItemTypes { get; set; }

    public virtual DbSet<Alert> Alerts { get; set; }

    public virtual DbSet<AlertType> AlertTypes { get; set; }

    public virtual DbSet<AlertTypeEmployee> AlertTypeEmployees { get; set; }

    public virtual DbSet<AlertTypeEmployeeLocation> AlertTypeEmployeeLocations { get; set; }

    public virtual DbSet<AlertTypeEmployeeOrgGroup> AlertTypeEmployeeOrgGroups { get; set; }

    public virtual DbSet<AlertTypeUserArea> AlertTypeUserAreas { get; set; }

    public virtual DbSet<AllowedDomain> AllowedDomains { get; set; }

    public virtual DbSet<AnonymousAccidentForm> AnonymousAccidentForms { get; set; }

    public virtual DbSet<AnswerGrid> AnswerGrids { get; set; }

    public virtual DbSet<AnswerGridAnswer> AnswerGridAnswers { get; set; }

    public virtual DbSet<AnswerGridAnswerItem> AnswerGridAnswerItems { get; set; }

    public virtual DbSet<AnswerGridQuestion> AnswerGridQuestions { get; set; }

    public virtual DbSet<AnswerType> AnswerTypes { get; set; }

    public virtual DbSet<ApiKey> ApiKeys { get; set; }

    public virtual DbSet<ApplicationStatusType> ApplicationStatusTypes { get; set; }

    public virtual DbSet<ApprovalStatusType> ApprovalStatusTypes { get; set; }

    public virtual DbSet<AsbestosManagementPlan> AsbestosManagementPlans { get; set; }

    public virtual DbSet<Asset> Assets { get; set; }

    public virtual DbSet<AssetAttachment> AssetAttachments { get; set; }

    public virtual DbSet<AssetCategory> AssetCategories { get; set; }

    public virtual DbSet<AssetCategoryInspectionReminder> AssetCategoryInspectionReminders { get; set; }

    public virtual DbSet<AssetCategoryInspectionReminderEmployee> AssetCategoryInspectionReminderEmployees { get; set; }

    public virtual DbSet<AssetDSEEmployee> AssetDSEEmployees { get; set; }

    public virtual DbSet<AssetInspection> AssetInspections { get; set; }

    public virtual DbSet<AssetInspectionAllianzImport> AssetInspectionAllianzImports { get; set; }

    public virtual DbSet<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; }

    public virtual DbSet<AssetInspectionAllianzImportSuccess> AssetInspectionAllianzImportSuccesses { get; set; }

    public virtual DbSet<AssetInspectionAttachment> AssetInspectionAttachments { get; set; }

    public virtual DbSet<AssetInspectionCategory> AssetInspectionCategories { get; set; }

    public virtual DbSet<AssetInspectionChecklist> AssetInspectionChecklists { get; set; }

    public virtual DbSet<AssetInspectionCrimsonImport> AssetInspectionCrimsonImports { get; set; }

    public virtual DbSet<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; }

    public virtual DbSet<AssetInspectionCrimsonImportSuccess> AssetInspectionCrimsonImportSuccesses { get; set; }

    public virtual DbSet<AssetInspectionLocation> AssetInspectionLocations { get; set; }

    public virtual DbSet<AssetInspectionReminder> AssetInspectionReminders { get; set; }

    public virtual DbSet<AssetInspectionStatusType> AssetInspectionStatusTypes { get; set; }

    public virtual DbSet<AssetInspectionType> AssetInspectionTypes { get; set; }

    public virtual DbSet<AssetLocation> AssetLocations { get; set; }

    public virtual DbSet<AssetOrgGroup> AssetOrgGroups { get; set; }

    public virtual DbSet<AssetQRCode> AssetQRCodes { get; set; }

    public virtual DbSet<AssetStatusChange> AssetStatusChanges { get; set; }

    public virtual DbSet<AssetStatusChangeType> AssetStatusChangeTypes { get; set; }

    public virtual DbSet<AssetStatusType> AssetStatusTypes { get; set; }

    public virtual DbSet<AssignmentHistory> AssignmentHistories { get; set; }

    public virtual DbSet<AssignmentSignature> AssignmentSignatures { get; set; }

    public virtual DbSet<Attachment> Attachments { get; set; }

    public virtual DbSet<AttachmentBackup> AttachmentBackups { get; set; }

    public virtual DbSet<AttachmentChild> AttachmentChildren { get; set; }

    public virtual DbSet<AttachmentLocation> AttachmentLocations { get; set; }

    public virtual DbSet<AttachmentType> AttachmentTypes { get; set; }

    public virtual DbSet<AttachmentUserArea> AttachmentUserAreas { get; set; }

    public virtual DbSet<AuditLog> AuditLogs { get; set; }

    public virtual DbSet<BCARMClient> BCARMClients { get; set; }

    public virtual DbSet<BCARMError> BCARMErrors { get; set; }

    public virtual DbSet<BCARMLog> BCARMLogs { get; set; }

    public virtual DbSet<BCARMUser> BCARMUsers { get; set; }

    public virtual DbSet<BCARMUserArea> BCARMUserAreas { get; set; }

    public virtual DbSet<BSSTask> BSSTasks { get; set; }

    public virtual DbSet<BSSTimeZone> BSSTimeZones { get; set; }

    public virtual DbSet<BankHolidayType> BankHolidayTypes { get; set; }

    public virtual DbSet<BenefitType> BenefitTypes { get; set; }

    public virtual DbSet<BodyPart> BodyParts { get; set; }

    public virtual DbSet<BodyPartPickerType> BodyPartPickerTypes { get; set; }

    public virtual DbSet<BouncePattern> BouncePatterns { get; set; }

    public virtual DbSet<BounceStatus> BounceStatuses { get; set; }

    public virtual DbSet<Case> Cases { get; set; }

    public virtual DbSet<CaseAssignableUser> CaseAssignableUsers { get; set; }

    public virtual DbSet<CaseAttachment> CaseAttachments { get; set; }

    public virtual DbSet<CaseEmailNotification> CaseEmailNotifications { get; set; }

    public virtual DbSet<CaseLog> CaseLogs { get; set; }

    public virtual DbSet<CaseNote> CaseNotes { get; set; }

    public virtual DbSet<CaseStatusType> CaseStatusTypes { get; set; }

    public virtual DbSet<CaseType> CaseTypes { get; set; }

    public virtual DbSet<CaseUser> CaseUsers { get; set; }

    public virtual DbSet<CaseUserType> CaseUserTypes { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CategoryType> CategoryTypes { get; set; }

    public virtual DbSet<Checklist> Checklists { get; set; }

    public virtual DbSet<ChecklistAssetInspection> ChecklistAssetInspections { get; set; }

    public virtual DbSet<ChecklistAssignment> ChecklistAssignments { get; set; }

    public virtual DbSet<ChecklistContent> ChecklistContents { get; set; }

    public virtual DbSet<ChecklistEnrolment> ChecklistEnrolments { get; set; }

    public virtual DbSet<ChecklistOrgGroup> ChecklistOrgGroups { get; set; }

    public virtual DbSet<ChecklistResponseDatum> ChecklistResponseData { get; set; }

    public virtual DbSet<ChecklistSectorType> ChecklistSectorTypes { get; set; }

    public virtual DbSet<ChecklistTemplate> ChecklistTemplates { get; set; }

    public virtual DbSet<ChecklistTemplateAssignment> ChecklistTemplateAssignments { get; set; }

    public virtual DbSet<ChecklistTemplateCategory> ChecklistTemplateCategories { get; set; }

    public virtual DbSet<ChecklistTemplateEnrolment> ChecklistTemplateEnrolments { get; set; }

    public virtual DbSet<ChecklistType> ChecklistTypes { get; set; }

    public virtual DbSet<ChecklistViewResponseUser> ChecklistViewResponseUsers { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<CompanyInsurance> CompanyInsurances { get; set; }

    public virtual DbSet<CompanyStatus> CompanyStatuses { get; set; }

    public virtual DbSet<Competency> Competencies { get; set; }

    public virtual DbSet<ComplianceScoreLabelType> ComplianceScoreLabelTypes { get; set; }

    public virtual DbSet<ComplianceScoreType> ComplianceScoreTypes { get; set; }

    public virtual DbSet<ConfigurationType> ConfigurationTypes { get; set; }

    public virtual DbSet<ConformityType> ConformityTypes { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<ContactAttachment> ContactAttachments { get; set; }

    public virtual DbSet<ContactContactType> ContactContactTypes { get; set; }

    public virtual DbSet<ContactType> ContactTypes { get; set; }

    public virtual DbSet<ContextHelpText> ContextHelpTexts { get; set; }

    public virtual DbSet<ContextHelpTextStory> ContextHelpTextStories { get; set; }

    public virtual DbSet<Contractor> Contractors { get; set; }

    public virtual DbSet<ContractorCategory> ContractorCategories { get; set; }

    public virtual DbSet<ContractorCompany> ContractorCompanies { get; set; }

    public virtual DbSet<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogs { get; set; }

    public virtual DbSet<ContractorCompanyAttachment> ContractorCompanyAttachments { get; set; }

    public virtual DbSet<ContractorCompanyLog> ContractorCompanyLogs { get; set; }

    public virtual DbSet<ContractorCompanySSIP> ContractorCompanySSIPs { get; set; }

    public virtual DbSet<ContractorCompetency> ContractorCompetencies { get; set; }

    public virtual DbSet<ContractorCompetencyAttachment> ContractorCompetencyAttachments { get; set; }

    public virtual DbSet<ContractorCompetencyNote> ContractorCompetencyNotes { get; set; }

    public virtual DbSet<ContractorCompetencyStatusType> ContractorCompetencyStatusTypes { get; set; }

    public virtual DbSet<ContractorCompliance> ContractorCompliances { get; set; }

    public virtual DbSet<ContractorRegister> ContractorRegisters { get; set; }

    public virtual DbSet<ContractorSiteAccess> ContractorSiteAccesses { get; set; }

    public virtual DbSet<ContractorSiteAccessAttachment> ContractorSiteAccessAttachments { get; set; }

    public virtual DbSet<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnel { get; set; }

    public virtual DbSet<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; }

    public virtual DbSet<ContractorSiteAccessSignOff> ContractorSiteAccessSignOffs { get; set; }

    public virtual DbSet<ContractorSiteAccessStatus> ContractorSiteAccessStatuses { get; set; }

    public virtual DbSet<ContractorType> ContractorTypes { get; set; }

    public virtual DbSet<ControlMeasure> ControlMeasures { get; set; }

    public virtual DbSet<ControlMeasureType> ControlMeasureTypes { get; set; }

    public virtual DbSet<CopyUserAreaDatum> CopyUserAreaData { get; set; }

    public virtual DbSet<CopyUserAreaEmployee> CopyUserAreaEmployees { get; set; }

    public virtual DbSet<CopyUserAreaUser> CopyUserAreaUsers { get; set; }

    public virtual DbSet<CostSheet> CostSheets { get; set; }

    public virtual DbSet<CostSheetCostType> CostSheetCostTypes { get; set; }

    public virtual DbSet<CostToReputationType> CostToReputationTypes { get; set; }

    public virtual DbSet<CostType> CostTypes { get; set; }

    public virtual DbSet<CostUnitType> CostUnitTypes { get; set; }

    public virtual DbSet<Counsel> Counsels { get; set; }

    public virtual DbSet<CounselChamber> CounselChambers { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseAllocation> CourseAllocations { get; set; }

    public virtual DbSet<CourseAssignment> CourseAssignments { get; set; }

    public virtual DbSet<CourseAttachment> CourseAttachments { get; set; }

    public virtual DbSet<CourseBundle> CourseBundles { get; set; }

    public virtual DbSet<CourseBundleCourse> CourseBundleCourses { get; set; }

    public virtual DbSet<CourseBundleFilter> CourseBundleFilters { get; set; }

    public virtual DbSet<CourseCategory> CourseCategories { get; set; }

    public virtual DbSet<CourseCertificate> CourseCertificates { get; set; }

    public virtual DbSet<CourseEnrollment> CourseEnrollments { get; set; }

    public virtual DbSet<CourseEnrollmentQuestionnaire> CourseEnrollmentQuestionnaires { get; set; }

    public virtual DbSet<CourseEnrolment> CourseEnrolments { get; set; }

    public virtual DbSet<CourseEnrolmentQuestionnaire> CourseEnrolmentQuestionnaires { get; set; }

    public virtual DbSet<CourseEnrolmentSCORMActivity> CourseEnrolmentSCORMActivities { get; set; }

    public virtual DbSet<CourseEnrolmentSignature> CourseEnrolmentSignatures { get; set; }

    public virtual DbSet<CourseEnrolmentStatusType> CourseEnrolmentStatusTypes { get; set; }

    public virtual DbSet<CourseFilter> CourseFilters { get; set; }

    public virtual DbSet<CourseQuestionaire> CourseQuestionaires { get; set; }

    public virtual DbSet<CourseType> CourseTypes { get; set; }

    public virtual DbSet<CurrencyType> CurrencyTypes { get; set; }

    public virtual DbSet<CustomPermission> CustomPermissions { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DSECase> DSECases { get; set; }

    public virtual DbSet<DSECaseAttachment> DSECaseAttachments { get; set; }

    public virtual DbSet<DSECaseNote> DSECaseNotes { get; set; }

    public virtual DbSet<DSECaseStatusType> DSECaseStatusTypes { get; set; }

    public virtual DbSet<DSECaseTask> DSECaseTasks { get; set; }

    public virtual DbSet<DSECaseType> DSECaseTypes { get; set; }

    public virtual DbSet<DSEEmployeeRelocation> DSEEmployeeRelocations { get; set; }

    public virtual DbSet<DangerType> DangerTypes { get; set; }

    public virtual DbSet<DangerousOccurrenceCategoryType> DangerousOccurrenceCategoryTypes { get; set; }

    public virtual DbSet<DangerousOccurrenceType> DangerousOccurrenceTypes { get; set; }

    public virtual DbSet<DashboardType> DashboardTypes { get; set; }

    public virtual DbSet<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; }

    public virtual DbSet<DataActivityLog> DataActivityLogs { get; set; }

    public virtual DbSet<DataStructure> DataStructures { get; set; }

    public virtual DbSet<DataStructureType> DataStructureTypes { get; set; }

    public virtual DbSet<DefaultDashboard> DefaultDashboards { get; set; }

    public virtual DbSet<DefaultDashboardSlot> DefaultDashboardSlots { get; set; }

    public virtual DbSet<DefaultDashboardUser> DefaultDashboardUsers { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<DocPack> DocPacks { get; set; }

    public virtual DbSet<DocPackItem> DocPackItems { get; set; }

    public virtual DbSet<DocPackViewerUser> DocPackViewerUsers { get; set; }

    public virtual DbSet<DocRegisterDocType> DocRegisterDocTypes { get; set; }

    public virtual DbSet<DocRegisterEmployee> DocRegisterEmployees { get; set; }

    public virtual DbSet<DocRegisterTask> DocRegisterTasks { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<DocumentAssignment> DocumentAssignments { get; set; }

    public virtual DbSet<DocumentBundle> DocumentBundles { get; set; }

    public virtual DbSet<DocumentBundleAssignment> DocumentBundleAssignments { get; set; }

    public virtual DbSet<DocumentBundleItem> DocumentBundleItems { get; set; }

    public virtual DbSet<DocumentEditLockUser> DocumentEditLockUsers { get; set; }

    public virtual DbSet<DocumentFolder> DocumentFolders { get; set; }

    public virtual DbSet<DocumentLink> DocumentLinks { get; set; }

    public virtual DbSet<DocumentLinkTableLinkType> DocumentLinkTableLinkTypes { get; set; }

    public virtual DbSet<DocumentLinkTableType> DocumentLinkTableTypes { get; set; }

    public virtual DbSet<DocumentLinkType> DocumentLinkTypes { get; set; }

    public virtual DbSet<DocumentRegister> DocumentRegisters { get; set; }

    public virtual DbSet<DocumentRegisterDocument> DocumentRegisterDocuments { get; set; }

    public virtual DbSet<DocumentRegisterDocumentTask> DocumentRegisterDocumentTasks { get; set; }

    public virtual DbSet<DocumentRegisterEmployee> DocumentRegisterEmployees { get; set; }

    public virtual DbSet<DocumentRequirement> DocumentRequirements { get; set; }

    public virtual DbSet<DocumentRequirementFulfillment> DocumentRequirementFulfillments { get; set; }

    public virtual DbSet<DocumentRequirementSet> DocumentRequirementSets { get; set; }

    public virtual DbSet<DocumentSignature> DocumentSignatures { get; set; }

    public virtual DbSet<DocumentTemplate> DocumentTemplates { get; set; }

    public virtual DbSet<DocumentTemplateTag> DocumentTemplateTags { get; set; }

    public virtual DbSet<DocumentTemplateUsage> DocumentTemplateUsages { get; set; }

    public virtual DbSet<DocumentViewLog> DocumentViewLogs { get; set; }

    public virtual DbSet<Domain> Domains { get; set; }

    public virtual DbSet<DrivingLicenseType> DrivingLicenseTypes { get; set; }

    public virtual DbSet<EWMGEscalationEmployee> EWMGEscalationEmployees { get; set; }

    public virtual DbSet<EWMGEscalationPeriod> EWMGEscalationPeriods { get; set; }

    public virtual DbSet<ElementType> ElementTypes { get; set; }

    public virtual DbSet<EmailAttachment> EmailAttachments { get; set; }

    public virtual DbSet<EmailFrequencyType> EmailFrequencyTypes { get; set; }

    public virtual DbSet<EmailLog> EmailLogs { get; set; }

    public virtual DbSet<EmailMessage> EmailMessages { get; set; }

    public virtual DbSet<EmailMessageAttachment> EmailMessageAttachments { get; set; }

    public virtual DbSet<EmailRule> EmailRules { get; set; }

    public virtual DbSet<EmailServiceConfiguration> EmailServiceConfigurations { get; set; }

    public virtual DbSet<EmailTemplate> EmailTemplates { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeAbsenceConfig> EmployeeAbsenceConfigs { get; set; }

    public virtual DbSet<EmployeeAttachment> EmployeeAttachments { get; set; }

    public virtual DbSet<EmployeeCase> EmployeeCases { get; set; }

    public virtual DbSet<EmployeeCaseNote> EmployeeCaseNotes { get; set; }

    public virtual DbSet<EmployeeCaseStatusType> EmployeeCaseStatusTypes { get; set; }

    public virtual DbSet<EmployeeCaseType> EmployeeCaseTypes { get; set; }

    public virtual DbSet<EmployeeEntitlementLog> EmployeeEntitlementLogs { get; set; }

    public virtual DbSet<EmployeeFavouriteWalk> EmployeeFavouriteWalks { get; set; }

    public virtual DbSet<EmployeeFolder> EmployeeFolders { get; set; }

    public virtual DbSet<EmployeePPE> EmployeePPEs { get; set; }

    public virtual DbSet<EmployeeQualification> EmployeeQualifications { get; set; }

    public virtual DbSet<EmployeeSicknessStatusType> EmployeeSicknessStatusTypes { get; set; }

    public virtual DbSet<EmployeeTextBlock> EmployeeTextBlocks { get; set; }

    public virtual DbSet<EmployeeTimePad> EmployeeTimePads { get; set; }

    public virtual DbSet<EmployeeType> EmployeeTypes { get; set; }

    public virtual DbSet<EmploymentStatusType> EmploymentStatusTypes { get; set; }

    public virtual DbSet<Enquiry> Enquiries { get; set; }

    public virtual DbSet<EnquiryType> EnquiryTypes { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventAudience> EventAudiences { get; set; }

    public virtual DbSet<EventTagType> EventTagTypes { get; set; }

    public virtual DbSet<ExposureType> ExposureTypes { get; set; }

    public virtual DbSet<ExposureTypeTraining> ExposureTypeTrainings { get; set; }

    public virtual DbSet<ExposuresEmployee> ExposuresEmployees { get; set; }

    public virtual DbSet<ExternalLink> ExternalLinks { get; set; }

    public virtual DbSet<Favourite> Favourites { get; set; }

    public virtual DbSet<FavouriteChecklist> FavouriteChecklists { get; set; }

    public virtual DbSet<FavouriteRiskAssessment> FavouriteRiskAssessments { get; set; }

    public virtual DbSet<FavouriteWalk> FavouriteWalks { get; set; }

    public virtual DbSet<Folder> Folders { get; set; }

    public virtual DbSet<FolderOrgGroup> FolderOrgGroups { get; set; }

    public virtual DbSet<FolderType> FolderTypes { get; set; }

    public virtual DbSet<FrequencyType> FrequencyTypes { get; set; }

    public virtual DbSet<GenderType> GenderTypes { get; set; }

    public virtual DbSet<GenericStatusType> GenericStatusTypes { get; set; }

    public virtual DbSet<GeographicalAreaType> GeographicalAreaTypes { get; set; }

    public virtual DbSet<GraphBaseType> GraphBaseTypes { get; set; }

    public virtual DbSet<GraphTabType> GraphTabTypes { get; set; }

    public virtual DbSet<GraphType> GraphTypes { get; set; }

    public virtual DbSet<HAVSRegisterEntry> HAVSRegisterEntries { get; set; }

    public virtual DbSet<HAVSRegisterEntryTool> HAVSRegisterEntryTools { get; set; }

    public virtual DbSet<HAVSTool> HAVSTools { get; set; }

    public virtual DbSet<HAVSToolApplicableEmployee> HAVSToolApplicableEmployees { get; set; }

    public virtual DbSet<HAVSToolBannedEmployee> HAVSToolBannedEmployees { get; set; }

    public virtual DbSet<HRCase> HRCases { get; set; }

    public virtual DbSet<HRCaseAdvisor> HRCaseAdvisors { get; set; }

    public virtual DbSet<HRCaseAttachment> HRCaseAttachments { get; set; }

    public virtual DbSet<HRCaseAttachmentNote> HRCaseAttachmentNotes { get; set; }

    public virtual DbSet<HRCaseAttachmentType> HRCaseAttachmentTypes { get; set; }

    public virtual DbSet<HRCaseEmail> HRCaseEmails { get; set; }

    public virtual DbSet<HRCaseEvent> HRCaseEvents { get; set; }

    public virtual DbSet<HRCaseMeeting> HRCaseMeetings { get; set; }

    public virtual DbSet<HRCaseMeetingAttendee> HRCaseMeetingAttendees { get; set; }

    public virtual DbSet<HRCaseNote> HRCaseNotes { get; set; }

    public virtual DbSet<HRCaseOutcomeType> HRCaseOutcomeTypes { get; set; }

    public virtual DbSet<HRCasePing> HRCasePings { get; set; }

    public virtual DbSet<HRCaseStatusType> HRCaseStatusTypes { get; set; }

    public virtual DbSet<HRCaseSupporter> HRCaseSupporters { get; set; }

    public virtual DbSet<HRCaseTagType> HRCaseTagTypes { get; set; }

    public virtual DbSet<HRCaseTask> HRCaseTasks { get; set; }

    public virtual DbSet<HRCaseTemplateCategory> HRCaseTemplateCategories { get; set; }

    public virtual DbSet<HRCaseTextBlockCollection> HRCaseTextBlockCollections { get; set; }

    public virtual DbSet<HRCaseTimePad> HRCaseTimePads { get; set; }

    public virtual DbSet<HRCaseViewerUser> HRCaseViewerUsers { get; set; }

    public virtual DbSet<HRCategory> HRCategories { get; set; }

    public virtual DbSet<HRCostBaseRate> HRCostBaseRates { get; set; }

    public virtual DbSet<HRCostUserRate> HRCostUserRates { get; set; }

    public virtual DbSet<HRMeetingType> HRMeetingTypes { get; set; }

    public virtual DbSet<HRTemplate> HRTemplates { get; set; }

    public virtual DbSet<HRTemplateCategory> HRTemplateCategories { get; set; }

    public virtual DbSet<HRType> HRTypes { get; set; }

    public virtual DbSet<HRTypeHRMeetingType> HRTypeHRMeetingTypes { get; set; }

    public virtual DbSet<Hazard> Hazards { get; set; }

    public virtual DbSet<HazardCategoryType> HazardCategoryTypes { get; set; }

    public virtual DbSet<HazardControlMeasure> HazardControlMeasures { get; set; }

    public virtual DbSet<HazardReport> HazardReports { get; set; }

    public virtual DbSet<HazardReportAttachment> HazardReportAttachments { get; set; }

    public virtual DbSet<HazardReportType> HazardReportTypes { get; set; }

    public virtual DbSet<HazardSeverityType> HazardSeverityTypes { get; set; }

    public virtual DbSet<HelpGuide> HelpGuides { get; set; }

    public virtual DbSet<HelpText> HelpTexts { get; set; }

    public virtual DbSet<HelpTextAttachment> HelpTextAttachments { get; set; }

    public virtual DbSet<HighLevelProductType> HighLevelProductTypes { get; set; }

    public virtual DbSet<Import> Imports { get; set; }

    public virtual DbSet<ImportRecordType> ImportRecordTypes { get; set; }

    public virtual DbSet<ImportStatusType> ImportStatusTypes { get; set; }

    public virtual DbSet<InboundEmail> InboundEmails { get; set; }

    public virtual DbSet<IncidentAttachment> IncidentAttachments { get; set; }

    public virtual DbSet<IncidentCase> IncidentCases { get; set; }

    public virtual DbSet<IncidentCaseLink> IncidentCaseLinks { get; set; }

    public virtual DbSet<IncidentCaseNote> IncidentCaseNotes { get; set; }

    public virtual DbSet<IncidentCaseViewerRole> IncidentCaseViewerRoles { get; set; }

    public virtual DbSet<IncidentCategoryType> IncidentCategoryTypes { get; set; }

    public virtual DbSet<IncidentFormDatum> IncidentFormData { get; set; }

    public virtual DbSet<IncidentKind> IncidentKinds { get; set; }

    public virtual DbSet<IncidentPriorityType> IncidentPriorityTypes { get; set; }

    public virtual DbSet<IncidentSeverityType> IncidentSeverityTypes { get; set; }

    public virtual DbSet<IncidentStatusType> IncidentStatusTypes { get; set; }

    public virtual DbSet<IncidentType> IncidentTypes { get; set; }

    public virtual DbSet<InductionAllocation> InductionAllocations { get; set; }

    public virtual DbSet<InductionBundle> InductionBundles { get; set; }

    public virtual DbSet<InductionBundleItem> InductionBundleItems { get; set; }

    public virtual DbSet<InductionEnrolment> InductionEnrolments { get; set; }

    public virtual DbSet<InjuryType> InjuryTypes { get; set; }

    public virtual DbSet<InjuryTypeBodyPart> InjuryTypeBodyParts { get; set; }

    public virtual DbSet<JobExecution> JobExecutions { get; set; }

    public virtual DbSet<JobRole> JobRoles { get; set; }

    public virtual DbSet<JobRoleEmployee> JobRoleEmployees { get; set; }

    public virtual DbSet<JobTemplate> JobTemplates { get; set; }

    public virtual DbSet<LanguageType> LanguageTypes { get; set; }

    public virtual DbSet<Lead> Leads { get; set; }

    public virtual DbSet<LegalRegister> LegalRegisters { get; set; }

    public virtual DbSet<LegalRegister1> LegalRegisters1 { get; set; }

    public virtual DbSet<LegalRegisterAttachment> LegalRegisterAttachments { get; set; }

    public virtual DbSet<LegalRegisterAttachment1> LegalRegisterAttachments1 { get; set; }

    public virtual DbSet<LegalRegisterLinkedRecord> LegalRegisterLinkedRecords { get; set; }

    public virtual DbSet<Licence> Licences { get; set; }

    public virtual DbSet<LicenceHighLevelProductType> LicenceHighLevelProductTypes { get; set; }

    public virtual DbSet<LocalAuthorityType> LocalAuthorityTypes { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<LocationEmployee> LocationEmployees { get; set; }

    public virtual DbSet<LocationType> LocationTypes { get; set; }

    public virtual DbSet<LogUserLogin> LogUserLogins { get; set; }

    public virtual DbSet<LoginAction> LoginActions { get; set; }

    public virtual DbSet<LoginActionType> LoginActionTypes { get; set; }

    public virtual DbSet<MainActivityType> MainActivityTypes { get; set; }

    public virtual DbSet<MainFactorType> MainFactorTypes { get; set; }

    public virtual DbSet<MainIndustryType> MainIndustryTypes { get; set; }

    public virtual DbSet<ManagerType> ManagerTypes { get; set; }

    public virtual DbSet<MaritalStatusType> MaritalStatusTypes { get; set; }

    public virtual DbSet<MethodStatement> MethodStatements { get; set; }

    public virtual DbSet<MethodStatementStep> MethodStatementSteps { get; set; }

    public virtual DbSet<MigrateV5TempChecklistQuestionnaireResponse> MigrateV5TempChecklistQuestionnaireResponses { get; set; }

    public virtual DbSet<MobileProperty> MobileProperties { get; set; }

    public virtual DbSet<MobileSubmission> MobileSubmissions { get; set; }

    public virtual DbSet<MobileSubmissionDataLog> MobileSubmissionDataLogs { get; set; }

    public virtual DbSet<ModuleType> ModuleTypes { get; set; }

    public virtual DbSet<MonitoringReportXsltTransformer> MonitoringReportXsltTransformers { get; set; }

    public virtual DbSet<NonWorkingDay> NonWorkingDays { get; set; }

    public virtual DbSet<NotWorkingCategoryType> NotWorkingCategoryTypes { get; set; }

    public virtual DbSet<Note> Notes { get; set; }

    public virtual DbSet<OccupationalDiseaseType> OccupationalDiseaseTypes { get; set; }

    public virtual DbSet<OperationType> OperationTypes { get; set; }

    public virtual DbSet<OptionList> OptionLists { get; set; }

    public virtual DbSet<OptionListItem> OptionListItems { get; set; }

    public virtual DbSet<OrgGroup> OrgGroups { get; set; }

    public virtual DbSet<OrgGroupCategory> OrgGroupCategories { get; set; }

    public virtual DbSet<OrgGroupEmployee> OrgGroupEmployees { get; set; }

    public virtual DbSet<OrgGroupLocation> OrgGroupLocations { get; set; }

    public virtual DbSet<OrgGroupTaskSetting> OrgGroupTaskSettings { get; set; }

    public virtual DbSet<OrgGroupUser> OrgGroupUsers { get; set; }

    public virtual DbSet<PPEType> PPETypes { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<PersonTitleType> PersonTitleTypes { get; set; }

    public virtual DbSet<PersonsAtRisk> PersonsAtRisks { get; set; }

    public virtual DbSet<PersonsInCharge> PersonsInCharges { get; set; }

    public virtual DbSet<PlanCollection> PlanCollections { get; set; }

    public virtual DbSet<PlanCollectionItem> PlanCollectionItems { get; set; }

    public virtual DbSet<PlanCollectionType> PlanCollectionTypes { get; set; }

    public virtual DbSet<Policy> Policies { get; set; }

    public virtual DbSet<PolicyAcknowledgment> PolicyAcknowledgments { get; set; }

    public virtual DbSet<PolicyApprovalLog> PolicyApprovalLogs { get; set; }

    public virtual DbSet<PolicyAttachment> PolicyAttachments { get; set; }

    public virtual DbSet<PolicyCategory> PolicyCategories { get; set; }

    public virtual DbSet<PolicyCompliance> PolicyCompliances { get; set; }

    public virtual DbSet<PolicyExternalLink> PolicyExternalLinks { get; set; }

    public virtual DbSet<PolicyLocationAssignment> PolicyLocationAssignments { get; set; }

    public virtual DbSet<PolicyOrgGroupAssignment> PolicyOrgGroupAssignments { get; set; }

    public virtual DbSet<PolicyReview> PolicyReviews { get; set; }

    public virtual DbSet<PolicyStatusType> PolicyStatusTypes { get; set; }

    public virtual DbSet<PolicyTag> PolicyTags { get; set; }

    public virtual DbSet<PolicyTagAssignment> PolicyTagAssignments { get; set; }

    public virtual DbSet<PolicyType> PolicyTypes { get; set; }

    public virtual DbSet<PolicyUserAssignment> PolicyUserAssignments { get; set; }

    public virtual DbSet<PrintedHeader> PrintedHeaders { get; set; }

    public virtual DbSet<Process> Processes { get; set; }

    public virtual DbSet<ProcessExecution> ProcessExecutions { get; set; }

    public virtual DbSet<ProcessStep> ProcessSteps { get; set; }

    public virtual DbSet<ProcessStepExecution> ProcessStepExecutions { get; set; }

    public virtual DbSet<ProcessedDocument> ProcessedDocuments { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<ProductTypeHighLevelProductType> ProductTypeHighLevelProductTypes { get; set; }

    public virtual DbSet<ProductTypeModuleType> ProductTypeModuleTypes { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }

    public virtual DbSet<QuestionAnswerBackup> QuestionAnswerBackups { get; set; }

    public virtual DbSet<QuestionOptionListItem> QuestionOptionListItems { get; set; }

    public virtual DbSet<QuestionResponse> QuestionResponses { get; set; }

    public virtual DbSet<QuestionStaticDataItem> QuestionStaticDataItems { get; set; }

    public virtual DbSet<QuestionValidation> QuestionValidations { get; set; }

    public virtual DbSet<Questionnaire> Questionnaires { get; set; }

    public virtual DbSet<QuestionnaireDisclaimerType> QuestionnaireDisclaimerTypes { get; set; }

    public virtual DbSet<QuestionnaireResponse> QuestionnaireResponses { get; set; }

    public virtual DbSet<QuestionnaireResponseAttachment> QuestionnaireResponseAttachments { get; set; }

    public virtual DbSet<QuestionnaireResponseNote> QuestionnaireResponseNotes { get; set; }

    public virtual DbSet<QuestionnaireResponseSignOff> QuestionnaireResponseSignOffs { get; set; }

    public virtual DbSet<QuestionnaireResponseXML> QuestionnaireResponseXMLs { get; set; }

    public virtual DbSet<QuestionnaireSection> QuestionnaireSections { get; set; }

    public virtual DbSet<QuestionnaireStaticDataType> QuestionnaireStaticDataTypes { get; set; }

    public virtual DbSet<QuestionnaireStatusType> QuestionnaireStatusTypes { get; set; }

    public virtual DbSet<QuestionnaireType> QuestionnaireTypes { get; set; }

    public virtual DbSet<QuestionnaireTypeKeyField> QuestionnaireTypeKeyFields { get; set; }

    public virtual DbSet<QuestionnaireTypeKeyFieldCategory> QuestionnaireTypeKeyFieldCategories { get; set; }

    public virtual DbSet<QuestionnaireTypeKeyFieldLink> QuestionnaireTypeKeyFieldLinks { get; set; }

    public virtual DbSet<RIDDORSubmission> RIDDORSubmissions { get; set; }

    public virtual DbSet<RecruitmentType> RecruitmentTypes { get; set; }

    public virtual DbSet<RecruitmentTypeVacancy> RecruitmentTypeVacancies { get; set; }

    public virtual DbSet<RecruitmentVacancy> RecruitmentVacancies { get; set; }

    public virtual DbSet<RecruitmentVacancyApplicant> RecruitmentVacancyApplicants { get; set; }

    public virtual DbSet<RecruitmentVacancyAttachment> RecruitmentVacancyAttachments { get; set; }

    public virtual DbSet<RecruitmentVacancyAttachmentType> RecruitmentVacancyAttachmentTypes { get; set; }

    public virtual DbSet<RecruitmentVacancyInfoItem> RecruitmentVacancyInfoItems { get; set; }

    public virtual DbSet<RecruitmentVacancyInterview> RecruitmentVacancyInterviews { get; set; }

    public virtual DbSet<RecruitmentVacancyTagType> RecruitmentVacancyTagTypes { get; set; }

    public virtual DbSet<ReferrerFriend> ReferrerFriends { get; set; }

    public virtual DbSet<ReferrerFriendBenefit> ReferrerFriendBenefits { get; set; }

    public virtual DbSet<ReferrerStatusType> ReferrerStatusTypes { get; set; }

    public virtual DbSet<ReferrerUser> ReferrerUsers { get; set; }

    public virtual DbSet<ReferrerUserBenefit> ReferrerUserBenefits { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<RegionType> RegionTypes { get; set; }

    public virtual DbSet<ReportingFieldType> ReportingFieldTypes { get; set; }

    public virtual DbSet<RequirementType> RequirementTypes { get; set; }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<ResourceCreditLimit> ResourceCreditLimits { get; set; }

    public virtual DbSet<ResourceLocation> ResourceLocations { get; set; }

    public virtual DbSet<ResourceOrgGroup> ResourceOrgGroups { get; set; }

    public virtual DbSet<RiskAssessment> RiskAssessments { get; set; }

    public virtual DbSet<RiskAssessmentAffectedItem> RiskAssessmentAffectedItems { get; set; }

    public virtual DbSet<RiskAssessmentApprovalLog> RiskAssessmentApprovalLogs { get; set; }

    public virtual DbSet<RiskAssessmentAttachment> RiskAssessmentAttachments { get; set; }

    public virtual DbSet<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; }

    public virtual DbSet<RiskAssessmentControlMeasurePersonsInCharge> RiskAssessmentControlMeasurePersonsInCharges { get; set; }

    public virtual DbSet<RiskAssessmentControlMeasureScore_TO_DELETE_> RiskAssessmentControlMeasureScore_TO_DELETE_s { get; set; }

    public virtual DbSet<RiskAssessmentConversion> RiskAssessmentConversions { get; set; }

    public virtual DbSet<RiskAssessmentExternalLink> RiskAssessmentExternalLinks { get; set; }

    public virtual DbSet<RiskAssessmentFieldType> RiskAssessmentFieldTypes { get; set; }

    public virtual DbSet<RiskAssessmentFieldTypeResponse> RiskAssessmentFieldTypeResponses { get; set; }

    public virtual DbSet<RiskAssessmentFieldTypeScore_TO_DELETE_> RiskAssessmentFieldTypeScore_TO_DELETE_s { get; set; }

    public virtual DbSet<RiskAssessmentFormatType> RiskAssessmentFormatTypes { get; set; }

    public virtual DbSet<RiskAssessmentHazard> RiskAssessmentHazards { get; set; }

    public virtual DbSet<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypes { get; set; }

    public virtual DbSet<RiskAssessmentLocation> RiskAssessmentLocations { get; set; }

    public virtual DbSet<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEvents { get; set; }

    public virtual DbSet<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; }

    public virtual DbSet<RiskAssessmentMonitorEventXML> RiskAssessmentMonitorEventXMLs { get; set; }

    public virtual DbSet<RiskAssessmentOperation> RiskAssessmentOperations { get; set; }

    public virtual DbSet<RiskAssessmentOrgGroup> RiskAssessmentOrgGroups { get; set; }

    public virtual DbSet<RiskAssessmentPersonsAtRisk> RiskAssessmentPersonsAtRisks { get; set; }

    public virtual DbSet<RiskAssessmentRiskSafetyPhrase> RiskAssessmentRiskSafetyPhrases { get; set; }

    public virtual DbSet<RiskAssessmentSectionType> RiskAssessmentSectionTypes { get; set; }

    public virtual DbSet<RiskAssessmentStatusType> RiskAssessmentStatusTypes { get; set; }

    public virtual DbSet<RiskAssessmentType> RiskAssessmentTypes { get; set; }

    public virtual DbSet<RiskAssessmentXML> RiskAssessmentXMLs { get; set; }

    public virtual DbSet<RiskLevelColourType> RiskLevelColourTypes { get; set; }

    public virtual DbSet<RiskMatrixConsequenceType> RiskMatrixConsequenceTypes { get; set; }

    public virtual DbSet<RiskMatrixLikelihoodType> RiskMatrixLikelihoodTypes { get; set; }

    public virtual DbSet<RiskMatrixType> RiskMatrixTypes { get; set; }

    public virtual DbSet<RiskMatrixTypeColour> RiskMatrixTypeColours { get; set; }

    public virtual DbSet<RiskSafetyPhrase> RiskSafetyPhrases { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RoleNavigationPreference> RoleNavigationPreferences { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<RootCauseCategoryType> RootCauseCategoryTypes { get; set; }

    public virtual DbSet<RootCauseType> RootCauseTypes { get; set; }

    public virtual DbSet<SCORMPackage> SCORMPackages { get; set; }

    public virtual DbSet<SCORMPackageUserArea> SCORMPackageUserAreas { get; set; }

    public virtual DbSet<SSIP> SSIPs { get; set; }

    public virtual DbSet<SSOWApprovalLog> SSOWApprovalLogs { get; set; }

    public virtual DbSet<SSOWAttachment> SSOWAttachments { get; set; }

    public virtual DbSet<SSOWDocumentType> SSOWDocumentTypes { get; set; }

    public virtual DbSet<SSOWExternalLink> SSOWExternalLinks { get; set; }

    public virtual DbSet<SSOWLocation> SSOWLocations { get; set; }

    public virtual DbSet<SSOWOrgGroup> SSOWOrgGroups { get; set; }

    public virtual DbSet<SSOWRiskCategory> SSOWRiskCategories { get; set; }

    public virtual DbSet<SSOWStatusType> SSOWStatusTypes { get; set; }

    public virtual DbSet<SafeSystemOfWork> SafeSystemOfWorks { get; set; }

    public virtual DbSet<SafeSystemOfWorkCompetency> SafeSystemOfWorkCompetencies { get; set; }

    public virtual DbSet<SafeSystemOfWorkLink> SafeSystemOfWorkLinks { get; set; }

    public virtual DbSet<SafeSystemOfWorkLinkRecord> SafeSystemOfWorkLinkRecords { get; set; }

    public virtual DbSet<SafeSystemOfWorkLocation> SafeSystemOfWorkLocations { get; set; }

    public virtual DbSet<SafeSystemOfWorkLog> SafeSystemOfWorkLogs { get; set; }

    public virtual DbSet<SafeSystemOfWorkLogType> SafeSystemOfWorkLogTypes { get; set; }

    public virtual DbSet<SafeSystemOfWorkRiskAssessmentType> SafeSystemOfWorkRiskAssessmentTypes { get; set; }

    public virtual DbSet<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplates { get; set; }

    public virtual DbSet<SafeSystemOfWorkTemplateSection> SafeSystemOfWorkTemplateSections { get; set; }

    public virtual DbSet<SafeSystemOfWorkType> SafeSystemOfWorkTypes { get; set; }

    public virtual DbSet<SafeWorkingProcedure> SafeWorkingProcedures { get; set; }

    public virtual DbSet<SafeWorkingProcedureStep> SafeWorkingProcedureSteps { get; set; }

    public virtual DbSet<ScheduledEvent> ScheduledEvents { get; set; }

    public virtual DbSet<ScheduledEventLog> ScheduledEventLogs { get; set; }

    public virtual DbSet<ScheduledEventType> ScheduledEventTypes { get; set; }

    public virtual DbSet<ScheduledJob> ScheduledJobs { get; set; }

    public virtual DbSet<ScheduledTask> ScheduledTasks { get; set; }

    public virtual DbSet<SectorType> SectorTypes { get; set; }

    public virtual DbSet<SeverityOfInjuryType> SeverityOfInjuryTypes { get; set; }

    public virtual DbSet<SeverityType> SeverityTypes { get; set; }

    public virtual DbSet<ShortcutSystem> ShortcutSystems { get; set; }

    public virtual DbSet<ShortcutSystemUser> ShortcutSystemUsers { get; set; }

    public virtual DbSet<ShortcutUserFavourite> ShortcutUserFavourites { get; set; }

    public virtual DbSet<SicknessStatusType> SicknessStatusTypes { get; set; }

    public virtual DbSet<SourceStaticDataType> SourceStaticDataTypes { get; set; }

    public virtual DbSet<SourceStaticDatum> SourceStaticData { get; set; }

    public virtual DbSet<SubActivityType> SubActivityTypes { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<SystemConfiguration> SystemConfigurations { get; set; }

    public virtual DbSet<SystemCredential> SystemCredentials { get; set; }

    public virtual DbSet<SystemPermission> SystemPermissions { get; set; }

    public virtual DbSet<SystemProductType> SystemProductTypes { get; set; }

    public virtual DbSet<SystemRole> SystemRoles { get; set; }

    public virtual DbSet<SystemRolePermission> SystemRolePermissions { get; set; }

    public virtual DbSet<TagType> TagTypes { get; set; }

    public virtual DbSet<TaskActivity> TaskActivities { get; set; }

    public virtual DbSet<TaskAssignableUser> TaskAssignableUsers { get; set; }

    public virtual DbSet<TaskAssignment> TaskAssignments { get; set; }

    public virtual DbSet<TaskAssignmentLog> TaskAssignmentLogs { get; set; }

    public virtual DbSet<TaskAttachment> TaskAttachments { get; set; }

    public virtual DbSet<TaskCategoryType> TaskCategoryTypes { get; set; }

    public virtual DbSet<TaskClassification> TaskClassifications { get; set; }

    public virtual DbSet<TaskClassificationType> TaskClassificationTypes { get; set; }

    public virtual DbSet<TaskContractorCompany> TaskContractorCompanies { get; set; }

    public virtual DbSet<TaskEmployee> TaskEmployees { get; set; }

    public virtual DbSet<TaskEscalationLog> TaskEscalationLogs { get; set; }

    public virtual DbSet<TaskNonEmployee> TaskNonEmployees { get; set; }

    public virtual DbSet<TaskNote> TaskNotes { get; set; }

    public virtual DbSet<TaskOrgGroup> TaskOrgGroups { get; set; }

    public virtual DbSet<TaskPriority> TaskPriorities { get; set; }

    public virtual DbSet<TaskReassignmentLog> TaskReassignmentLogs { get; set; }

    public virtual DbSet<TaskSchedule> TaskSchedules { get; set; }

    public virtual DbSet<TaskScheduleAssignment> TaskScheduleAssignments { get; set; }

    public virtual DbSet<TaskScheduleEmployee> TaskScheduleEmployees { get; set; }

    public virtual DbSet<TaskScheduleNonEmployee> TaskScheduleNonEmployees { get; set; }

    public virtual DbSet<TaskScheduleOrgGroup> TaskScheduleOrgGroups { get; set; }

    public virtual DbSet<TaskSeverity> TaskSeverities { get; set; }

    public virtual DbSet<TaskStatusType> TaskStatusTypes { get; set; }

    public virtual DbSet<TaskType> TaskTypes { get; set; }

    public virtual DbSet<TaskTypeUserArea> TaskTypeUserAreas { get; set; }

    public virtual DbSet<TempBOSComputed> TempBOSComputeds { get; set; }

    public virtual DbSet<Tenant> Tenants { get; set; }

    public virtual DbSet<TenantElementPermission> TenantElementPermissions { get; set; }

    public virtual DbSet<TenantPagePermission> TenantPagePermissions { get; set; }

    public virtual DbSet<TenantRole> TenantRoles { get; set; }

    public virtual DbSet<TenantRolePermission> TenantRolePermissions { get; set; }

    public virtual DbSet<TenantServicePermission> TenantServicePermissions { get; set; }

    public virtual DbSet<TextBlock> TextBlocks { get; set; }

    public virtual DbSet<TextBlockApprovalLog> TextBlockApprovalLogs { get; set; }

    public virtual DbSet<TextBlockAttachment> TextBlockAttachments { get; set; }

    public virtual DbSet<TextBlockCategory> TextBlockCategories { get; set; }

    public virtual DbSet<TextBlockCategoryType> TextBlockCategoryTypes { get; set; }

    public virtual DbSet<TextBlockCollection> TextBlockCollections { get; set; }

    public virtual DbSet<TextBlockCollectionEmployee> TextBlockCollectionEmployees { get; set; }

    public virtual DbSet<TextBlockCourse> TextBlockCourses { get; set; }

    public virtual DbSet<TextBlockEmployee> TextBlockEmployees { get; set; }

    public virtual DbSet<TextBlockLocation> TextBlockLocations { get; set; }

    public virtual DbSet<TextBlockOrgGroup> TextBlockOrgGroups { get; set; }

    public virtual DbSet<TextBlockQuestionnaireSection> TextBlockQuestionnaireSections { get; set; }

    public virtual DbSet<TextBlockSection> TextBlockSections { get; set; }

    public virtual DbSet<TextBlockStatusType> TextBlockStatusTypes { get; set; }

    public virtual DbSet<TextBlockType> TextBlockTypes { get; set; }

    public virtual DbSet<Theme> Themes { get; set; }

    public virtual DbSet<ThemeElement> ThemeElements { get; set; }

    public virtual DbSet<ThemeElementProperty> ThemeElementProperties { get; set; }

    public virtual DbSet<ThemeElementPropertyValue> ThemeElementPropertyValues { get; set; }

    public virtual DbSet<ThemeType> ThemeTypes { get; set; }

    public virtual DbSet<TribunalCase> TribunalCases { get; set; }

    public virtual DbSet<TribunalCaseAttachment> TribunalCaseAttachments { get; set; }

    public virtual DbSet<TribunalCaseAttachmentNote> TribunalCaseAttachmentNotes { get; set; }

    public virtual DbSet<TribunalCaseAttachmentTagType> TribunalCaseAttachmentTagTypes { get; set; }

    public virtual DbSet<TribunalCaseAttachmentType> TribunalCaseAttachmentTypes { get; set; }

    public virtual DbSet<TribunalCaseContact> TribunalCaseContacts { get; set; }

    public virtual DbSet<TribunalCaseCounsel> TribunalCaseCounsels { get; set; }

    public virtual DbSet<TribunalCaseDistribution> TribunalCaseDistributions { get; set; }

    public virtual DbSet<TribunalCaseEvent> TribunalCaseEvents { get; set; }

    public virtual DbSet<TribunalCaseEventType> TribunalCaseEventTypes { get; set; }

    public virtual DbSet<TribunalCasePersonType> TribunalCasePersonTypes { get; set; }

    public virtual DbSet<TribunalCaseSeverityType> TribunalCaseSeverityTypes { get; set; }

    public virtual DbSet<TribunalCaseStatusType> TribunalCaseStatusTypes { get; set; }

    public virtual DbSet<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypes { get; set; }

    public virtual DbSet<TribunalCaseType> TribunalCaseTypes { get; set; }

    public virtual DbSet<UnarchiveLog> UnarchiveLogs { get; set; }

    public virtual DbSet<Update> Updates { get; set; }

    public virtual DbSet<UpdateType> UpdateTypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserArea> UserAreas { get; set; }

    public virtual DbSet<UserAreaAccidentForm> UserAreaAccidentForms { get; set; }

    public virtual DbSet<UserAreaAccidentFormQuestion> UserAreaAccidentFormQuestions { get; set; }

    public virtual DbSet<UserAreaAccidentFormQuestionTag> UserAreaAccidentFormQuestionTags { get; set; }

    public virtual DbSet<UserAreaAccidentQuestion> UserAreaAccidentQuestions { get; set; }

    public virtual DbSet<UserAreaAccidentQuestionTag> UserAreaAccidentQuestionTags { get; set; }

    public virtual DbSet<UserAreaAccidentSection> UserAreaAccidentSections { get; set; }

    public virtual DbSet<UserAreaAccidentTag> UserAreaAccidentTags { get; set; }

    public virtual DbSet<UserAreaActivity> UserAreaActivities { get; set; }

    public virtual DbSet<UserAreaChecklistSetting> UserAreaChecklistSettings { get; set; }

    public virtual DbSet<UserAreaConfiguration> UserAreaConfigurations { get; set; }

    public virtual DbSet<UserAreaContact> UserAreaContacts { get; set; }

    public virtual DbSet<UserAreaContractor> UserAreaContractors { get; set; }

    public virtual DbSet<UserAreaCostType> UserAreaCostTypes { get; set; }

    public virtual DbSet<UserAreaCredit> UserAreaCredits { get; set; }

    public virtual DbSet<UserAreaCreditLog> UserAreaCreditLogs { get; set; }

    public virtual DbSet<UserAreaDivision> UserAreaDivisions { get; set; }

    public virtual DbSet<UserAreaDocRegisterDocType> UserAreaDocRegisterDocTypes { get; set; }

    public virtual DbSet<UserAreaEntityCacheConfiguration> UserAreaEntityCacheConfigurations { get; set; }

    public virtual DbSet<UserAreaForm> UserAreaForms { get; set; }

    public virtual DbSet<UserAreaFormQuestion> UserAreaFormQuestions { get; set; }

    public virtual DbSet<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswers { get; set; }

    public virtual DbSet<UserAreaFormResponse> UserAreaFormResponses { get; set; }

    public virtual DbSet<UserAreaFormSection> UserAreaFormSections { get; set; }

    public virtual DbSet<UserAreaFormSectionQuestion> UserAreaFormSectionQuestions { get; set; }

    public virtual DbSet<UserAreaFormType> UserAreaFormTypes { get; set; }

    public virtual DbSet<UserAreaHRCost> UserAreaHRCosts { get; set; }

    public virtual DbSet<UserAreaHRCostLog> UserAreaHRCostLogs { get; set; }

    public virtual DbSet<UserAreaHRCostTransaction> UserAreaHRCostTransactions { get; set; }

    public virtual DbSet<UserAreaLanguage> UserAreaLanguages { get; set; }

    public virtual DbSet<UserAreaMonitoringConfiguration> UserAreaMonitoringConfigurations { get; set; }

    public virtual DbSet<UserAreaMonitoringLevel> UserAreaMonitoringLevels { get; set; }

    public virtual DbSet<UserAreaMonitoringLevelType> UserAreaMonitoringLevelTypes { get; set; }

    public virtual DbSet<UserAreaMonitoringMailingList> UserAreaMonitoringMailingLists { get; set; }

    public virtual DbSet<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; }

    public virtual DbSet<UserAreaMonitoringReportComment> UserAreaMonitoringReportComments { get; set; }

    public virtual DbSet<UserAreaMonitoringReportCommentsCriterion> UserAreaMonitoringReportCommentsCriteria { get; set; }

    public virtual DbSet<UserAreaMonitoringReportType> UserAreaMonitoringReportTypes { get; set; }

    public virtual DbSet<UserAreaMonitoringSection> UserAreaMonitoringSections { get; set; }

    public virtual DbSet<UserAreaQuestionType> UserAreaQuestionTypes { get; set; }

    public virtual DbSet<UserAreaRegion> UserAreaRegions { get; set; }

    public virtual DbSet<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettings { get; set; }

    public virtual DbSet<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypes { get; set; }

    public virtual DbSet<UserAreaSector> UserAreaSectors { get; set; }

    public virtual DbSet<UserAreaSetting> UserAreaSettings { get; set; }

    public virtual DbSet<UserAreaSystemProductType> UserAreaSystemProductTypes { get; set; }

    public virtual DbSet<UserAreaTag> UserAreaTags { get; set; }

    public virtual DbSet<UserAreaTaskSetting> UserAreaTaskSettings { get; set; }

    public virtual DbSet<UserAreaTaskType> UserAreaTaskTypes { get; set; }

    public virtual DbSet<UserAreaTextBlock> UserAreaTextBlocks { get; set; }

    public virtual DbSet<UserAreaTextBlockSectionOrder> UserAreaTextBlockSectionOrders { get; set; }

    public virtual DbSet<UserAreaTextSetting> UserAreaTextSettings { get; set; }

    public virtual DbSet<UserAreaTrainingSetting> UserAreaTrainingSettings { get; set; }

    public virtual DbSet<UserAreaUpdate> UserAreaUpdates { get; set; }

    public virtual DbSet<UserCaseManagementSetting> UserCaseManagementSettings { get; set; }

    public virtual DbSet<UserConfiguration> UserConfigurations { get; set; }

    public virtual DbSet<UserContact> UserContacts { get; set; }

    public virtual DbSet<UserDomain> UserDomains { get; set; }

    public virtual DbSet<UserEmulator> UserEmulators { get; set; }

    public virtual DbSet<UserFavouriteChecklist> UserFavouriteChecklists { get; set; }

    public virtual DbSet<UserFavouriteRiskAssessment> UserFavouriteRiskAssessments { get; set; }

    public virtual DbSet<UserFilterSetting> UserFilterSettings { get; set; }

    public virtual DbSet<UserNavigationPreference> UserNavigationPreferences { get; set; }

    public virtual DbSet<UserPasswordHistory> UserPasswordHistories { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<UserSystemProductType> UserSystemProductTypes { get; set; }

    public virtual DbSet<UserTenant> UserTenants { get; set; }

    public virtual DbSet<UserTenantRole> UserTenantRoles { get; set; }

    public virtual DbSet<UserTextBlock> UserTextBlocks { get; set; }

    public virtual DbSet<UserTwoStepAuthToken> UserTwoStepAuthTokens { get; set; }

    public virtual DbSet<UserUserArea> UserUserAreas { get; set; }

    public virtual DbSet<UserUserAreaDivision> UserUserAreaDivisions { get; set; }

    public virtual DbSet<UserWebFavouriteChecklist> UserWebFavouriteChecklists { get; set; }

    public virtual DbSet<ValidationType> ValidationTypes { get; set; }

    public virtual DbSet<VideoCaption> VideoCaptions { get; set; }

    public virtual DbSet<Walk> Walks { get; set; }

    public virtual DbSet<WalkAdhocEmployee> WalkAdhocEmployees { get; set; }

    public virtual DbSet<WalkAssignment> WalkAssignments { get; set; }

    public virtual DbSet<WalkCheckpoint> WalkCheckpoints { get; set; }

    public virtual DbSet<WalkCheckpointResponse> WalkCheckpointResponses { get; set; }

    public virtual DbSet<WalkHazardReport> WalkHazardReports { get; set; }

    public virtual DbSet<WalkHazardReportType> WalkHazardReportTypes { get; set; }

    public virtual DbSet<WalkResponse> WalkResponses { get; set; }

    public virtual DbSet<WalkTemplate> WalkTemplates { get; set; }

    public virtual DbSet<WeekendType> WeekendTypes { get; set; }

    public virtual DbSet<WorkInstruction> WorkInstructions { get; set; }

    public virtual DbSet<WorkProcessType> WorkProcessTypes { get; set; }

    public virtual DbSet<XsltTransformerType> XsltTransformerTypes { get; set; }

    public virtual DbSet<YesNoNAType> YesNoNATypes { get; set; }

    public virtual DbSet<tblAssessmentDiary> tblAssessmentDiaries { get; set; }

    public virtual DbSet<tblAssessmentDiaryLogType> tblAssessmentDiaryLogTypes { get; set; }

    public virtual DbSet<tblElement> tblElements { get; set; }

    public virtual DbSet<tblEvidence> tblEvidences { get; set; }

    public virtual DbSet<tblEvidenceKnowledgeRequirement> tblEvidenceKnowledgeRequirements { get; set; }

    public virtual DbSet<tblEvidencePerformanceCriterion> tblEvidencePerformanceCriteria { get; set; }

    public virtual DbSet<tblEvidenceRange> tblEvidenceRanges { get; set; }

    public virtual DbSet<tblEvidenceType> tblEvidenceTypes { get; set; }

    public virtual DbSet<tblKnowledgeRequirement> tblKnowledgeRequirements { get; set; }

    public virtual DbSet<tblMonitoringReport> tblMonitoringReports { get; set; }

    public virtual DbSet<tblPerformanceCriterion> tblPerformanceCriteria { get; set; }

    public virtual DbSet<tblPortfolio> tblPortfolios { get; set; }

    public virtual DbSet<tblPortfolioStatus> tblPortfolioStatuses { get; set; }

    public virtual DbSet<tblQualification> tblQualifications { get; set; }

    public virtual DbSet<tblQualificationUnit> tblQualificationUnits { get; set; }

    public virtual DbSet<tblRange> tblRanges { get; set; }

    public virtual DbSet<tblRangeGroup> tblRangeGroups { get; set; }

    public virtual DbSet<tblUnit> tblUnits { get; set; }

        
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Use BusBase configuration when no DI options are provided
            var connectionString = Bus.Core.BusBase<V7DBContext>.GetConnectionString();
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<Absence>(entity =>
        {
            entity.HasKey(e => e.AbsenceID).HasName("PK__Absence__3A074E474B427CFD");

            entity.HasOne(d => d.AbsenceReasonType).WithMany(p => p.Absences).HasConstraintName("FK_Absence_AbsenceReasonType");

            entity.HasOne(d => d.AbsenceType).WithMany(p => p.Absences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Absence_AbsenceType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceArchivedByUsers).HasConstraintName("FK_Absence_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Absence_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.Absences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Absence_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceModifiedByUsers).HasConstraintName("FK_Absence_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Absences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Absence_UserArea");
        });

        modelBuilder.Entity<AbsenceApprovalType>(entity =>
        {
            entity.HasKey(e => e.AbsenceApprovalTypeID).HasName("PK__AbsenceA__537ACEA6EAF5E127");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceApprovalTypeArchivedByUsers).HasConstraintName("FK_AbsenceApprovalType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceApprovalTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceApprovalType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceApprovalTypeModifiedByUsers).HasConstraintName("FK_AbsenceApprovalType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsenceApprovalTypes).HasConstraintName("FK_AbsenceAprovalType_UserArea");
        });

        modelBuilder.Entity<AbsenceAttachment>(entity =>
        {
            entity.HasKey(e => e.AbsenceAttachmentID).HasName("PK__AbsenceA__399BF6A37ABF150B");

            entity.HasOne(d => d.Absence).WithMany(p => p.AbsenceAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceAttachment_Absence");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceAttachmentArchivedByUsers).HasConstraintName("FK_AbsenceAttachment_ArchivedByUser");

            entity.HasOne(d => d.Attachment).WithMany(p => p.AbsenceAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceAttachment_Attachment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceAttachmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceAttachment_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceAttachmentModifiedByUsers).HasConstraintName("FK_AbsenceAttachment_ModifiedBy");
        });

        modelBuilder.Entity<AbsenceDurationType>(entity =>
        {
            entity.HasKey(e => e.AbsenceDurationTypeID).HasName("PK__AbsenceD__0E53F5C2A3638C43");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceDurationTypeArchivedByUsers).HasConstraintName("FK_AbsenceDurationType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceDurationTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceDurationType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceDurationTypeModifiedByUsers).HasConstraintName("FK_AbsenceDurationType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsenceDurationTypes).HasConstraintName("FK_AbsenceDurationType_UserArea");
        });

        modelBuilder.Entity<AbsencePeriod>(entity =>
        {
            entity.HasKey(e => e.AbsencePeriodID).HasName("PK__AbsenceP__A8F4D3546A87A41E");

            entity.HasOne(d => d.AbsenceApprovalType).WithMany(p => p.AbsencePeriods)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsencePeriod_AbsenceApprovalType");

            entity.HasOne(d => d.AbsenceDurationType).WithMany(p => p.AbsencePeriods)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsencePeriod_AbsenceDurationType");

            entity.HasOne(d => d.Absence).WithMany(p => p.AbsencePeriods)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsencePeriod_Absence");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsencePeriodArchivedByUsers).HasConstraintName("FK_AbsencePeriod_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsencePeriodCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsencePeriod_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsencePeriodModifiedByUsers).HasConstraintName("FK_AbsencePeriod_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsencePeriods)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsencePeriod_UserArea");
        });

        modelBuilder.Entity<AbsenceReasonType>(entity =>
        {
            entity.HasKey(e => e.AbsenceReasonTypeID).HasName("PK__AbsenceR__6C1F4C407224819C");

            entity.HasOne(d => d.AbsenceType).WithMany(p => p.AbsenceReasonTypes).HasConstraintName("FK_AbsenceReasonType_AbsenceType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceReasonTypeArchivedByUsers).HasConstraintName("FK_AbsenceReasonType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceReasonTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceReasonType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceReasonTypeModifiedByUsers).HasConstraintName("FK_AbsenceReasonType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsenceReasonTypes).HasConstraintName("FK_AbsenceReasonType_UserAreaID");
        });

        modelBuilder.Entity<AbsenceRequirement>(entity =>
        {
            entity.HasKey(e => e.AbsenceRequirementID).HasName("PK__AbsenceR__7A2CD9A0A0B589A8");

            entity.HasOne(d => d.Absence).WithMany(p => p.AbsenceRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceRequirement_Absence");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceRequirementArchivedByUsers).HasConstraintName("FK_AbsenceRequirement_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceRequirementCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceRequirement_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceRequirementModifiedByUsers).HasConstraintName("FK_AbsenceRequirement_ModifiedBy");

            entity.HasOne(d => d.RequirementType).WithMany(p => p.AbsenceRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceRequirement_RequirementType");

            entity.HasOne(d => d.Task).WithMany(p => p.AbsenceRequirements).HasConstraintName("FK_AbsenceRequirement_Task");
        });

        modelBuilder.Entity<AbsenceSetting>(entity =>
        {
            entity.HasKey(e => e.AbsenceSettingID).HasName("PK__AbsenceS__BF9D7A04C38B8445");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceSettingArchivedByUsers).HasConstraintName("FK_AbsenceSetting_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceSettingCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceSetting_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.AbsenceSettings).HasConstraintName("FK_AbsenceSetting_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceSettingModifiedByUsers).HasConstraintName("FK_AbsenceSetting_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.AbsenceSettings).HasConstraintName("FK_AbsenceSetting_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsenceSettings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceSetting_UserArea");
        });

        modelBuilder.Entity<AbsenceTask>(entity =>
        {
            entity.HasKey(e => e.AbsenceTaskID).HasName("PK__AbsenceT__E3DAE32C31547935");

            entity.HasOne(d => d.Absence).WithMany(p => p.AbsenceTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceTask_Absence");

            entity.HasOne(d => d.Task).WithMany(p => p.AbsenceTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceTask_Task");
        });

        modelBuilder.Entity<AbsenceType>(entity =>
        {
            entity.HasKey(e => e.AbsenceTypeID).HasName("PK__AbsenceT__50FAC9656888CE37");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AbsenceTypeArchivedByUsers).HasConstraintName("FK_AbsenceType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AbsenceTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AbsenceType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AbsenceTypeModifiedByUsers).HasConstraintName("FK_AbsenceType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AbsenceTypes).HasConstraintName("FK_AbsenceType_UserArea");
        });

        modelBuilder.Entity<AccidentCase>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseID).HasName("PK__Accident__342FD46B4D8C5C8C");

            entity.Property(e => e.IncidentDateTimeZoneID).HasDefaultValue(0);
            entity.Property(e => e.IsApprovedSubmission).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseArchivedByUsers).HasConstraintName("FK_AccidentCase_ArchivedBy");

            entity.HasOne(d => d.BodyPart).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_BodyPart");

            entity.HasOne(d => d.ClosedByEmployee).WithMany(p => p.AccidentCaseClosedByEmployees).HasConstraintName("FK_AccidentCase_Employee");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCase_CreatedBy");

            entity.HasOne(d => d.IncidentDateTimeZone).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_IncidentDateTimeZone");

            entity.HasOne(d => d.IncidentKind).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_IncidentKind");

            entity.HasOne(d => d.InjuryType).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_InjuryType");

            entity.HasOne(d => d.Location).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_LocationID");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.AccidentCaseManagerEmployees).HasConstraintName("FK_AccidentCase_ManagerEmployee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseModifiedByUsers).HasConstraintName("FK_AccidentCase_ModifiedBy");

            entity.HasOne(d => d.OptionListItem).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_OptionListItemID");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_OrgGroupID");

            entity.HasOne(d => d.RootCauseCategoryType).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_RootCauseCategoryTypeID");

            entity.HasOne(d => d.RootCauseType).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_RootCauseTypeID");

            entity.HasOne(d => d.SeverityType).WithMany(p => p.AccidentCases).HasConstraintName("FK_AccidentCase_SeverityType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCase_UserAreaID");
        });

        modelBuilder.Entity<AccidentCaseAssociation>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseAssociationID).HasName("PK__Accident__0B4B36A1BCC61635");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseAssociationArchivedByUsers).HasConstraintName("FK_AccidentCaseAssociation_ArchivedBy");

            entity.HasOne(d => d.AssociatedAccidentCase).WithMany(p => p.AccidentCaseAssociationAssociatedAccidentCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseAssociation_AssociatedAccidentCase");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseAssociationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseAssociation_CreatedBy");

            entity.HasOne(d => d.MasterAccidentCase).WithMany(p => p.AccidentCaseAssociationMasterAccidentCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseAssociation_MasterAccidentCase");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseAssociationModifiedByUsers).HasConstraintName("FK_AccidentCaseAssociation_ModifiedBy");
        });

        modelBuilder.Entity<AccidentCaseAttachment>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseAttachmentsID).HasName("PK__Accident__FA5F5C5D3414D4F9");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseAttachment_AccidentCase");

            entity.HasOne(d => d.AccidentForm).WithMany(p => p.AccidentCaseAttachments).HasConstraintName("FK_AccidentCaseAttachment_AccidentForm");

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AccidentCaseAttachments).HasConstraintName("FK_AccidentCaseAttachment_AccidentFormType");

            entity.HasOne(d => d.AccidentFormTypeQuestionType).WithMany(p => p.AccidentCaseAttachments).HasConstraintName("FK_AccidentCaseAttachment_AccidentFormTypeQuestionType");

            entity.HasOne(d => d.Attachment).WithMany(p => p.AccidentCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseAttachment_Attachment");

            entity.HasOne(d => d.QuestionResponse).WithMany(p => p.AccidentCaseAttachments).HasConstraintName("FK_AccidentCaseAttachment_QuestionResponse");

            entity.HasOne(d => d.UserAreaAccidentFormQuestion).WithMany(p => p.AccidentCaseAttachments).HasConstraintName("FK_AccidentCaseAttachment_UserAreaAccidentFormQuestion");
        });

        modelBuilder.Entity<AccidentCaseExport>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseExportID).HasName("PK__Accident__2FF003EFD99C264A");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseExports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseExport_AccidentCase");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseExports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseExport_CreatedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentCaseExports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseExport_UserArea");
        });

        modelBuilder.Entity<AccidentCaseFieldDatum>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseFieldDataID).HasName("PK__Accident__2E99560A0E6EC160");

            entity.Property(e => e.IncludeInCaseDetails).HasDefaultValue(true);

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseFieldData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseFieldData_AccidentCase");

            entity.HasOne(d => d.AccidentForm).WithMany(p => p.AccidentCaseFieldData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseFieldData_AccidentForm");

            entity.HasOne(d => d.AccidentQuestionType).WithMany(p => p.AccidentCaseFieldData).HasConstraintName("FK_AccidentCaseFieldData_AccidentQuestionType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseFieldDatumArchivedByUsers).HasConstraintName("FK_AccidentCaseFieldData_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseFieldDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseFieldData_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseFieldDatumModifiedByUsers).HasConstraintName("FK_AccidentCaseFieldData_ModifiedBy");

            entity.HasOne(d => d.UserAreaAccidentQuestion).WithMany(p => p.AccidentCaseFieldData).HasConstraintName("FK_AccidentCaseFieldData_UserAreaAccidentQuestion");
        });

        modelBuilder.Entity<AccidentCaseNote>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseNoteID).HasName("PK__Accident__48993F37BD90006A");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseNote_AccidentCase");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseNoteArchivedByUsers).HasConstraintName("FK_AccidentCaseNote_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseNote_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseNoteModifiedByUsers).HasConstraintName("FK_AccidentCaseNote_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseNote_UserArea");
        });

        modelBuilder.Entity<AccidentCasePersonDatum>(entity =>
        {
            entity.HasKey(e => e.AccidentCasePersonDataID).HasName("PK__Accident__BD78B5897FC6992A");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCasePersonData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCasePersonData_AccidentCase");

            entity.HasOne(d => d.AccidentForm).WithMany(p => p.AccidentCasePersonData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCasePersonData_AccidentForm");

            entity.HasOne(d => d.AccidentPersonType).WithMany(p => p.AccidentCasePersonData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCasePersonData_AccidentPersonType");

            entity.HasOne(d => d.AddressNavigation).WithMany(p => p.AccidentCasePersonData).HasConstraintName("FK_AccidentCasePersonData_Address");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCasePersonDatumArchivedByUsers).HasConstraintName("FK_AccidentCasePersonData_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCasePersonDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCasePersonData_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.AccidentCasePersonData).HasConstraintName("FK_AccidentCasePersonData_Employee");

            entity.HasOne(d => d.EmploymentStatusType).WithMany(p => p.AccidentCasePersonData).HasConstraintName("FK_AccidentCasePersonData_EmploymentStatusType");

            entity.HasOne(d => d.GenderType).WithMany(p => p.AccidentCasePersonData).HasConstraintName("FK_AccidentCasePersonData_GenderType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCasePersonDatumModifiedByUsers).HasConstraintName("FK_AccidentCasePersonData_ModifiedBy");
        });

        modelBuilder.Entity<AccidentCaseRIDDORDatum>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseRIDDORDataID).HasName("PK__Accident__AEC3630FCC381667");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_AccidentCase");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseRIDDORDatumArchivedByUsers).HasConstraintName("FK_AccidentCaseRIDDORData_ArchivedBy");

            entity.HasOne(d => d.BodyPart).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_BodyPart");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseRIDDORDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_CreatedBy");

            entity.HasOne(d => d.IncidentKind).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_IncidentKind");

            entity.HasOne(d => d.InjuryType).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_InjuryType");

            entity.HasOne(d => d.LocalAuthorityType).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_LocalAuthorityType");

            entity.HasOne(d => d.MainFactorType).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_MainFactorType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseRIDDORDatumModifiedByUsers).HasConstraintName("FK_AccidentCaseRIDDORData_ModifiedBy");

            entity.HasOne(d => d.SubActivityType).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_SubActivityType");

            entity.HasOne(d => d.WorkProcessType).WithMany(p => p.AccidentCaseRIDDORData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseRIDDORData_WorkProcessType");
        });

        modelBuilder.Entity<AccidentCaseUserAreaQuestionTypeDatum>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseUserAreaQuestionTypeDataID).HasName("PK__Accident__64C7A6E54A023E38");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseUserAreaQuestionTypeData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseUserAreaQuestionTypeData_AccidentCaseID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseUserAreaQuestionTypeDatumArchivedByUsers).HasConstraintName("FK_AccidentCaseUserAreaQuestionTypeData_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseUserAreaQuestionTypeDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseUserAreaQuestionTypeData_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseUserAreaQuestionTypeDatumModifiedByUsers).HasConstraintName("FK_AccidentCaseUserAreaQuestionTypeData_ModifiedBy");

            entity.HasOne(d => d.UserAreaQuestionType).WithMany(p => p.AccidentCaseUserAreaQuestionTypeData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseUserAreaQuestionTypeData_UserAreaQuestionTypeID");
        });

        modelBuilder.Entity<AccidentCaseViewerUser>(entity =>
        {
            entity.HasKey(e => e.AccidentCaseViewerUserID).HasName("PK__Accident__6176C25484685EFA");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentCaseViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseViewerUser_AccidentCase");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentCaseViewerUserArchivedByUsers).HasConstraintName("FK_AccidentCaseViewerUser_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentCaseViewerUserCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseViewerUser_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentCaseViewerUserModifiedByUsers).HasConstraintName("FK_AccidentCaseViewerUser_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentCaseViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseViewerUser_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.AccidentCaseViewerUserUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentCaseViewerUser_User");
        });

        modelBuilder.Entity<AccidentForm>(entity =>
        {
            entity.HasKey(e => e.AccidentFormID).HasName("PK__tmp_ms_x__5948C023CAA44CBD");

            entity.Property(e => e.TemplateVersion).HasDefaultValue((byte)1);
            entity.Property(e => e.Version).HasDefaultValue((byte)1);

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentForm_AccidentCaseID");

            entity.HasOne(d => d.AccidentFormStatusType).WithMany(p => p.AccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentForm_AccidentFormStatusTypeID");

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentForm_AccidentFormTypeID");

            entity.HasOne(d => d.AccidentPerson).WithMany(p => p.AccidentForms).HasConstraintName("FK_AccidentForm_AccidentPersonID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentFormArchivedByUsers).HasConstraintName("FK_AccidentForm_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentFormCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentForm_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentFormModifiedByUsers).HasConstraintName("FK_AccidentForm_ModifiedBy");

            entity.HasOne(d => d.OriginalAccidentForm).WithMany(p => p.InverseOriginalAccidentForm).HasConstraintName("FK_AccidentForm_OriginalAccidentFormID");

            entity.HasOne(d => d.OriginalPrimaryAccidentForm).WithMany(p => p.InverseOriginalPrimaryAccidentForm).HasConstraintName("FK_AccidentForm_OriginalPrimaryAccidentFormID");

            entity.HasOne(d => d.Questionnaire).WithMany(p => p.AccidentForms).HasConstraintName("FK_AccidentForm_QuestionnaireID");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.AccidentForms).HasConstraintName("FK_AccidentForm_QuestionnaireResponseID");

            entity.HasOne(d => d.SeverityType).WithMany(p => p.AccidentForms).HasConstraintName("FK_AccidentForm_SeverityType");

            entity.HasOne(d => d.UserAreaAccidentForm).WithMany(p => p.AccidentForms).HasConstraintName("FK_AccidentForm_UserAreaAccidentFormID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentForm_UserAreaID");
        });

        modelBuilder.Entity<AccidentFormCrossPopulationType>(entity =>
        {
            entity.HasKey(e => e.AccidentFormCrossPopulationTypeID).HasName("PK__Accident__5EAB2A0ECF6027B1");

            entity.Property(e => e.AccidentFormCrossPopulationTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsEnabled).HasDefaultValue(true);

            entity.HasOne(d => d.LinkingAccidentFormType).WithMany(p => p.AccidentFormCrossPopulationTypeLinkingAccidentFormTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormCrossPopulationType_LinkingAccidentFormTypeID");

            entity.HasOne(d => d.MainAccidentFormType).WithMany(p => p.AccidentFormCrossPopulationTypeMainAccidentFormTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormCrossPopulationType_MainAccidentFormTypeID");
        });

        modelBuilder.Entity<AccidentFormQuestionnaireKeyTypeReportableField>(entity =>
        {
            entity.HasKey(e => e.AccidentFormQuestionnaireKeyTypeReportableFieldID).HasName("PK__Accident__50A8789D0827FAB8");

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AccidentFormQuestionnaireKeyTypeReportableFields)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormQuestionnaireKeyTypeReportableField_AccidentFormTypeID");

            entity.HasOne(d => d.QuestionnaireTypeKeyField).WithMany(p => p.AccidentFormQuestionnaireKeyTypeReportableFields)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormQuestionnaireKeyTypeReportableField_QuestionnaireTypeKeyFieldID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentFormQuestionnaireKeyTypeReportableFields).HasConstraintName("FK_AccidentFormQuestionnaireKeyTypeReportableField_UserAreaID");
        });

        modelBuilder.Entity<AccidentFormStatusType>(entity =>
        {
            entity.HasKey(e => e.AccidentFormStatusTypeID).HasName("PK__Accident__104554DD8A3842CE");

            entity.Property(e => e.AccidentFormStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<AccidentFormType>(entity =>
        {
            entity.HasKey(e => e.AccidentFormTypeID).HasName("PK__Accident__AB7BEBE3202395EE");

            entity.Property(e => e.IsSecondaryForm).HasDefaultValue(false);
            entity.Property(e => e.LatestTemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentFormTypeArchivedByUsers).HasConstraintName("FK_AccidentFormType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentFormTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormType_CreatedBy");

            entity.HasOne(d => d.InvestigationAccidentFormType).WithMany(p => p.InverseInvestigationAccidentFormType).HasConstraintName("FK_AccidentFormType_InvestigationForm");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentFormTypeModifiedByUsers).HasConstraintName("FK_AccidentFormType_ModifiedBy");

            entity.HasOne(d => d.ParentFormType).WithMany(p => p.InverseParentFormType).HasConstraintName("FK_AccidentFormType_ParentFormTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentFormTypes).HasConstraintName("FK_AccidentFormType_UserArea");
        });

        modelBuilder.Entity<AccidentFormTypeQuestionType>(entity =>
        {
            entity.HasKey(e => e.AccidentFormTypeQuestionTypeID).HasName("PK__Accident__32A8CA5D1DE4A454");

            entity.Property(e => e.TemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AccidentFormTypeQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormTypeQuestionType_AccidentFormType");

            entity.HasOne(d => d.AccidentQuestionType).WithMany(p => p.AccidentFormTypeQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormTypeQuestionType_AccidentQuestionType");

            entity.HasOne(d => d.AccidentSectionType).WithMany(p => p.AccidentFormTypeQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormTypeQuestionType_AccidentSectionType");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_AccidentFormTypeQuestionType_Parent");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentFormTypeQuestionTypes).HasConstraintName("FK_AccidentFormTypeQuestionType_UserArea");
        });

        modelBuilder.Entity<AccidentFormTypeUserArea>(entity =>
        {
            entity.HasKey(e => e.AccidentFormTypeUserAreaID).HasName("PK__Accident__EFB12F8BC7A3BCE3");

            entity.Property(e => e.IsEnabledForApp).HasDefaultValue(true);
            entity.Property(e => e.IsEnabledForWeb).HasDefaultValue(true);

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AccidentFormTypeUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormTypeUserArea_AccidentFormType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentFormTypeUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentFormTypeUserArea_UserArea");
        });

        modelBuilder.Entity<AccidentPerson>(entity =>
        {
            entity.HasKey(e => e.AccidentPersonID).HasName("PK__tmp_ms_x__E61B83B8AF7F6C5B");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_AccidentCase");

            entity.HasOne(d => d.AccidentPersonType).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_AccidentPersonType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AccidentPersonArchivedByUsers).HasConstraintName("FK_AccidentPerson_ArchivedBy");

            entity.HasOne(d => d.AssessorEmployee).WithMany(p => p.AccidentPersonAssessorEmployees).HasConstraintName("FK_AccidentPerson_AssessorEmployeeID");

            entity.HasOne(d => d.AssessorLocation).WithMany(p => p.AccidentPersonAssessorLocations).HasConstraintName("FK_AccidentPerson_AssessorLocationID");

            entity.HasOne(d => d.AssessorOrgGroup).WithMany(p => p.AccidentPersonAssessorOrgGroups).HasConstraintName("FK_AccidentPerson_AssessorOrgGroupID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AccidentPersonCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentPerson_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.AccidentPersonEmployees).HasConstraintName("FK_AccidentPerson_EmployeeID");

            entity.HasOne(d => d.EmploymentStatusType).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_EmploymentStatusTypeID");

            entity.HasOne(d => d.GenderType).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_GenderTypeID");

            entity.HasOne(d => d.InjuryType).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_InjuryTypeID");

            entity.HasOne(d => d.Location).WithMany(p => p.AccidentPersonLocations).HasConstraintName("FK_AccidentPerson_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AccidentPersonModifiedByUsers).HasConstraintName("FK_AccidentPerson_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.AccidentPersonOrgGroups).HasConstraintName("FK_AccidentPerson_OrgGroupID");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_AccidentPerson_AccidentPersonID");

            entity.HasOne(d => d.SeverityOfInjuryType).WithMany(p => p.AccidentPeople).HasConstraintName("FK_AccidentPerson_SeverityOfInjuryTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentPeople)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentPerson_UserAreaID");
        });

        modelBuilder.Entity<AccidentPersonBodyPart>(entity =>
        {
            entity.HasKey(e => e.AccidentPersonBodyPartID).HasName("PK__Accident__0EC0C0147732ADA9");

            entity.HasOne(d => d.AccidentPerson).WithMany(p => p.AccidentPersonBodyParts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentPersonBodyPart_AccidentPersonID");

            entity.HasOne(d => d.BodyPart).WithMany(p => p.AccidentPersonBodyParts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentPersonBodyPart_BodyPartID");
        });

        modelBuilder.Entity<AccidentPersonType>(entity =>
        {
            entity.HasKey(e => e.AccidentPersonTypeID).HasName("PK__Accident__A1A470C796BE50EE");

            entity.Property(e => e.AccidentPersonTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<AccidentQuestionType>(entity =>
        {
            entity.HasKey(e => e.AccidentQuestionTypeID).HasName("PK__Accident__5F40EA35A57623CD");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.AccidentQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccidentQuestionType_AnswerType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentQuestionTypes).HasConstraintName("FK_AccidentQuestionType_UserArea");
        });

        modelBuilder.Entity<AccidentSectionType>(entity =>
        {
            entity.HasKey(e => e.AccidentSectionTypeID).HasName("PK__Accident__4B112042BF67DEED");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AccidentSectionTypes).HasConstraintName("FK_AccidentSectionType_UserArea");
        });

        modelBuilder.Entity<ActionPlan>(entity =>
        {
            entity.HasKey(e => e.ActionPlanID).HasName("PK__ActionPl__816C4BF4599BA66A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ActionPlanArchivedByUsers).HasConstraintName("FK_ActionPlan_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ActionPlanCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionPlan_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ActionPlanModifiedByUsers).HasConstraintName("FK_ActionPlan_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.ActionPlans).HasConstraintName("FK_ActionPlan_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ActionPlans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionPlan_UserArea");
        });

        modelBuilder.Entity<ActionPlanItem>(entity =>
        {
            entity.HasKey(e => e.ActionPlanItemID).HasName("PK__ActionPl__1A343A399E9EF830");

            entity.HasOne(d => d.ActionPlan).WithMany(p => p.ActionPlanItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionPlanItem_ActionPlan");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ActionPlanItemArchivedByUsers).HasConstraintName("FK_ActionPlanItem_ArchivedBy");

            entity.HasOne(d => d.CompletedByUser).WithMany(p => p.ActionPlanItemCompletedByUsers).HasConstraintName("FK_ActionPlanItem_CompletedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ActionPlanItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionPlanItem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ActionPlanItemModifiedByUsers).HasConstraintName("FK_ActionPlanItem_ModifiedBy");

            entity.HasOne(d => d.PlanCollectionItem).WithMany(p => p.ActionPlanItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionPlanItem_PlanCollectionItem");
        });

        modelBuilder.Entity<ActionType>(entity =>
        {
            entity.HasKey(e => e.ActionTypeID).HasName("PK__ActionTy__62FE4C04F3D2F3AF");

            entity.Property(e => e.ActionTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ActionTypeArchivedByUsers).HasConstraintName("FK_ActionType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ActionTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ActionType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ActionTypeModifiedByUsers).HasConstraintName("FK_ActionType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ActionTypes).HasConstraintName("FK_ActionType_UserArea");
        });

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.AddressID).HasName("PK__Address__091C2A1B06CA3B81");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AddressArchivedByUsers).HasConstraintName("FK_Address_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AddressCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Address_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AddressModifiedByUsers).HasConstraintName("FK_Address_ModifiedBy");
        });

        modelBuilder.Entity<AffectedItem>(entity =>
        {
            entity.HasKey(e => e.AffectedItemID).HasName("PK__Affected__15EB35F4ECD2D44F");

            entity.HasOne(d => d.AffectedItemType).WithMany(p => p.AffectedItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AffectedItem_AffectedItemType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AffectedItemArchivedByUsers).HasConstraintName("FK_AffectedItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AffectedItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AffectedItem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AffectedItemModifiedByUsers).HasConstraintName("FK_AffectedItem_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AffectedItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AffectedItem_UserArea");
        });

        modelBuilder.Entity<AffectedItemType>(entity =>
        {
            entity.HasKey(e => e.AffectedItemTypeID).HasName("PK__Affected__F0AE9FA7F50AE0B6");

            entity.Property(e => e.AffectedItemTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AffectedItemTypeArchivedByUsers).HasConstraintName("FK_AffectedItemType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AffectedItemTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AffectedItemType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AffectedItemTypeModifiedByUsers).HasConstraintName("FK_AffectedItemType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AffectedItemTypes).HasConstraintName("FK_AffectedItemType_UserArea");
        });

        modelBuilder.Entity<Alert>(entity =>
        {
            entity.HasKey(e => e.AlertID).HasName("PK__Alert__EBB16AEDE3ABAC08");

            entity.HasOne(d => d.AlertType).WithMany(p => p.Alerts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Alert_AlertType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AlertArchivedByUsers).HasConstraintName("FK_Alert_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AlertCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Alert_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.Alerts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Alert_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AlertModifiedByUsers).HasConstraintName("FK_Alert_ModifiedBy");

            entity.HasOne(d => d.SeverityType).WithMany(p => p.Alerts).HasConstraintName("FK_Alert_SeverityType");

            entity.HasOne(d => d.SystemProductType).WithMany(p => p.Alerts).HasConstraintName("FK_Alert_SystemProductType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Alerts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Alert_UserArea");
        });

        modelBuilder.Entity<AlertType>(entity =>
        {
            entity.HasKey(e => e.AlertTypeID).HasName("PK__AlertTyp__016D419D6EC18ABC");

            entity.Property(e => e.AlertTypeID).ValueGeneratedNever();
            entity.Property(e => e.CreatedByUserID).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AlertTypeArchivedByUsers).HasConstraintName("FK_AlertType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AlertTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AlertTypeModifiedByUsers).HasConstraintName("FK_AlertType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AlertTypes).HasConstraintName("FK_AlertType_UserArea");
        });

        modelBuilder.Entity<AlertTypeEmployee>(entity =>
        {
            entity.HasKey(e => e.AlertTypeEmployeeID).HasName("PK__AlertTyp__C037332056983FA9");

            entity.HasOne(d => d.AlertType).WithMany(p => p.AlertTypeEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployee_AlertType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AlertTypeEmployeeArchivedByUsers).HasConstraintName("FK_AlertTypeEmployee_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AlertTypeEmployeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployee_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.AlertTypeEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployee_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AlertTypeEmployeeModifiedByUsers).HasConstraintName("FK_AlertTypeEmployee_ModifiedBy");

            entity.HasOne(d => d.SeverityType).WithMany(p => p.AlertTypeEmployees).HasConstraintName("FK_AlertTypeEmployee_SeverityType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AlertTypeEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployee_UserArea");
        });

        modelBuilder.Entity<AlertTypeEmployeeLocation>(entity =>
        {
            entity.HasKey(e => e.AlertTypeEmployeeLocationID).HasName("PK__AlertTyp__35B30E20E2369DE8");

            entity.HasOne(d => d.AlertTypeEmployee).WithMany(p => p.AlertTypeEmployeeLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployeeLocation_AlertTypeEmployee");

            entity.HasOne(d => d.Location).WithMany(p => p.AlertTypeEmployeeLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployeeLocation_Location");
        });

        modelBuilder.Entity<AlertTypeEmployeeOrgGroup>(entity =>
        {
            entity.HasKey(e => e.AlertTypeEmployeeOrgGroupID).HasName("PK__AlertTyp__3CD979483EA4BDF7");

            entity.HasOne(d => d.AlertTypeEmployee).WithMany(p => p.AlertTypeEmployeeOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployeeOrgGroup_AlertTypeEmployee");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.AlertTypeEmployeeOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlertTypeEmployeeOrgGroup_OrgGroup");
        });

        modelBuilder.Entity<AlertTypeUserArea>(entity =>
        {
            entity.HasKey(e => e.AlertTypeUserAreaID).HasName("PK__AlertTyp__4801223C50DF478D");
        });

        modelBuilder.Entity<AllowedDomain>(entity =>
        {
            entity.HasKey(e => e.DomainID).HasName("PK__AllowedD__2498D7700457965F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AllowedDomainArchivedByUsers).HasConstraintName("FK_AllowedDomain_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AllowedDomainCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllowedDomain_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AllowedDomainModifiedByUsers).HasConstraintName("FK_AllowedDomain_ModifiedBy");
        });

        modelBuilder.Entity<AnonymousAccidentForm>(entity =>
        {
            entity.HasKey(e => e.AnonymousAccidentFormID).HasName("PK__Anonymou__071CD56ACD74815C");

            entity.Property(e => e.TemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.AnonymousAccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnonymousAccidentForm_AccidentFormTypeID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnonymousAccidentFormArchivedByUsers).HasConstraintName("FK_AnonymousAccidentForm_ArchivedBy");

            entity.HasOne(d => d.ProcessedByUser).WithMany(p => p.AnonymousAccidentFormProcessedByUsers).HasConstraintName("FK_AnonymousAccidentForm_ProcessedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AnonymousAccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnonymousAccidentForm_UserAreaID");
        });

        modelBuilder.Entity<AnswerGrid>(entity =>
        {
            entity.HasKey(e => e.AnswerGridID).HasName("PK__AnswerGr__156500D469734D66");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnswerGridArchivedByUsers).HasConstraintName("FK_AnswerGrid_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AnswerGridCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGrid_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AnswerGridModifiedByUsers).HasConstraintName("FK_AnswerGrid_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AnswerGrids).HasConstraintName("FK_AnswerGrid_UserArea");
        });

        modelBuilder.Entity<AnswerGridAnswer>(entity =>
        {
            entity.HasKey(e => e.AnswerGridAnswerID).HasName("PK__AnswerGr__C17A99E2C18EAD46");

            entity.HasOne(d => d.AnswerGrid).WithMany(p => p.AnswerGridAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswer_AnswerGrid");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnswerGridAnswerArchivedByUsers).HasConstraintName("FK_AnswerGridAnswer_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AnswerGridAnswerCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswer_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AnswerGridAnswerModifiedByUsers).HasConstraintName("FK_AnswerGridAnswer_ModifiedBy");
        });

        modelBuilder.Entity<AnswerGridAnswerItem>(entity =>
        {
            entity.HasKey(e => e.AnswerGridAnswerItemID).HasName("PK__AnswerGr__9A466959DBFBB126");

            entity.Property(e => e.AnswerTypeID).HasDefaultValue(3);

            entity.HasOne(d => d.AnswerGridAnswer).WithMany(p => p.AnswerGridAnswerItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswerItem_AnswerGridAnswer");

            entity.HasOne(d => d.AnswerGrid).WithMany(p => p.AnswerGridAnswerItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswerItem_AnswerGrid");

            entity.HasOne(d => d.AnswerGridQuestion).WithMany(p => p.AnswerGridAnswerItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswerItem_AnswerGridQuestion");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnswerGridAnswerItemArchivedByUsers).HasConstraintName("FK_AnswerGridAnswerItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AnswerGridAnswerItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridAnswerItem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AnswerGridAnswerItemModifiedByUsers).HasConstraintName("FK_AnswerGridAnswerItem_ModifiedBy");
        });

        modelBuilder.Entity<AnswerGridQuestion>(entity =>
        {
            entity.HasKey(e => e.AnswerGridQuestionID).HasName("PK__AnswerGr__A8FD6162ACA03020");

            entity.HasOne(d => d.AnswerGrid).WithMany(p => p.AnswerGridQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridQuestion_AnswerGrid");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnswerGridQuestionArchivedByUsers).HasConstraintName("FK_AnswerGridQuestion_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AnswerGridQuestionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerGridQuestion_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AnswerGridQuestionModifiedByUsers).HasConstraintName("FK_AnswerGridQuestion_ModifiedBy");
        });

        modelBuilder.Entity<AnswerType>(entity =>
        {
            entity.HasKey(e => e.AnswerTypeID).HasName("PK__AnswerTy__4D81A3078CDD05CB");

            entity.Property(e => e.AnswerTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AnswerTypeArchivedByUsers).HasConstraintName("FK_AnswerType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AnswerTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnswerType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AnswerTypeModifiedByUsers).HasConstraintName("FK_AnswerType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AnswerTypes).HasConstraintName("FK_AnswerType_UserArea");
        });

        modelBuilder.Entity<ApiKey>(entity =>
        {
            entity.HasKey(e => e.ApiKeyID).HasName("PK__ApiKey__2F134312E4D1BA7F");

            entity.HasIndex(e => e.IsActive, "IX_ApiKey_Active_NotExpired").HasFilter("([IsActive]=(1))");

            entity.Property(e => e.GUID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.RateLimitRequests).HasDefaultValue(1000);
            entity.Property(e => e.RateLimitWindow).HasDefaultValue(3600);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ApiKeyArchivedByUsers).HasConstraintName("FK_ApiKey_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ApiKeyCreatedByUsers).HasConstraintName("FK_ApiKey_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ApiKeyModifiedByUsers).HasConstraintName("FK_ApiKey_ModifiedBy");

            entity.HasOne(d => d.User).WithMany(p => p.ApiKeyUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApiKey_User");
        });

        modelBuilder.Entity<ApplicationStatusType>(entity =>
        {
            entity.HasKey(e => e.ApplicationStatusTypeID).HasName("PK__Applicat__C420620B4FB7A806");

            entity.Property(e => e.ApplicationStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ApprovalStatusType>(entity =>
        {
            entity.HasKey(e => e.ApprovalStatusTypeID).HasName("PK__Approval__7E8D612EE0C332B5");

            entity.Property(e => e.ApprovalStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<AsbestosManagementPlan>(entity =>
        {
            entity.HasKey(e => e.AsbestosManagementPlanID).HasName("PK__Asbestos__2E6A7ACFF2F2792F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AsbestosManagementPlanArchivedByUsers).HasConstraintName("FK_AsbestosManagementPlan_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AsbestosManagementPlanCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsbestosManagementPlan_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.AsbestosManagementPlans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsbestosManagementPlan_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AsbestosManagementPlanModifiedByUsers).HasConstraintName("FK_AsbestosManagementPlan_ModifiedBy");

            entity.HasOne(d => d.SitePlanAttachment).WithMany(p => p.AsbestosManagementPlans).HasConstraintName("FK_AsbestosManagementPlan_SitePlanAttachmentID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AsbestosManagementPlans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AsbestosManagementPlan_UserAreaID");
        });

        modelBuilder.Entity<Asset>(entity =>
        {
            entity.HasKey(e => e.AssetID).HasName("PK__Asset__4349237227F1CD8E");
        });

        modelBuilder.Entity<AssetAttachment>(entity =>
        {
            entity.HasKey(e => e.AssetAttachmentID).HasName("PK__AssetAtt__45944AE9FDBD10CA");
        });

        modelBuilder.Entity<AssetCategory>(entity =>
        {
            entity.HasKey(e => e.AssetCategoryID).HasName("PK__AssetCat__C381F49D46AB4E89");
        });

        modelBuilder.Entity<AssetCategoryInspectionReminder>(entity =>
        {
            entity.HasKey(e => e.AssetCategoryInspectionReminderID).HasName("PK__AssetCat__68A3623493770EF7");
        });

        modelBuilder.Entity<AssetCategoryInspectionReminderEmployee>(entity =>
        {
            entity.HasKey(e => e.AssetCategoryInspectionReminderEmployeeID).HasName("PK__AssetCat__11AC0808E27DB287");
        });

        modelBuilder.Entity<AssetDSEEmployee>(entity =>
        {
            entity.HasKey(e => e.AssetDSEEmployeeID).HasName("PK__AssetDSE__EDAC2E936D81E5C1");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AssetDSEEmployeeArchivedByUsers).HasConstraintName("FK_AssetDSEEmployee_ArchivedBy");

            entity.HasOne(d => d.Asset).WithMany(p => p.AssetDSEEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetDSEEmployee_Asset");

            entity.HasOne(d => d.AssetStatusType).WithMany(p => p.AssetDSEEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetDSEEmployee_AssetStatusType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AssetDSEEmployeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetDSEEmployee_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.AssetDSEEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetDSEEmployee_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AssetDSEEmployeeModifiedByUsers).HasConstraintName("FK_AssetDSEEmployee_ModifiedBy");
        });

        modelBuilder.Entity<AssetInspection>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionID).HasName("PK__AssetIns__77DF3ED5657C4F5C");
        });

        modelBuilder.Entity<AssetInspectionAllianzImport>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionAllianzImportID).HasName("PK__AssetIns__C29441F5C7A3F889");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetInspectionAllianzImports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImport_UserArea");
        });

        modelBuilder.Entity<AssetInspectionAllianzImportFailure>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionAllianzImportFailureID).HasName("PK__AssetIns__F3A8A3F4CB3B8E09");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AssetInspectionAllianzImportFailureArchivedByUsers).HasConstraintName("FK_AssetInspectionAllianzImportFailure_ArchivedBy");

            entity.HasOne(d => d.AssetInspectionAllianzImport).WithMany(p => p.AssetInspectionAllianzImportFailures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImportFailure_AssetInspectionAllianzImport");

            entity.HasOne(d => d.AssetInspectionStatusType).WithMany(p => p.AssetInspectionAllianzImportFailures).HasConstraintName("FK_AssetInspectionAllianzImportFailure_AssetInspectionStatusType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AssetInspectionAllianzImportFailureCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImportFailure_CreatedBy");

            entity.HasOne(d => d.MatchingAsset).WithMany(p => p.AssetInspectionAllianzImportFailures).HasConstraintName("FK_AssetInspectionAllianzImportFailure_Asset");

            entity.HasOne(d => d.MatchingLocation).WithMany(p => p.AssetInspectionAllianzImportFailures).HasConstraintName("FK_AssetInspectionAllianzImportFailure_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AssetInspectionAllianzImportFailureModifiedByUsers).HasConstraintName("FK_AssetInspectionAllianzImportFailure_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetInspectionAllianzImportFailures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImportFailure_UserArea");
        });

        modelBuilder.Entity<AssetInspectionAllianzImportSuccess>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionAllianzImportSuccessID).HasName("PK__AssetIns__58CF2E6AE16C327C");

            entity.HasOne(d => d.AssetInspectionAllianzImport).WithMany(p => p.AssetInspectionAllianzImportSuccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImportSuccess_AssetInspectionAllianzImport");

            entity.HasOne(d => d.AssetInspection).WithMany(p => p.AssetInspectionAllianzImportSuccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionAllianzImportSuccess_AssetInspection");
        });

        modelBuilder.Entity<AssetInspectionAttachment>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionAttachmentID).HasName("PK__AssetIns__EAEFC057887E4DE4");
        });

        modelBuilder.Entity<AssetInspectionCategory>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionCategoryID).HasName("PK__AssetIns__45133A0FE875B582");
        });

        modelBuilder.Entity<AssetInspectionChecklist>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionChecklistID).HasName("PK__AssetIns__DF9B2209371D8394");
        });

        modelBuilder.Entity<AssetInspectionCrimsonImport>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionCrimsonImportID).HasName("PK__AssetIns__7D3A0F460F8C1FA4");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetInspectionCrimsonImports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImport_UserArea");
        });

        modelBuilder.Entity<AssetInspectionCrimsonImportFailure>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionCrimsonImportFailureID).HasName("PK__AssetIns__427B60A38E31F7E9");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AssetInspectionCrimsonImportFailureArchivedByUsers).HasConstraintName("FK_AssetInspectionCrimsonImportFailure_ArchivedBy");

            entity.HasOne(d => d.AssetInspectionCrimsonImport).WithMany(p => p.AssetInspectionCrimsonImportFailures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImportFailure_AssetInspectionCrimsonImport");

            entity.HasOne(d => d.AssetInspectionStatusType).WithMany(p => p.AssetInspectionCrimsonImportFailures).HasConstraintName("FK_AssetInspectionCrimsonImportFailure_AssetInspectionStatusType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AssetInspectionCrimsonImportFailureCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImportFailure_CreatedBy");

            entity.HasOne(d => d.MatchingAsset).WithMany(p => p.AssetInspectionCrimsonImportFailures).HasConstraintName("FK_AssetInspectionCrimsonImportFailure_Asset");

            entity.HasOne(d => d.MatchingLocation).WithMany(p => p.AssetInspectionCrimsonImportFailures).HasConstraintName("FK_AssetInspectionCrimsonImportFailure_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AssetInspectionCrimsonImportFailureModifiedByUsers).HasConstraintName("FK_AssetInspectionCrimsonImportFailure_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetInspectionCrimsonImportFailures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImportFailure_UserArea");
        });

        modelBuilder.Entity<AssetInspectionCrimsonImportSuccess>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionCrimsonImportSuccessID).HasName("PK__AssetIns__C2DA06BD0A1E0166");

            entity.HasOne(d => d.AssetInspectionCrimsonImport).WithMany(p => p.AssetInspectionCrimsonImportSuccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImportSuccess_AssetInspectionCrimsonImport");

            entity.HasOne(d => d.AssetInspection).WithMany(p => p.AssetInspectionCrimsonImportSuccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetInspectionCrimsonImportSuccess_AssetInspection");
        });

        modelBuilder.Entity<AssetInspectionLocation>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionLocationID).HasName("PK__AssetIns__EEF2D7F72A9401E4");
        });

        modelBuilder.Entity<AssetInspectionReminder>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionReminderID).HasName("PK__AssetIns__57A6379A46A17F73");
        });

        modelBuilder.Entity<AssetInspectionStatusType>(entity =>
        {
            entity.HasKey(e => e.AssetInspectionStatusTypeID).HasName("PK__AssetIns__28D2724DC84E1EEF");

            entity.Property(e => e.AssetInspectionStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<AssetLocation>(entity =>
        {
            entity.HasKey(e => e.AssetLocationID).HasName("PK__AssetLoc__56706A5ACC57BD5A");
        });

        modelBuilder.Entity<AssetOrgGroup>(entity =>
        {
            entity.HasKey(e => e.AssetOrgGroupID).HasName("PK__AssetOrg__B21064689406B5D3");
        });

        modelBuilder.Entity<AssetQRCode>(entity =>
        {
            entity.HasKey(e => e.AssetQRCodeID).HasName("PK__AssetQRC__9EBA020CEED7DD27");
        });

        modelBuilder.Entity<AssetStatusChange>(entity =>
        {
            entity.HasKey(e => e.AssetStatusChangeID).HasName("PK__AssetSta__B6993F2EF6B65F14");
        });

        modelBuilder.Entity<AssetStatusChangeType>(entity =>
        {
            entity.HasKey(e => e.AssetStatusChangeTypeID).HasName("PK__AssetSta__60201DD41C82CAC6");

            entity.Property(e => e.AssetStatusChangeTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AssetStatusChangeTypeArchivedByUsers).HasConstraintName("FK_AssetStatusChangeType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AssetStatusChangeTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetStatusChangeType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AssetStatusChangeTypeModifiedByUsers).HasConstraintName("FK_AssetStatusChangeType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetStatusChangeTypes).HasConstraintName("FK_AssetStatusChangeType_UserArea");
        });

        modelBuilder.Entity<AssetStatusType>(entity =>
        {
            entity.HasKey(e => e.AssetStatusTypeID).HasName("PK__AssetSta__C8C7BF582E2CC526");

            entity.Property(e => e.AssetStatusTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AssetStatusTypeArchivedByUsers).HasConstraintName("FK_AssetStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AssetStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssetStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AssetStatusTypeModifiedByUsers).HasConstraintName("FK_AssetStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AssetStatusTypes).HasConstraintName("FK_AssetStatusType_UserArea");
        });

        modelBuilder.Entity<AssignmentHistory>(entity =>
        {
            entity.Property(e => e.ActionDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Assignment).WithMany(p => p.AssignmentHistories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssignmentHistory_Assignment");

            entity.HasOne(d => d.PerformedByUser).WithMany(p => p.AssignmentHistories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssignmentHistory_PerformedBy");
        });

        modelBuilder.Entity<AssignmentSignature>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Assignment).WithMany(p => p.AssignmentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssignmentSignature_Assignment");

            entity.HasOne(d => d.SignerUser).WithMany(p => p.AssignmentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AssignmentSignature_Signer");
        });

        modelBuilder.Entity<Attachment>(entity =>
        {
            entity.HasKey(e => e.AttachmentID).HasName("PK__Attachme__442C64DE74657C51");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AttachmentArchivedByUsers).HasConstraintName("FK_Attachment_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AttachmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Attachment_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AttachmentModifiedByUsers).HasConstraintName("FK_Attachment_ModifiedBy");
        });

        modelBuilder.Entity<AttachmentBackup>(entity =>
        {
            entity.HasKey(e => e.AttachmentID).HasName("PK__Attachme__442C64DE36743C8B");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.AttachmentBackupArchivedByUsers).HasConstraintName("FK_AttachmentBackup_ArchivedBy");

            entity.HasOne(d => d.AttachmentType).WithMany(p => p.AttachmentBackups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentBackup_AttachmentType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.AttachmentBackupCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentBackup_CreatedBy");

            entity.HasOne(d => d.Folder).WithMany(p => p.AttachmentBackups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentBackup_Folder");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.AttachmentBackupModifiedByUsers).HasConstraintName("FK_AttachmentBackup_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AttachmentBackups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentBackup_UserArea");
        });

        modelBuilder.Entity<AttachmentChild>(entity =>
        {
            entity.HasKey(e => e.AttachmentChildID).HasName("PK__Attachme__B62B16966E905226");

            entity.HasOne(d => d.ParentAttachment).WithMany(p => p.AttachmentChildren).HasConstraintName("FK_AttachmentChild_Attachment");
        });

        modelBuilder.Entity<AttachmentLocation>(entity =>
        {
            entity.HasKey(e => e.AttachmentLocationID).HasName("PK__Attachme__F8E3F69AB51D10B5");

            entity.HasOne(d => d.Attachment).WithMany(p => p.AttachmentLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentLocation_Attachment");

            entity.HasOne(d => d.Location).WithMany(p => p.AttachmentLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentLocation_Location");
        });

        modelBuilder.Entity<AttachmentType>(entity =>
        {
            entity.HasKey(e => e.AttachmentTypeID).HasName("PK__Attachme__5C63AB44CF36E395");
        });

        modelBuilder.Entity<AttachmentUserArea>(entity =>
        {
            entity.HasKey(e => e.AttachmentUserAreaID).HasName("PK__Attachme__8DFDDAD0E7F1D872");

            entity.HasOne(d => d.Attachment).WithMany(p => p.AttachmentUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentUserArea_Attachment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AttachmentUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttachmentUserArea_UserArea");
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.AuditLogID).HasName("PK__AuditLog__EB5F6CDD9AB9C8DD");

            entity.HasOne(d => d.UserArea).WithMany(p => p.AuditLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuditLog_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.AuditLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuditLog_User");
        });

        modelBuilder.Entity<BCARMClient>(entity =>
        {
            entity.HasKey(e => e.BCARMClientID).HasName("PK__BCARMCli__A13ACE1CF30E4084");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BCARMClientArchivedByUsers).HasConstraintName("FK_BCARMClient_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BCARMClientCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BCARMClient_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BCARMClientModifiedByUsers).HasConstraintName("FK_BCARMClient_ModifiedBy");
        });

        modelBuilder.Entity<BCARMError>(entity =>
        {
            entity.HasKey(e => e.BCARMErrorID).HasName("PK_BCARMErrorID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BCARMErrorArchivedByUsers).HasConstraintName("FK_BCARMError_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BCARMErrorCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BCARMError_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BCARMErrorModifiedByUsers).HasConstraintName("FK_BCARMError_ModifiedBy");
        });

        modelBuilder.Entity<BCARMLog>(entity =>
        {
            entity.HasKey(e => e.BCARMLogID).HasName("PK__BCARMLog__E9229B030799BC65");
        });

        modelBuilder.Entity<BCARMUser>(entity =>
        {
            entity.HasKey(e => e.BCARMUserID).HasName("PK_BCARMUserID");
        });

        modelBuilder.Entity<BCARMUserArea>(entity =>
        {
            entity.HasKey(e => e.BCARMUserAreaID).HasName("PK_BCARMUserAreaID");
        });

        modelBuilder.Entity<BSSTask>(entity =>
        {
            entity.HasKey(e => e.TaskID).HasName("PK__Task__7C6949D1A74D81F7");

            entity.HasIndex(e => new { e.OpenToLocationID, e.UserAreaID }, "IX_BSSTask_Location").HasFilter("([OpenToLocationID] IS NOT NULL)");

            entity.HasIndex(e => new { e.OpenToOrgGroupID, e.UserAreaID }, "IX_BSSTask_OrgGroup").HasFilter("([OpenToOrgGroupID] IS NOT NULL)");

            entity.Property(e => e.MaxConcurrentWorkers).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BSSTaskArchivedByUsers).HasConstraintName("FK_Task_ArchivedByUserID");

            entity.HasOne(d => d.CompletedBySignatureAttachment).WithMany(p => p.BSSTasks).HasConstraintName("Fk_Attachment_AttachmentID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BSSTaskCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Task_CreatedByUserID");

            entity.HasOne(d => d.HRCase).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_HRCase");

            entity.HasOne(d => d.HRType).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_HRType");

            entity.HasOne(d => d.InProgressByUser).WithMany(p => p.BSSTaskInProgressByUsers).HasConstraintName("FK_BSSTask_InProgressBy");

            entity.HasOne(d => d.Location).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BSSTaskModifiedByUsers).HasConstraintName("FK_Task_ModifiedByUserID");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_Task_Parent");

            entity.HasOne(d => d.ReturnedToPoolByUser).WithMany(p => p.BSSTaskReturnedToPoolByUsers).HasConstraintName("FK_BSSTask_ReturnedToPoolBy");

            entity.HasOne(d => d.TaskPriority).WithMany(p => p.BSSTasks).HasConstraintName("FK_BSSTask_TaskPriority");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.BSSTasks).HasConstraintName("FK_BSSTask_TaskSchedule");

            entity.HasOne(d => d.TaskSeverityNavigation).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_TaskSeverity");

            entity.HasOne(d => d.TaskStatusType).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_TaskStatusType");

            entity.HasOne(d => d.TaskType).WithMany(p => p.BSSTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Task_TaskType");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.BSSTasks).HasConstraintName("FK_Task_TribunalCase");

            entity.HasOne(d => d.UserArea).WithMany(p => p.BSSTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Task_UserArea");
        });

        modelBuilder.Entity<BSSTimeZone>(entity =>
        {
            entity.HasKey(e => e.TimeZoneID).HasName("PK__BSSTimeZ__78D387CFBB8CED41");

            entity.Property(e => e.TimeZoneID).ValueGeneratedNever();
        });

        modelBuilder.Entity<BankHolidayType>(entity =>
        {
            entity.HasKey(e => e.BankHolidayTypeID).HasName("PK__BankHoli__BA9C5F051A7947CA");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BankHolidayTypeArchivedByUsers).HasConstraintName("FK_BankHolidayType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BankHolidayTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BankHolidayType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BankHolidayTypeModifiedByUsers).HasConstraintName("FK_BankHolidayType_ModifiedBy");

            entity.HasOne(d => d.RegionType).WithMany(p => p.BankHolidayTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BankHolidayType_Region");

            entity.HasOne(d => d.UserArea).WithMany(p => p.BankHolidayTypes).HasConstraintName("FK_BankHolidayType_UserArea");
        });

        modelBuilder.Entity<BenefitType>(entity =>
        {
            entity.HasKey(e => e.BenefitTypeID).HasName("PK__BenefitT__63C1671755A9E02E");

            entity.Property(e => e.BenefitTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<BodyPart>(entity =>
        {
            entity.HasKey(e => e.BodyPartID).HasName("PK__BodyPart__4819A2A403F00F81");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BodyPartArchivedByUsers).HasConstraintName("FK_BodyPart_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BodyPartCreatedByUsers).HasConstraintName("FK_BodyPart_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BodyPartModifiedByUsers).HasConstraintName("FK_BodyPart_ModifiedBy");

            entity.HasOne(d => d.ParentBodyPart).WithMany(p => p.InverseParentBodyPart).HasConstraintName("FK_BodyPart_ParentBodyPartID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.BodyParts).HasConstraintName("FK_BodyPart_UserAreaID");
        });

        modelBuilder.Entity<BodyPartPickerType>(entity =>
        {
            entity.HasKey(e => e.BodyPartPickerTypeID).HasName("PK__BodyPart__636214E00EF968F7");

            entity.Property(e => e.BodyPartPickerTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.BodyPart).WithMany(p => p.BodyPartPickerTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BodyPartPickerType_BodyPart");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_BodyPartPickerType_Parent");
        });

        modelBuilder.Entity<BouncePattern>(entity =>
        {
            entity.HasIndex(e => new { e.PatternType, e.IsActive }, "IX_BouncePattern_PatternType_IsActive").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Priority).HasDefaultValue(100);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BouncePatternArchivedByUsers).HasConstraintName("FK_BouncePattern_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BouncePatternCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BouncePattern_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BouncePatternModifiedByUsers).HasConstraintName("FK_BouncePattern_ModifiedBy");
        });

        modelBuilder.Entity<BounceStatus>(entity =>
        {
            entity.HasIndex(e => new { e.UserAreaID, e.EmailAddress, e.IsActive }, "IX_BounceStatus_UserAreaID_EmailAddress_IsActive").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => new { e.UserID, e.IsActive }, "IX_BounceStatus_UserID_IsActive").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.BounceCount).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.FirstBounceDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastBounceDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.BounceStatusArchivedByUsers).HasConstraintName("FK_BounceStatus_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.BounceStatusCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BounceStatus_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.BounceStatusModifiedByUsers).HasConstraintName("FK_BounceStatus_ModifiedBy");

            entity.HasOne(d => d.ResolvedByUser).WithMany(p => p.BounceStatusResolvedByUsers).HasConstraintName("FK_BounceStatus_ResolvedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.BounceStatuses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BounceStatus_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.BounceStatusUsers).HasConstraintName("FK_BounceStatus_User");
        });

        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.CaseID).HasName("PK__Case__6CAE526CD4E13D0D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CaseArchivedByUsers).HasConstraintName("FK_Case_ArchivedByUser");

            entity.HasOne(d => d.CaseStatusType).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_CaseStatusType");

            entity.HasOne(d => d.CaseType).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_CaseType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CaseModifiedByUsers).HasConstraintName("FK_Case_ModifiedByUser");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_Case_Parent");

            entity.HasOne(d => d.TaskSeverity).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_TaskSeverity");

            entity.HasOne(d => d.UserAreaDivision).WithMany(p => p.Cases).HasConstraintName("FK_Case_UserAreaDivision");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_UserArea");
        });

        modelBuilder.Entity<CaseAssignableUser>(entity =>
        {
            entity.HasKey(e => e.CaseAssignableUserID).HasName("PK__CaseAssi__55DD800EC281C498");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CaseAssignableUserArchivedByUsers).HasConstraintName("FK_CaseAssignableUser_ArchivedByUser");

            entity.HasOne(d => d.CaseUserType).WithMany(p => p.CaseAssignableUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAssignableUser_CaseUserType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseAssignableUserCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAssignableUser_CreatedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CaseAssignableUsers).HasConstraintName("FK_CaseAssignableUser_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.CaseAssignableUserUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAssignableUser_User");
        });

        modelBuilder.Entity<CaseAttachment>(entity =>
        {
            entity.HasKey(e => e.CaseAttachmentID).HasName("PK__CaseAtta__F453D7EC8947EDD6");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CaseAttachmentArchivedByUsers).HasConstraintName("FK_CaseAttachment_ArchivedByUser");

            entity.HasOne(d => d.Attachment).WithMany(p => p.CaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAttachment_Attachment");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAttachment_Case");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseAttachmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseAttachment_CreatedByUser");
        });

        modelBuilder.Entity<CaseEmailNotification>(entity =>
        {
            entity.HasKey(e => e.CaseEmailNotificationID).HasName("PK__CaseEmai__1A0D9B551FD0C992");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseEmailNotifications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseEmailNotification_Case");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseEmailNotifications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseEmailNotification_CreatedByUser");
        });

        modelBuilder.Entity<CaseLog>(entity =>
        {
            entity.HasKey(e => e.CaseLogID).HasName("PK__CaseLog__C666D9F8F2DB2B82");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseLog_Case");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseLog_CreatedByUser");
        });

        modelBuilder.Entity<CaseNote>(entity =>
        {
            entity.HasKey(e => e.CaseNoteID).HasName("PK__CaseNote__DF5F9391E089437C");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CaseNoteArchivedByUsers).HasConstraintName("FK_CaseNote_ArchivedByUser");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseNote_Case");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseNote_CreatedByUser");
        });

        modelBuilder.Entity<CaseStatusType>(entity =>
        {
            entity.HasKey(e => e.CaseStatusTypeID).HasName("PK__CaseStat__D90E550FF19C98EC");

            entity.Property(e => e.CaseStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<CaseType>(entity =>
        {
            entity.HasKey(e => e.CaseTypeID).HasName("PK__CaseType__E7270816A6E7C108");

            entity.Property(e => e.CaseTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CaseTypeArchivedByUsers).HasConstraintName("FK_CaseType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CaseTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CaseTypeModifiedByUsers).HasConstraintName("FK_CaseType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CaseTypes).HasConstraintName("FK_CaseType_UserArea");
        });

        modelBuilder.Entity<CaseUser>(entity =>
        {
            entity.HasKey(e => e.CaseUserID).HasName("PK__CaseUser__B9937056ABA8AAF9");

            entity.HasOne(d => d.Case).WithMany(p => p.CaseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseUser_Case");

            entity.HasOne(d => d.CaseUserType).WithMany(p => p.CaseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseUser_CaseUserType");

            entity.HasOne(d => d.User).WithMany(p => p.CaseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CaseUser_User");
        });

        modelBuilder.Entity<CaseUserType>(entity =>
        {
            entity.HasKey(e => e.CaseUserTypeID).HasName("PK__CaseUser__556F2DB6352730CA");

            entity.Property(e => e.CaseUserTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryID).HasName("PK__Category__19093A2BD9EBA447");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CategoryArchivedByUsers).HasConstraintName("FK_Category_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CategoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CategoryModifiedByUsers).HasConstraintName("FK_Category_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Categories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category_UserArea");
        });

        modelBuilder.Entity<CategoryType>(entity =>
        {
            entity.HasKey(e => e.CategoryTypeID).HasName("PK__Category__7B30E783A5A2B9DB");

            entity.Property(e => e.CategoryTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Checklist>(entity =>
        {
            entity.HasKey(e => e.ChecklistID).HasName("PK__tmp_ms_x__4C1D49BA1BC3A26E");

            entity.Property(e => e.AllowFurtherActions).HasDefaultValue(true);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ChecklistArchivedByUsers).HasConstraintName("FK_Checklist_ArchivedBy");

            entity.HasOne(d => d.ChecklistSectorType).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_ChecklistSectorTypeID");

            entity.HasOne(d => d.ChecklistType).WithMany(p => p.Checklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Checklist_ChecklistTypeID");

            entity.HasOne(d => d.ConformityType).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_ConformityType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Checklist_CreatedBy");

            entity.HasOne(d => d.DefaultLocation).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_DefaultLocationID");

            entity.HasOne(d => d.ExposureType).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_ExposureType");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_ManagerEmployeeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistModifiedByUsers).HasConstraintName("FK_Checklist_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_OrgGroupID");

            entity.HasOne(d => d.RenewalFrequencyType).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_FrequencyTypeID");

            entity.HasOne(d => d.SectorType).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_SectorTypeID");

            entity.HasOne(d => d.SignOffChecklist).WithMany(p => p.InverseSignOffChecklist).HasConstraintName("FK_Checklist_SignOffChecklistID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Checklists).HasConstraintName("FK_Checklist_UserAreaID");
        });

        modelBuilder.Entity<ChecklistAssetInspection>(entity =>
        {
            entity.HasKey(e => e.ChecklistAssetInspectionID).HasName("PK__Checklis__86376FB7A502D97E");

            entity.HasOne(d => d.AssetInspectionType).WithMany(p => p.ChecklistAssetInspections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistAssetInspection_AssetInspectionType");

            entity.HasOne(d => d.Checklist).WithMany(p => p.ChecklistAssetInspections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistAssetInspection_Checklist");
        });

        modelBuilder.Entity<ChecklistAssignment>(entity =>
        {
            entity.HasKey(e => e.ChecklistAssignmentID).HasName("PK__Checklis__5311E87730F4B2F9");

            entity.Property(e => e.RenewalEnabled).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ChecklistAssignmentArchivedByUsers).HasConstraintName("FK_ChecklistAssignment_ArchivedBy");

            entity.HasOne(d => d.Checklist).WithMany(p => p.ChecklistAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistAssignment_ChecklistID");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_ContractorCompanyID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistAssignmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistAssignment_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_EmployeeID");

            entity.HasOne(d => d.JobRole).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_JobRoleID");

            entity.HasOne(d => d.Location).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistAssignmentModifiedByUsers).HasConstraintName("FK_ChecklistAssignment_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_OrgGroupID");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.ChecklistAssignments).HasConstraintName("FK_ChecklistAssignment_TaskScheduleID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ChecklistAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistAssignment_UserAreaID");
        });

        modelBuilder.Entity<ChecklistContent>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.HasCriticalQuestions).HasComputedColumnSql("(CONVERT([bit],json_value([ContentJSON],'$.hasCritical')))", true);
            entity.Property(e => e.MaxScore).HasComputedColumnSql("(CONVERT([int],json_value([ContentJSON],'$.maxScore')))", true);
            entity.Property(e => e.QuestionCount).HasComputedColumnSql("(CONVERT([int],json_value([ContentJSON],'$.questionCount')))", true);
            entity.Property(e => e.Version).HasDefaultValue(1);

            entity.HasOne(d => d.ChecklistTemplate).WithMany(p => p.ChecklistContents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistContent_ChecklistTemplate");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistContentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistContent_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistContentModifiedByUsers).HasConstraintName("FK_ChecklistContent_ModifiedByUser");
        });

        modelBuilder.Entity<ChecklistEnrolment>(entity =>
        {
            entity.HasKey(e => e.ChecklistEnrolmentID).HasName("PK__Checklis__4A92BA4C179D6BFC");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ChecklistEnrolmentArchivedByUsers).HasConstraintName("FK_ChecklistEnrollment_ArchivedBy");

            entity.HasOne(d => d.ChecklistAssignment).WithMany(p => p.ChecklistEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistEnrollment_ChecklistAssignmentID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistEnrolmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistEnrollment_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistEnrolmentModifiedByUsers).HasConstraintName("FK_ChecklistEnrollment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ChecklistEnrolments).HasConstraintName("FK_ChecklistEnrolment_UserAreaID");
        });

        modelBuilder.Entity<ChecklistOrgGroup>(entity =>
        {
            entity.HasKey(e => e.ChecklistOrgGroupID).HasName("PK__Checklis__2500302DC90DDF48");

            entity.HasOne(d => d.Checklist).WithMany(p => p.ChecklistOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistOrgGroup_Checklist");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.ChecklistOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistOrgGroup_OrgGroup");
        });

        modelBuilder.Entity<ChecklistResponseDatum>(entity =>
        {
            entity.Property(e => e.CompletionPercent).HasComputedColumnSql("(CONVERT([decimal](5,2),json_value([ResponseJSON],'$.completionPercent')))", true);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.FailedCritical).HasComputedColumnSql("(CONVERT([bit],json_value([ResponseJSON],'$.failedCritical')))", true);
            entity.Property(e => e.MaxPossibleScore).HasComputedColumnSql("(CONVERT([int],json_value([ResponseJSON],'$.maxPossibleScore')))", true);
            entity.Property(e => e.TotalScore).HasComputedColumnSql("(CONVERT([int],json_value([ResponseJSON],'$.totalScore')))", true);

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistResponseDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistResponseData_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistResponseDatumModifiedByUsers).HasConstraintName("FK_ChecklistResponseData_ModifiedByUser");

            entity.HasOne(d => d.UserAreaFormResponse).WithMany(p => p.ChecklistResponseData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistResponseData_UserAreaFormResponse");
        });

        modelBuilder.Entity<ChecklistSectorType>(entity =>
        {
            entity.HasKey(e => e.ChecklistSectorTypeID).HasName("PK__Checklis__2F2731DAEF1E2A7B");

            entity.Property(e => e.ChecklistSectorTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.UserArea).WithMany(p => p.ChecklistSectorTypes).HasConstraintName("FK_ChecklistSectorType_UserArea");
        });

        modelBuilder.Entity<ChecklistTemplate>(entity =>
        {
            entity.HasKey(e => e.ChecklistTemplateID).HasName("PK__Checklis__DF9EF6FE636375DB");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ChecklistTemplateArchivedByUsers).HasConstraintName("FK_ChecklistTemplate_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ChecklistTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplate_CreatedBy");

            entity.HasOne(d => d.DefaultManagerEmployee).WithMany(p => p.ChecklistTemplates).HasConstraintName("FK_ChecklistTemplate_DefaultManagerEmployee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ChecklistTemplateModifiedByUsers).HasConstraintName("FK_ChecklistTemplate_ModifiedBy");

            entity.HasOne(d => d.OriginalUserAreaForm).WithMany(p => p.ChecklistTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplate_OriginalUserAreaForm");

            entity.HasOne(d => d.RenewalFrequencyType).WithMany(p => p.ChecklistTemplates).HasConstraintName("FK_ChecklistTemplate_RenewalFrequencyType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ChecklistTemplates).HasConstraintName("FK_ChecklistTemplate_UserArea");
        });

        modelBuilder.Entity<ChecklistTemplateAssignment>(entity =>
        {
            entity.HasKey(e => e.ChecklistTemplateAssignmentID).HasName("PK__Checklis__0CA7E50DFAA56154");

            entity.HasOne(d => d.AssignedUserArea).WithMany(p => p.ChecklistTemplateAssignmentAssignedUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateAssignment_AssignedUserArea");

            entity.HasOne(d => d.ChecklistTemplate).WithMany(p => p.ChecklistTemplateAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateAssignment_ChecklistTemplate");

            entity.HasOne(d => d.Employee).WithMany(p => p.ChecklistTemplateAssignmentEmployees).HasConstraintName("FK_ChecklistTemplateAssignment_Employee");

            entity.HasOne(d => d.IssuingUserArea).WithMany(p => p.ChecklistTemplateAssignmentIssuingUserAreas).HasConstraintName("FK_ChecklistTemplateAssignment_IssuingUserArea");

            entity.HasOne(d => d.Location).WithMany(p => p.ChecklistTemplateAssignments).HasConstraintName("FK_ChecklistTemplateAssignment_Location");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.ChecklistTemplateAssignmentManagerEmployees).HasConstraintName("FK_ChecklistTemplateAssignment_ManagerEmployee");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.ChecklistTemplateAssignments).HasConstraintName("FK_ChecklistTemplateAssignment_OrgGroup");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.ChecklistTemplateAssignments).HasConstraintName("FK_ChecklistTemplateAssignment_TaskSchedule");
        });

        modelBuilder.Entity<ChecklistTemplateCategory>(entity =>
        {
            entity.HasKey(e => e.ChecklistTemplateCategoryID).HasName("PK__Checklis__D9506180E3C57C7C");

            entity.HasOne(d => d.CategoryType).WithMany(p => p.ChecklistTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateCategory_Category");

            entity.HasOne(d => d.ChecklistTemplate).WithMany(p => p.ChecklistTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateCategory_ChecklistTemplate");
        });

        modelBuilder.Entity<ChecklistTemplateEnrolment>(entity =>
        {
            entity.HasKey(e => e.ChecklistTemplateEnrolmentID).HasName("PK__Checklis__FE416E94D4935950");

            entity.HasOne(d => d.ChecklistTemplateAssignment).WithMany(p => p.ChecklistTemplateEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateEnrolment_ChecklistTemplateAssignment");

            entity.HasOne(d => d.OriginalUserAreaFormResponse).WithMany(p => p.ChecklistTemplateEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistTemplateEnrolment_OriginalUserAreaFormResponse");

            entity.HasOne(d => d.Task).WithMany(p => p.ChecklistTemplateEnrolments).HasConstraintName("FK_ChecklistTemplateEnrolment_Task");
        });

        modelBuilder.Entity<ChecklistType>(entity =>
        {
            entity.HasKey(e => e.ChecklistTypeID).HasName("PK__Checklis__9B6F966C8AA5E7D3");

            entity.Property(e => e.ChecklistTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ChecklistViewResponseUser>(entity =>
        {
            entity.HasKey(e => e.ChecklistViewResponseUserID).HasName("PK__Checklis__3BE5EFD9B45799C2");

            entity.HasOne(d => d.Checklist).WithMany(p => p.ChecklistViewResponseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistViewResponseUser_Checklist");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ChecklistViewResponseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistViewResponseUser_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.ChecklistViewResponseUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChecklistViewResponseUser_User");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyID).HasName("PK__Company__2D971C4C81FC5DE7");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CompanyArchivedByUsers).HasConstraintName("FK_Company_ArchivedByUserID");

            entity.HasOne(d => d.CompanyStatus).WithMany(p => p.Companies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_CompanyStatusID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CompanyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_CreatedByUserID");

            entity.HasOne(d => d.MainActivityType).WithMany(p => p.Companies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_MainActivityTypeID");

            entity.HasOne(d => d.MainIndustryType).WithMany(p => p.Companies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_MainIndustryTypeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CompanyModifiedByUsers).HasConstraintName("FK_Company_ModifiedByUserID");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.Companies).HasConstraintName("FK_Company_OrgGroupID");

            entity.HasOne(d => d.SubActivityType).WithMany(p => p.Companies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_SubActivityTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Companies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Company_UserAreaID");
        });

        modelBuilder.Entity<CompanyInsurance>(entity =>
        {
            entity.HasKey(e => e.CompanyInsuranceID).HasName("PK__CompanyI__4478D90B28A388DD");

            entity.HasOne(d => d.Company).WithMany(p => p.CompanyInsurances)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyInsurance_CompanyID");
        });

        modelBuilder.Entity<CompanyStatus>(entity =>
        {
            entity.HasKey(e => e.CompanyStatusID).HasName("PK__CompanyS__2104C36EA6DEB914");

            entity.Property(e => e.CompanyStatusID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Competency>(entity =>
        {
            entity.HasKey(e => e.CompetencyID).HasName("PK__Competen__71F4116136F2961F");

            entity.Property(e => e.IsGlobal).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CompetencyArchivedByUsers).HasConstraintName("FK_Competency_ArchivedBy");

            entity.HasOne(d => d.Category).WithMany(p => p.Competencies).HasConstraintName("FK_Competency_Category");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CompetencyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Competency_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CompetencyModifiedByUsers).HasConstraintName("FK_Competency_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Competencies).HasConstraintName("FK_Competency_UserArea");
        });

        modelBuilder.Entity<ComplianceScoreLabelType>(entity =>
        {
            entity.HasKey(e => e.ComplianceScoreLabelTypeID).HasName("PK__Complian__6987215621383AA5");

            entity.Property(e => e.ComplianceScoreLabelTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ComplianceScoreType).WithMany(p => p.ComplianceScoreLabelTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ComplianceScoreLabelType_ComplianceScoreType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ComplianceScoreLabelTypes).HasConstraintName("FK_ComplianceScoreLabelType_UserArea");
        });

        modelBuilder.Entity<ComplianceScoreType>(entity =>
        {
            entity.HasKey(e => e.ComplianceScoreTypeID).HasName("PK__Complian__741BDEB2441BDAB1");

            entity.Property(e => e.ComplianceScoreTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ConfigurationType>(entity =>
        {
            entity.HasKey(e => e.ConfigurationTypeID).HasName("PK__Configur__BF045A25E6CD108E");

            entity.Property(e => e.ConfigurationTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ConformityType>(entity =>
        {
            entity.HasKey(e => e.ConformityTypeID).HasName("PK__Conformi__DD04104B1ED66182");

            entity.Property(e => e.ConformityTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ConformityTypeArchivedByUsers).HasConstraintName("FK_ConformityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ConformityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ConformityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ConformityTypeModifiedByUsers).HasConstraintName("FK_ConformityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ConformityTypes).HasConstraintName("FK_ConformityType_UserArea");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.ContactID).HasName("PK__Contact__5C6625BB1EBF998E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContactArchivedByUsers).HasConstraintName("FK_Contact_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContactCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contact_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.Contacts).HasConstraintName("FK_Contact_Employee");

            entity.HasOne(d => d.HomeAddress).WithMany(p => p.Contacts).HasConstraintName("FK_Contact_Address");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContactModifiedByUsers).HasConstraintName("FK_Contact_ModifiedBy");

            entity.HasOne(d => d.PersonTitleType).WithMany(p => p.Contacts).HasConstraintName("FK_Contact_PersonTitleType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Contacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contact_UserAreaID");
        });

        modelBuilder.Entity<ContactAttachment>(entity =>
        {
            entity.HasKey(e => e.ContactAttachmentID).HasName("PK__ContactA__035A03EA9339ACAB");

            entity.HasOne(d => d.Attachment).WithMany(p => p.ContactAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactAttachment_Attachment");

            entity.HasOne(d => d.Contact).WithMany(p => p.ContactAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactAttachment_Contact");
        });

        modelBuilder.Entity<ContactContactType>(entity =>
        {
            entity.HasKey(e => e.ContactContactTypeID).HasName("PK__ContactC__347AE696B31AD58C");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContactContactTypeArchivedByUsers).HasConstraintName("FK_ContactContactType_ArchivedBy");

            entity.HasOne(d => d.Contact).WithMany(p => p.ContactContactTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactContactType_Contact");

            entity.HasOne(d => d.ContactType).WithMany(p => p.ContactContactTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactContactType_ContactType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContactContactTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactContactType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContactContactTypeModifiedByUsers).HasConstraintName("FK_ContactContactType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContactContactTypes).HasConstraintName("FK_ContactContactType_UserArea");
        });

        modelBuilder.Entity<ContactType>(entity =>
        {
            entity.HasKey(e => e.ContactTypeID).HasName("PK__ContactT__17E1EE72CB0FEB19");

            entity.Property(e => e.ContactTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContactTypeArchivedByUsers).HasConstraintName("FK_ContactType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContactTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContactType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContactTypeModifiedByUsers).HasConstraintName("FK_ContactType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContactTypes).HasConstraintName("FK_ContactType_UserArea");
        });

        modelBuilder.Entity<ContextHelpText>(entity =>
        {
            entity.HasKey(e => e.ContextHelpTextID).HasName("PK__ContextH__0C5118E98599DAB2");

            entity.Property(e => e.IsLive).HasDefaultValue(true);
            entity.Property(e => e.UseIntroJS).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContextHelpTextArchivedByUsers).HasConstraintName("FK_ContextHelpText_ArchivedByUserID");

            entity.HasOne(d => d.ContextHelpTextStory).WithMany(p => p.ContextHelpTexts).HasConstraintName("FK_ContextHelpText_ContextHelpTextStory");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContextHelpTextCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContextHelpText_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContextHelpTextModifiedByUsers).HasConstraintName("FK_ContextHelpText_ModifiedByUserID");
        });

        modelBuilder.Entity<ContextHelpTextStory>(entity =>
        {
            entity.HasKey(e => e.ContextHelpTextStoryID).HasName("PK__ContextH__169E9E1E06DD39AD");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContextHelpTextStoryArchivedByUsers).HasConstraintName("FK_ContextHelpTextStory_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContextHelpTextStoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContextHelpTextStory_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContextHelpTextStoryModifiedByUsers).HasConstraintName("FK_ContextHelpTextStory_ModifiedByUserID");
        });

        modelBuilder.Entity<Contractor>(entity =>
        {
            entity.HasKey(e => e.ContractorID).HasName("PK__Contract__E964EB5D9EA65179");

            entity.Property(e => e.CertificationLevel).HasDefaultValue("Standard");
            entity.Property(e => e.Country).HasDefaultValue("United States");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Status).HasDefaultValue("Active");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorArchivedByUsers).HasConstraintName("FK_Contractor_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contractor_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorModifiedByUsers).HasConstraintName("FK_Contractor_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Contractors)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contractor_UserArea");
        });

        modelBuilder.Entity<ContractorCategory>(entity =>
        {
            entity.HasKey(e => e.ContractorCategoryID).HasName("PK__Contract__4B6BB87429E088D9");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCategories).HasConstraintName("FK_ContractorCategory_UserArea");
        });

        modelBuilder.Entity<ContractorCompany>(entity =>
        {
            entity.HasKey(e => e.ContractorCompanyID).HasName("PK__Contract__9AC056CA8C55EE51");

            entity.HasOne(d => d.Address).WithMany(p => p.ContractorCompanies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompany_Address");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorCompanyArchivedByUsers).HasConstraintName("FK_ContractorCompany_ArchivedBy");

            entity.HasOne(d => d.CompletedQuestionnaireResponse).WithMany(p => p.ContractorCompanies).HasConstraintName("FK_ContractorCompany_QuestionnaireResponse");

            entity.HasOne(d => d.ContractorCategory).WithMany(p => p.ContractorCompanies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompany_ContractorCategory");

            entity.HasOne(d => d.ContractorType).WithMany(p => p.ContractorCompanies).HasConstraintName("FK_ContractorCompany_ContractorType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCompanyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompany_CreatedBy");

            entity.HasOne(d => d.DefaultChecklist).WithMany(p => p.ContractorCompanies).HasConstraintName("FK_ContractorCompany_Checklist");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorCompanyModifiedByUsers).HasConstraintName("FK_ContractorCompany_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCompanies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompany_UserArea");
        });

        modelBuilder.Entity<ContractorCompanyApprovalLog>(entity =>
        {
            entity.HasKey(e => e.ContractorCompanyApprovalLogID).HasName("PK__Contract__9B5893A152EA7AA0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorCompanyApprovalLogArchivedByUsers).HasConstraintName("FK_ContractorCompanyApprovalLog_ArchivedBy");

            entity.HasOne(d => d.ChecklistEnrolment).WithMany(p => p.ContractorCompanyApprovalLogs).HasConstraintName("FK_ContractorCompanyApprovalLog_ChecklistEnrolment");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorCompanyApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyApprovalLog_ContractorCompany");

            entity.HasOne(d => d.ContractorCompetency).WithMany(p => p.ContractorCompanyApprovalLogs).HasConstraintName("FK_ContractorCompanyApprovalLog_ContractorCompetency");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCompanyApprovalLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyApprovalLog_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorCompanyApprovalLogModifiedByUsers).HasConstraintName("FK_ContractorCompanyApprovalLog_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCompanyApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyApprovalLog_UserArea");
        });

        modelBuilder.Entity<ContractorCompanyAttachment>(entity =>
        {
            entity.HasKey(e => e.ContractorCompanyAttachmentID).HasName("PK__Contract__1F62525444CCE3F7");

            entity.HasOne(d => d.Attachment).WithMany(p => p.ContractorCompanyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyAttachment_Attachment");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorCompanyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyAttachment_ContractorCompany");
        });

        modelBuilder.Entity<ContractorCompanyLog>(entity =>
        {
            entity.HasKey(e => e.ContractorCompanyLogID).HasName("PK__Contract__C0F9C05077CBAF65");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorCompanyLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyLog_ContractorCompany");

            entity.HasOne(d => d.LoggedByUser).WithMany(p => p.ContractorCompanyLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyLog_User");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCompanyLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanyLog_UserArea");
        });

        modelBuilder.Entity<ContractorCompanySSIP>(entity =>
        {
            entity.HasKey(e => e.ContractorCompanySSIPID).HasName("PK__Contract__DC1CD207EE0A6B7A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorCompanySSIPArchivedByUsers).HasConstraintName("FK_ContractorCompanySSIP_ArchivedBy");

            entity.HasOne(d => d.Attachment).WithMany(p => p.ContractorCompanySSIPs).HasConstraintName("FK_ContractorCompanySSIP_Attachment");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorCompanySSIPs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanySSIP_ContractorCompany");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCompanySSIPCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanySSIP_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorCompanySSIPModifiedByUsers).HasConstraintName("FK_ContractorCompanySSIP_ModifiedBy");

            entity.HasOne(d => d.SSIP).WithMany(p => p.ContractorCompanySSIPs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompanySSIP_SSIP");
        });

        modelBuilder.Entity<ContractorCompetency>(entity =>
        {
            entity.HasKey(e => e.ContractorCompetencyID).HasName("PK__Contract__DBFE3F87CFFE370E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorCompetencyArchivedByUsers).HasConstraintName("FK_ContractorCompetency_ArchivedBy");

            entity.HasOne(d => d.Competency).WithMany(p => p.ContractorCompetencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetency_Comptency");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorCompetencies).HasConstraintName("FK_ContractorCompetency_ContractorCompany");

            entity.HasOne(d => d.ContractorCompetencyStatusType).WithMany(p => p.ContractorCompetencies).HasConstraintName("FK_ContractorCompetency_ContractorCompetencyStatusType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCompetencyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetency_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.ContractorCompetencies).HasConstraintName("FK_ContractorCompetency_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorCompetencyModifiedByUsers).HasConstraintName("FK_ContractorCompetency_ModifiedBy");

            entity.HasOne(d => d.TemplateContractorCompetency).WithMany(p => p.InverseTemplateContractorCompetency).HasConstraintName("FK_ContractorCompetency_TemplateContractorCompetency");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCompetencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetency_UserArea");
        });

        modelBuilder.Entity<ContractorCompetencyAttachment>(entity =>
        {
            entity.HasKey(e => e.ContractorCompetencyAttachmentID).HasName("PK__Contract__213207ABF688FAD2");

            entity.HasOne(d => d.Attachment).WithMany(p => p.ContractorCompetencyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetencyAttachment_Attachment");

            entity.HasOne(d => d.ContractorCompetency).WithMany(p => p.ContractorCompetencyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetencyAttachment_ContractorCompetency");
        });

        modelBuilder.Entity<ContractorCompetencyNote>(entity =>
        {
            entity.HasKey(e => e.ContractorCompetencyNoteID).HasName("PK__Contract__67DF031E93CBF677");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorCompetencyNoteArchivedByUsers).HasConstraintName("FK_ContractorCompetencyNote_ArchivedByUserID");

            entity.HasOne(d => d.ContractorCompetency).WithMany(p => p.ContractorCompetencyNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetencyNote_AccidentCase");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorCompetencyNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompetencyNote_CreatedByUserID");
        });

        modelBuilder.Entity<ContractorCompetencyStatusType>(entity =>
        {
            entity.HasKey(e => e.ContractorCompetencyStatusTypeID).HasName("PK__Contract__6C9E28A61C455575");

            entity.Property(e => e.ContractorCompetencyStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ContractorCompliance>(entity =>
        {
            entity.HasKey(e => e.ComplianceID).HasName("PK__Contract__C87E5C82C88D408B");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorCompliances)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorCompliance_UserArea");
        });

        modelBuilder.Entity<ContractorRegister>(entity =>
        {
            entity.HasKey(e => e.ContractorRegisterID).HasName("PK__Contract__CFB149709E257EC6");

            entity.Property(e => e.IsLatest).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorRegisterArchivedByUsers).HasConstraintName("FK_ContractorRegister_ArchivedBy");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorRegisters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorRegister_ContractorCompany");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorRegisterCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorRegister_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.ContractorRegisters).HasConstraintName("FK_ContractorRegister_Employee");

            entity.HasOne(d => d.Location).WithMany(p => p.ContractorRegisters).HasConstraintName("FK_ContractorRegister_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorRegisterModifiedByUsers).HasConstraintName("FK_ContractorRegister_ModifiedBy");
        });

        modelBuilder.Entity<ContractorSiteAccess>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessID).HasName("PK__Contract__43C041207D3356E6");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorSiteAccessArchivedByUsers).HasConstraintName("FK_ContractorSiteAccess_ArchivedBy");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.ContractorSiteAccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccess_ContractorCompany");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorSiteAccessCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccess_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorSiteAccessModifiedByUsers).HasConstraintName("FK_ContractorSiteAccess_ModifiedBy");

            entity.HasOne(d => d.SiteLocation).WithMany(p => p.ContractorSiteAccesses).HasConstraintName("FK_ContractorSiteAccess_Location");

            entity.HasOne(d => d.SiteUserArea).WithMany(p => p.ContractorSiteAccesses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccess_UserArea");
        });

        modelBuilder.Entity<ContractorSiteAccessAttachment>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessAttachmentID).HasName("PK__Contract__982AE16D5B41F9F3");

            entity.HasOne(d => d.ContractorCompanyAttachment).WithMany(p => p.ContractorSiteAccessAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessAttachment_ContractorCompanyAttachment");

            entity.HasOne(d => d.ContractorSiteAccess).WithMany(p => p.ContractorSiteAccessAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessAttachment_ContractorSiteAccess");

            entity.HasOne(d => d.LinkedByUser).WithMany(p => p.ContractorSiteAccessAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessAttachment_LinkedBy");
        });

        modelBuilder.Entity<ContractorSiteAccessPersonnel>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessPersonnelID).HasName("PK__Contract__A95736E6FBEA6BA8");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorSiteAccessPersonnelArchivedByUsers).HasConstraintName("FK_ContractorSiteAccessPersonnel_ArchivedBy");

            entity.HasOne(d => d.ContractorSiteAccess).WithMany(p => p.ContractorSiteAccessPersonnel)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessPersonnel_ContractorSiteAccess");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorSiteAccessPersonnelCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessPersonnel_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.ContractorSiteAccessPersonnel).HasConstraintName("FK_ContractorSiteAccessPersonnel_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorSiteAccessPersonnelModifiedByUsers).HasConstraintName("FK_ContractorSiteAccessPersonnel_ModifiedBy");
        });

        modelBuilder.Entity<ContractorSiteAccessRequirement>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessRequirementID).HasName("PK__Contract__BD6EBF18CED21C8A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorSiteAccessRequirementArchivedByUsers).HasConstraintName("FK_ContractorSiteAccessRequirement_ArchivedBy");

            entity.HasOne(d => d.ContractorSiteAccessAttachment).WithMany(p => p.ContractorSiteAccessRequirements).HasConstraintName("FK_ContractorSiteAccessRequirement_ContractorSiteAccessAttachment");

            entity.HasOne(d => d.ContractorSiteAccess).WithMany(p => p.ContractorSiteAccessRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessRequirement_ContractorSiteAccess");

            entity.HasOne(d => d.ContractorSiteAccessPersonnel).WithMany(p => p.ContractorSiteAccessRequirements).HasConstraintName("FK_ContractorSiteAccessRequirement_ContractorSiteAccessPersonnel");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorSiteAccessRequirementCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessRequirement_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorSiteAccessRequirementModifiedByUsers).HasConstraintName("FK_ContractorSiteAccessRequirement_ModifiedBy");

            entity.HasOne(d => d.Task).WithMany(p => p.ContractorSiteAccessRequirements).HasConstraintName("FK_ContractorSiteAccessRequirement_Task");

            entity.HasOne(d => d.UserAreaFormResponse).WithMany(p => p.ContractorSiteAccessRequirements).HasConstraintName("FK_ContractorSiteAccessRequirement_UserAreaFormResponse");
        });

        modelBuilder.Entity<ContractorSiteAccessSignOff>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessSignOffID).HasName("PK__Contract__E08F7172910BEC07");

            entity.HasOne(d => d.ContractorSiteAccess).WithMany(p => p.ContractorSiteAccessSignOffs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessSignOff_ContractorSiteAccess");

            entity.HasOne(d => d.ContractorSiteAccessRequirement).WithMany(p => p.ContractorSiteAccessSignOffs).HasConstraintName("FK_ContractorSiteAccessSignOff_ContractorSiteAccessRequirement");

            entity.HasOne(d => d.LoggedInUser).WithMany(p => p.ContractorSiteAccessSignOffs).HasConstraintName("FK_ContractorSiteAccessSignOff_LoggedInUser");
        });

        modelBuilder.Entity<ContractorSiteAccessStatus>(entity =>
        {
            entity.HasKey(e => e.ContractorSiteAccessStatusID).HasName("PK__Contract__84AABCFC40F59F7C");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorSiteAccessStatusArchivedByUsers).HasConstraintName("FK_ContractorSiteAccessStatus_ArchivedBy");

            entity.HasOne(d => d.ContractorSiteAccess).WithMany(p => p.ContractorSiteAccessStatuses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessStatus_ContractorSiteAccess");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorSiteAccessStatusCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessStatus_CreatedBy");

            entity.HasOne(d => d.GenericStatusType).WithMany(p => p.ContractorSiteAccessStatuses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorSiteAccessStatus_GenericStatusType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorSiteAccessStatusModifiedByUsers).HasConstraintName("FK_ContractorSiteAccessStatus_ModifiedBy");
        });

        modelBuilder.Entity<ContractorType>(entity =>
        {
            entity.HasKey(e => e.ContractorTypeID).HasName("PK__Contract__ED890E6D0AF443E1");

            entity.Property(e => e.ContractorTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ContractorTypeArchivedByUsers).HasConstraintName("FK_ContractorType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ContractorTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ContractorType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ContractorTypeModifiedByUsers).HasConstraintName("FK_ContractorType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ContractorTypes).HasConstraintName("FK_ContractorType_UserArea");
        });

        modelBuilder.Entity<ControlMeasure>(entity =>
        {
            entity.HasKey(e => e.ControlMeasureID).HasName("PK__ControlM__66D82E90F8DBDC8D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ControlMeasureType).WithMany(p => p.ControlMeasures).HasConstraintName("FK_ControlMeasure_Type");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ControlMeasures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ControlMeasure_UserArea");
        });

        modelBuilder.Entity<ControlMeasureType>(entity =>
        {
            entity.HasKey(e => e.ControlMeasureTypeID).HasName("PK__ControlM__E6EDBDA6BAA4610B");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.ControlMeasureTypes).HasConstraintName("FK_ControlMeasureType_UserArea");
        });

        modelBuilder.Entity<CopyUserAreaDatum>(entity =>
        {
            entity.HasKey(e => e.CopyUserAreaDataID).HasName("PK__CopyUser__153B5873FB46D8ED");
        });

        modelBuilder.Entity<CopyUserAreaEmployee>(entity =>
        {
            entity.HasKey(e => e.CopyUserAreaEmployeeID).HasName("PK__CopyUser__356827F9D6F5A44F");
        });

        modelBuilder.Entity<CopyUserAreaUser>(entity =>
        {
            entity.HasKey(e => e.CopyUserAreaUserID).HasName("PK__CopyUser__07E0AF17362434F1");
        });

        modelBuilder.Entity<CostSheet>(entity =>
        {
            entity.HasKey(e => e.CostSheetID).HasName("PK__CostShee__18138A885CC00828");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.CostSheets)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheet_AccidentCase");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CostSheetArchivedByUsers).HasConstraintName("FK_CostSheet_ArchivedBy");

            entity.HasOne(d => d.CostToReputationType).WithMany(p => p.CostSheets)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheet_CostToReputationType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CostSheetCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheet_CreatedBy");

            entity.HasOne(d => d.CurrencyType).WithMany(p => p.CostSheets).HasConstraintName("FK_CostSheet_CurrencyType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CostSheetModifiedByUsers).HasConstraintName("FK_CostSheet_ModifiedBy");
        });

        modelBuilder.Entity<CostSheetCostType>(entity =>
        {
            entity.HasKey(e => e.CostSheetCostTypeID).HasName("PK__CostShee__F1542F68E60678AA");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CostSheetCostTypeArchivedByUsers).HasConstraintName("FK_CostSheetCostType_ArchivedBy");

            entity.HasOne(d => d.CostSheet).WithMany(p => p.CostSheetCostTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheetCostType_CostSheet");

            entity.HasOne(d => d.CostType).WithMany(p => p.CostSheetCostTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheetCostType_CostType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CostSheetCostTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostSheetCostType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CostSheetCostTypeModifiedByUsers).HasConstraintName("FK_CostSheetCostType_ModifiedBy");
        });

        modelBuilder.Entity<CostToReputationType>(entity =>
        {
            entity.HasKey(e => e.CostToReputationTypeID).HasName("PK__CostToRe__1B06874223714CD6");

            entity.Property(e => e.CostToReputationTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<CostType>(entity =>
        {
            entity.HasKey(e => e.CostTypeID).HasName("PK__CostType__B31609513BEB3AE5");

            entity.Property(e => e.CostTypeID).ValueGeneratedNever();
            entity.Property(e => e.OrderNum).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CostTypeArchivedByUsers).HasConstraintName("FK_CostType_ArchivedBy");

            entity.HasOne(d => d.CostUnitType).WithMany(p => p.CostTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostType_CostUnitType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CostTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CostTypeModifiedByUsers).HasConstraintName("FK_CostType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CostTypes).HasConstraintName("FK_CostType_UserArea");
        });

        modelBuilder.Entity<CostUnitType>(entity =>
        {
            entity.HasKey(e => e.CostUnitTypeID).HasName("PK__CostUnit__DFEAE5251E009B24");

            entity.Property(e => e.CostUnitTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CostUnitTypeArchivedByUsers).HasConstraintName("FK_CostUnitType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CostUnitTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CostUnitType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CostUnitTypeModifiedByUsers).HasConstraintName("FK_CostUnitType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CostUnitTypes).HasConstraintName("FK_CostUnitType_UserArea");
        });

        modelBuilder.Entity<Counsel>(entity =>
        {
            entity.HasKey(e => e.CounselID).HasName("PK__Counsel__DC12E7A6AD2DFAEF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CounselArchivedByUsers).HasConstraintName("FK_Counsel_ArchivedByUser");

            entity.HasOne(d => d.CounselChamber).WithMany(p => p.Counsels).HasConstraintName("FK_Counsel_CounselChamber");

            entity.HasOne(d => d.CounselEmployee).WithMany(p => p.Counsels)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Counsel_Employee");

            entity.HasOne(d => d.CounselUser).WithMany(p => p.CounselCounselUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Counsel_User");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CounselCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Counsel_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CounselModifiedByUsers).HasConstraintName("FK_Counsel_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Counsels)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Counsel_UserArea");
        });

        modelBuilder.Entity<CounselChamber>(entity =>
        {
            entity.HasKey(e => e.CounselChamberID).HasName("PK__CounselC__C2742C5406C7AAB9");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CounselChamberArchivedByUsers).HasConstraintName("FK_CounselChamber_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CounselChamberCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CounselChamber_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CounselChamberModifiedByUsers).HasConstraintName("FK_CounselChamber_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CounselChambers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CounselChamber_UserArea");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.CountryID).HasName("PK__Country__10D160BF200AAC77");

            entity.Property(e => e.CountryID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseID).HasName("PK__Course__C92D7187FB3D2FBA");

            entity.Property(e => e.ContentType).HasDefaultValue("Internal");
            entity.Property(e => e.Cost).HasDefaultValue(0m);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Currency).HasDefaultValue("USD");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsMandatory).HasDefaultValue(false);
            entity.Property(e => e.MaxAttempts).HasDefaultValue(3);
            entity.Property(e => e.Status).HasDefaultValue("Draft");

            entity.HasOne(d => d.CourseCategory).WithMany(p => p.Courses).HasConstraintName("FK_Course_CourseCategory");

            entity.HasOne(d => d.CourseType).WithMany(p => p.Courses).HasConstraintName("FK_Course_CourseType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Courses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Course_UserArea");
        });

        modelBuilder.Entity<CourseAllocation>(entity =>
        {
            entity.HasKey(e => e.CourseAllocationID).HasName("PK__CourseAl__A04C3E4648817460");

            entity.Property(e => e.AllocationDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.AutoEnrol).HasDefaultValue(true);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsMandatory).HasDefaultValue(true);
            entity.Property(e => e.IsRecurring).HasDefaultValue(false);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseAllocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAllocation_Course");

            entity.HasOne(d => d.Location).WithMany(p => p.CourseAllocations).HasConstraintName("FK_CourseAllocation_Location");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.CourseAllocations).HasConstraintName("FK_CourseAllocation_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseAllocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAllocation_UserArea");
        });

        modelBuilder.Entity<CourseAssignment>(entity =>
        {
            entity.HasKey(e => e.CourseAssignmentID).HasName("PK__CourseAs__32BC487FC2642861");

            entity.Property(e => e.AssignmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Priority).HasDefaultValue("Normal");
            entity.Property(e => e.Status).HasDefaultValue("Assigned");

            entity.HasOne(d => d.AssignedByUser).WithMany(p => p.CourseAssignmentAssignedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAssignment_AssignedBy");

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.CourseAssignmentAssignedToUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAssignment_AssignedTo");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAssignment_Course");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAssignment_UserArea");
        });

        modelBuilder.Entity<CourseAttachment>(entity =>
        {
            entity.HasKey(e => e.CourseAttachmentID).HasName("PK__CourseAt__AA461E3CE61C8A90");

            entity.Property(e => e.AttachmentType).HasDefaultValue("Resource");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsRequired).HasDefaultValue(false);
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Attachment).WithMany(p => p.CourseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAttachment_Attachment");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAttachment_Course");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAttachment_UserArea");
        });

        modelBuilder.Entity<CourseBundle>(entity =>
        {
            entity.HasKey(e => e.CourseBundleID).HasName("PK__CourseBu__D0C7D2A97B21776D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DiscountPercentage).HasDefaultValue(0m);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.TotalCost).HasDefaultValue(0m);

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseBundles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseBundle_UserArea");
        });

        modelBuilder.Entity<CourseBundleCourse>(entity =>
        {
            entity.HasKey(e => e.CourseBundleCourseID).HasName("PK__CourseBu__3F33DADFD65D08D0");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsMandatory).HasDefaultValue(true);
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.CourseBundle).WithMany(p => p.CourseBundleCourses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseBundleCourse_Bundle");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseBundleCourses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseBundleCourse_Course");
        });

        modelBuilder.Entity<CourseBundleFilter>(entity =>
        {
            entity.HasKey(e => e.CourseBundleFilterID).HasName("PK__CourseBu__B15CCB066860EC3E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CourseBundleFilterArchivedByUsers).HasConstraintName("FK_CourseBundleFilter_ArchivedBy");

            entity.HasOne(d => d.CourseBundle).WithMany(p => p.CourseBundleFilters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseBundleFilter_CourseBundle");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CourseBundleFilterCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseBundleFilter_CreatedBy");

            entity.HasOne(d => d.JobRole).WithMany(p => p.CourseBundleFilters).HasConstraintName("FK_CourseBundleFilter_JobRole");

            entity.HasOne(d => d.Location).WithMany(p => p.CourseBundleFilters).HasConstraintName("FK_CourseBundleFilter_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CourseBundleFilterModifiedByUsers).HasConstraintName("FK_CourseBundleFilter_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.CourseBundleFilters).HasConstraintName("FK_CourseBundleFilter_OrgGroup");
        });

        modelBuilder.Entity<CourseCategory>(entity =>
        {
            entity.HasKey(e => e.CourseCategoryID).HasName("PK__CourseCa__4D67EBD681254074");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(0);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory).HasConstraintName("FK_CourseCategory_Parent");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseCategory_UserArea");
        });

        modelBuilder.Entity<CourseCertificate>(entity =>
        {
            entity.HasKey(e => e.CourseCertificateID).HasName("PK__CourseCe__ECCE50D79ED8348A");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IssuedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.CourseEnrolment).WithMany(p => p.CourseCertificates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseCertificate_Enrolment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseCertificates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseCertificate_UserArea");
        });

        modelBuilder.Entity<CourseEnrollment>(entity =>
        {
            entity.HasKey(e => e.CourseEnrollmentID).HasName("PK__CourseEn__E31874EDC820EB64");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CourseEnrollmentArchivedByUsers).HasConstraintName("FK_CourseEnrollment_ArchivedBy");

            entity.HasOne(d => d.AssessorEmployee).WithMany(p => p.CourseEnrollments).HasConstraintName("FK_CourseEnrolment_AssessorEmployeeID");

            entity.HasOne(d => d.CourseAssignment).WithMany(p => p.CourseEnrollments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollment_CourseAssignmentID");

            entity.HasOne(d => d.CourseEnrolmentStatusType).WithMany(p => p.CourseEnrollments).HasConstraintName("FK_CourseEnrolment_CourseEnrolmentStatusTypeID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CourseEnrollmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollment_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CourseEnrollmentModifiedByUsers).HasConstraintName("FK_CourseEnrollment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseEnrollments).HasConstraintName("FK_CourseEnrolment_UserAreaID");
        });

        modelBuilder.Entity<CourseEnrollmentQuestionnaire>(entity =>
        {
            entity.HasKey(e => e.CourseEnrollmentQuestionnaireID).HasName("PK__CourseEn__015B157D4E2BCAE1");

            entity.HasOne(d => d.CourseEnrollment).WithMany(p => p.CourseEnrollmentQuestionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollmentQuestionnaire_CourseEnrollmentID");

            entity.HasOne(d => d.Questionnaire).WithMany(p => p.CourseEnrollmentQuestionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrollmentQuestionnaire_QuestionnaireID");
        });

        modelBuilder.Entity<CourseEnrolment>(entity =>
        {
            entity.HasKey(e => e.CourseEnrolmentID).HasName("PK__CourseEn__D26508C393025517");

            entity.Property(e => e.AttemptCount).HasDefaultValue(0);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.EnrolmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.EnrolmentType).HasDefaultValue("Manual");
            entity.Property(e => e.ProgressPercentage).HasDefaultValue(0m);
            entity.Property(e => e.TotalTimeMinutes).HasDefaultValue(0);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolment_Course");

            entity.HasOne(d => d.EnrolmentStatus).WithMany(p => p.CourseEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolment_Status");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolment_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.CourseEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolment_User");
        });

        modelBuilder.Entity<CourseEnrolmentQuestionnaire>(entity =>
        {
            entity.HasKey(e => e.CourseEnrolmentQuestionnaireID).HasName("PK__CourseEn__8DEA76C2C8DB1D28");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.StartDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.TimeSpentMinutes).HasDefaultValue(0);

            entity.HasOne(d => d.CourseEnrolment).WithMany(p => p.CourseEnrolmentQuestionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentQuestionnaire_Enrolment");

            entity.HasOne(d => d.CourseQuestionaire).WithMany(p => p.CourseEnrolmentQuestionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentQuestionnaire_Questionnaire");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseEnrolmentQuestionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentQuestionnaire_UserArea");
        });

        modelBuilder.Entity<CourseEnrolmentSCORMActivity>(entity =>
        {
            entity.HasKey(e => e.CourseEnrolmentSCORMActivityID).HasName("PK__CourseEn__738566BECEDF7BE8");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.CourseEnrolment).WithMany(p => p.CourseEnrolmentSCORMActivities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentSCORMActivity_Enrolment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseEnrolmentSCORMActivities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentSCORMActivity_UserArea");
        });

        modelBuilder.Entity<CourseEnrolmentSignature>(entity =>
        {
            entity.HasKey(e => e.CourseEnrolmentSignatureID).HasName("PK__CourseEn__6EE1ACCB4723246F");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.SignatureType).HasDefaultValue("Completion");
            entity.Property(e => e.SignedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.CourseEnrolment).WithMany(p => p.CourseEnrolmentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentSignature_Enrolment");

            entity.HasOne(d => d.SignedByUser).WithMany(p => p.CourseEnrolmentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentSignature_SignedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseEnrolmentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseEnrolmentSignature_UserArea");
        });

        modelBuilder.Entity<CourseEnrolmentStatusType>(entity =>
        {
            entity.HasKey(e => e.CourseEnrolmentStatusTypeID).HasName("PK__CourseEn__546F042CF437AE7E");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<CourseFilter>(entity =>
        {
            entity.HasKey(e => e.CourseFilterID).HasName("PK__CourseFi__3CAC98845B2F6AAD");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseFilters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseFilter_UserArea");
        });

        modelBuilder.Entity<CourseQuestionaire>(entity =>
        {
            entity.HasKey(e => e.CourseQuestionaireID).HasName("PK__CourseQu__2AE486EFEF6B98D6");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsMandatory).HasDefaultValue(true);
            entity.Property(e => e.QuestionnaireType).HasDefaultValue("Assessment");
            entity.Property(e => e.RandomizeQuestions).HasDefaultValue(false);
            entity.Property(e => e.ShowResults).HasDefaultValue(true);
            entity.Property(e => e.TotalQuestions).HasDefaultValue(0);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseQuestionaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseQuestionaire_Course");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CourseQuestionaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseQuestionaire_UserArea");
        });

        modelBuilder.Entity<CourseType>(entity =>
        {
            entity.HasKey(e => e.CourseTypeID).HasName("PK__CourseTy__8173695244E5789A");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<CurrencyType>(entity =>
        {
            entity.HasKey(e => e.CurrencyTypeID).HasName("PK__Currency__1DD4BB1E02C7266F");

            entity.Property(e => e.CurrencyTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CurrencyTypeArchivedByUsers).HasConstraintName("FK_CurrencyType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CurrencyTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CurrencyType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CurrencyTypeModifiedByUsers).HasConstraintName("FK_CurrencyType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.CurrencyTypes).HasConstraintName("FK_CurrencyType_UserArea");
        });

        modelBuilder.Entity<CustomPermission>(entity =>
        {
            entity.HasKey(e => e.CustomPermissionID).HasName("PK__CustomPe__39439FA29A710530");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CustomPermissionArchivedByUsers).HasConstraintName("FK_CustomPermission_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CustomPermissionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomPermission_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CustomPermissionModifiedByUsers).HasConstraintName("FK_CustomPermission_ModifiedByUser");

            entity.HasOne(d => d.Permission).WithMany(p => p.CustomPermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomPermission_Permission");

            entity.HasOne(d => d.Role).WithMany(p => p.CustomPermissions).HasConstraintName("FK_CustomPermission_Role");

            entity.HasOne(d => d.User).WithMany(p => p.CustomPermissionUsers).HasConstraintName("FK_CustomPermission_User");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerID).HasName("PK__Customer__A4AE64B82800C732");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.CustomerArchivedByUsers).HasConstraintName("FK_Customer_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.CustomerCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Customer_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.CustomerModifiedByUsers).HasConstraintName("FK_Customer_ModifiedByUserID");
        });

        modelBuilder.Entity<DSECase>(entity =>
        {
            entity.HasKey(e => e.DSECaseID).HasName("PK__DSECase__E2A56BFB870BF722");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DSECaseArchivedByUsers).HasConstraintName("FK_DSECase_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DSECaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECase_CreatedByUser");

            entity.HasOne(d => d.DSECaseStatusType).WithMany(p => p.DSECases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECase_DSECaseStatusType");

            entity.HasOne(d => d.DSECaseType).WithMany(p => p.DSECases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECase_DSECaseType");

            entity.HasOne(d => d.Employee).WithMany(p => p.DSECases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECase_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DSECaseModifiedByUsers).HasConstraintName("FK_DSECase_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DSECases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECase_UserArea");
        });

        modelBuilder.Entity<DSECaseAttachment>(entity =>
        {
            entity.HasKey(e => e.DSECaseAttachmentID).HasName("PK__DSECaseA__46A1C909E027F362");

            entity.HasOne(d => d.DSECase).WithMany(p => p.DSECaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECaseAttachment_DSECase");
        });

        modelBuilder.Entity<DSECaseNote>(entity =>
        {
            entity.HasKey(e => e.DSECaseNoteID).HasName("PK__DSECaseN__6C7AA331AB6D5C37");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DSECaseNoteArchivedByUsers).HasConstraintName("FK_DSECaseNote_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DSECaseNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECaseNote_CreatedByUser");

            entity.HasOne(d => d.DSECase).WithMany(p => p.DSECaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSECaseNote_DSECase");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DSECaseNoteModifiedByUsers).HasConstraintName("FK_DSECaseNote_ModifiedByUser");
        });

        modelBuilder.Entity<DSECaseStatusType>(entity =>
        {
            entity.HasKey(e => e.DSECaseStatusTypeID).HasName("PK__DSECaseS__FEAC5108420B2FE0");

            entity.Property(e => e.DSECaseStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<DSECaseTask>(entity =>
        {
            entity.HasKey(e => e.DSECaseTaskID).HasName("PK__DSECaseT__56C064AB2B8A921C");

            entity.HasOne(d => d.DSECase).WithMany(p => p.DSECaseTasks).HasConstraintName("FK_DSECaseTask_DSECase");

            entity.HasOne(d => d.Task).WithMany(p => p.DSECaseTasks).HasConstraintName("FK_DSECaseTask_Tas");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DSECaseTasks).HasConstraintName("FK_DSECaseTask_UserArea");
        });

        modelBuilder.Entity<DSECaseType>(entity =>
        {
            entity.HasKey(e => e.DSECaseTypeID).HasName("PK__DSECaseT__7EA072BD33F1EC36");

            entity.Property(e => e.DSECaseTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<DSEEmployeeRelocation>(entity =>
        {
            entity.HasKey(e => e.DSEEmployeeRelocationID).HasName("PK__DSEEmplo__CA5A385BACFCD89A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DSEEmployeeRelocationArchivedByUsers).HasConstraintName("FK_DSEEmployeeRelocation_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DSEEmployeeRelocationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSEEmployeeRelocation_CreatedByUser");

            entity.HasOne(d => d.Employee).WithMany(p => p.DSEEmployeeRelocations).HasConstraintName("FK_DSEEmployeeRelocation_EmployeeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DSEEmployeeRelocationModifiedByUsers).HasConstraintName("FK_DSEEmployeeRelocation_ModifiedByUser");
        });

        modelBuilder.Entity<DangerType>(entity =>
        {
            entity.HasKey(e => e.DangerTypeID).HasName("PK__DangerTy__E819F8B028EC5547");

            entity.Property(e => e.DangerTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DangerTypeArchivedByUsers).HasConstraintName("FK_DangerType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DangerTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DangerType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DangerTypeModifiedByUsers).HasConstraintName("FK_DangerType_ModifiedBy");

            entity.HasOne(d => d.OriginalDangerType).WithMany(p => p.InverseOriginalDangerType).HasConstraintName("FK_DangerType_DangerType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DangerTypes).HasConstraintName("FK_DangerType_UserArea");
        });

        modelBuilder.Entity<DangerousOccurrenceCategoryType>(entity =>
        {
            entity.HasKey(e => e.DangerousOccurrenceCategoryTypeID).HasName("PK__Dangerou__4C93887F8A03018E");

            entity.Property(e => e.DangerousOccurrenceCategoryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DangerousOccurrenceCategoryTypeArchivedByUsers).HasConstraintName("FK_DangerousOccurrenceCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DangerousOccurrenceCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DangerousOccurrenceCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DangerousOccurrenceCategoryTypeModifiedByUsers).HasConstraintName("FK_DangerousOccurrenceCategoryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DangerousOccurrenceCategoryTypes).HasConstraintName("FK_DangerousOccurrenceCategoryType_UserArea");
        });

        modelBuilder.Entity<DangerousOccurrenceType>(entity =>
        {
            entity.HasKey(e => e.DangerousOccurrenceTypeID).HasName("PK__Dangerou__E47A933F8C2DF9ED");

            entity.Property(e => e.DangerousOccurrenceTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DangerousOccurrenceTypeArchivedByUsers).HasConstraintName("FK_DangerousOccurrenceType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DangerousOccurrenceTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DangerousOccurrenceType_CreatedBy");

            entity.HasOne(d => d.DangerousOccurrenceCategoryType).WithMany(p => p.DangerousOccurrenceTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DangerousOccurrenceType_DangerousOccurrenceCategoryType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DangerousOccurrenceTypeModifiedByUsers).HasConstraintName("FK_DangerousOccurrenceType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DangerousOccurrenceTypes).HasConstraintName("FK_DangerousOccurrenceType_UserArea");
        });

        modelBuilder.Entity<DashboardType>(entity =>
        {
            entity.HasKey(e => e.DashboardTypeID).HasName("PK__Dashboar__798283FB367B7C05");

            entity.Property(e => e.DashboardTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<DashboardUserShortcutSlot>(entity =>
        {
            entity.HasKey(e => e.DashboardUserShortcutSlotID).HasName("PK__Dashboar__4721660D3E2A40D5");

            entity.HasOne(d => d.DefaultDashboard).WithMany(p => p.DashboardUserShortcutSlots).HasConstraintName("FK_DashboardUserShortcutSlot_DefaultDashboard");

            entity.HasOne(d => d.ShortcutSystem).WithMany(p => p.DashboardUserShortcutSlots).HasConstraintName("FK_DashboardUserShortcutSlot_ShortcutSystem");

            entity.HasOne(d => d.ShortcutUserFavourite).WithMany(p => p.DashboardUserShortcutSlots).HasConstraintName("FK_DashboardUserShortcutSlot_ShortcutUserFavourite");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DashboardUserShortcutSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DashboardUserShortcutSlot_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.DashboardUserShortcutSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DashboardUserShortcutSlot_User");
        });

        modelBuilder.Entity<DataActivityLog>(entity =>
        {
            entity.HasKey(e => e.DataActivityLogID).HasName("PK__DataActi__C8A399196CF8AAE3");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DataActivityLogArchivedByUsers).HasConstraintName("FK_DataActivityLog_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DataActivityLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DataActivityLog_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DataActivityLogModifiedByUsers).HasConstraintName("FK_DataActivityLog_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DataActivityLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DataActivityLog_UserAreaID");
        });

        modelBuilder.Entity<DataStructure>(entity =>
        {
            entity.HasKey(e => e.DataStructureID).HasName("PK__DataStru__FE07944348BA2269");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DataStructureArchivedByUsers).HasConstraintName("FK_DataStructure_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DataStructureCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DataStructure_CreatedBy");

            entity.HasOne(d => d.DataStructureType).WithMany(p => p.DataStructures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DataStructure_DataStructureCategory");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DataStructureModifiedByUsers).HasConstraintName("FK_DataStructure_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DataStructures).HasConstraintName("FK_DataStructure_UserArea");
        });

        modelBuilder.Entity<DataStructureType>(entity =>
        {
            entity.HasKey(e => e.DataStructureTypeID).HasName("PK__DataStru__5671E2486E884428");
        });

        modelBuilder.Entity<DefaultDashboard>(entity =>
        {
            entity.HasKey(e => e.DefaultDashboardID).HasName("PK__DefaultD__D89515BA7E1D1EE8");

            entity.Property(e => e.TotalSlots).HasDefaultValue((byte)10);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DefaultDashboardArchivedByUsers).HasConstraintName("FK_DefaultDashboard_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DefaultDashboardCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboard_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DefaultDashboardModifiedByUsers).HasConstraintName("FK_DefaultDashboard_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DefaultDashboards)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboard_UserArea");
        });

        modelBuilder.Entity<DefaultDashboardSlot>(entity =>
        {
            entity.HasKey(e => e.DefaultDashboardSlotID).HasName("PK__DefaultD__80E19C6132EE2DE6");

            entity.HasOne(d => d.DefaultDashboard).WithMany(p => p.DefaultDashboardSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboardSlot_DefaultDashboard");

            entity.HasOne(d => d.ModuleType).WithMany(p => p.DefaultDashboardSlots)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboardSlot_ModuleType");

            entity.HasOne(d => d.ShortcutSystem).WithMany(p => p.DefaultDashboardSlots).HasConstraintName("FK_DefaultDashboardSlot_ShortcutSystem");

            entity.HasOne(d => d.ShortcutUserFavourite).WithMany(p => p.DefaultDashboardSlots).HasConstraintName("FK_DefaultDashboardSlot_ShortcutUserFavourite");
        });

        modelBuilder.Entity<DefaultDashboardUser>(entity =>
        {
            entity.HasKey(e => e.DefaultDashboardUserID).HasName("PK__DefaultD__6CDFE18393A72113");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DefaultDashboardUserCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboardUser_CreatedByUser");

            entity.HasOne(d => d.DefaultDashboard).WithMany(p => p.DefaultDashboardUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboardUser_DefaultDashboard");

            entity.HasOne(d => d.User).WithMany(p => p.DefaultDashboardUserUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DefaultDashboardUser_User");
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.DistrictID).HasName("PK__District__85FDA4A6B8F5EA58");
        });

        modelBuilder.Entity<DocPack>(entity =>
        {
            entity.HasKey(e => e.DocPackID).HasName("PK__DocPack__EAF5EED314D690EC");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocPackArchivedByUsers).HasConstraintName("FK_DocPack_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocPackCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPack_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocPackModifiedByUsers).HasConstraintName("FK_DocPack_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocPacks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPack_UserArea");
        });

        modelBuilder.Entity<DocPackItem>(entity =>
        {
            entity.HasKey(e => e.DocPackItemID).HasName("PK__DocPackI__AEA0450832FEC052");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocPackItemArchivedByUsers).HasConstraintName("FK_DocPackItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocPackItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPackItem_CreatedBy");

            entity.HasOne(d => d.DocPack).WithMany(p => p.DocPackItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPackItem_DocPack");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocPackItemModifiedByUsers).HasConstraintName("FK_DocPackItem_ModifiedBy");
        });

        modelBuilder.Entity<DocPackViewerUser>(entity =>
        {
            entity.HasKey(e => e.DocPackViewerUserID).HasName("PK__DocPackV__EB8778C213583701");

            entity.HasOne(d => d.DocPack).WithMany(p => p.DocPackViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPackViewerUser_DocPack");

            entity.HasOne(d => d.User).WithMany(p => p.DocPackViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocPackViewerUser_User");
        });

        modelBuilder.Entity<DocRegisterDocType>(entity =>
        {
            entity.HasKey(e => e.DocRegisterDocTypeID).HasName("PK__DocRegis__E62321A44C492EF8");

            entity.Property(e => e.DocRegisterDocTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.DocRegisterDocTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterDocType_DocumentLinkTableType");
        });

        modelBuilder.Entity<DocRegisterEmployee>(entity =>
        {
            entity.HasKey(e => e.DocRegisterEmployeeID).HasName("PK__DocRegis__8EE847D3486813D2");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.DocRegisterEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterEmployee_DocumentLinkTableType");

            entity.HasOne(d => d.Employee).WithMany(p => p.DocRegisterEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterEmployee_Employee");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocRegisterEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterEmployee_UserArea");
        });

        modelBuilder.Entity<DocRegisterTask>(entity =>
        {
            entity.HasKey(e => e.DocRegisterTaskID).HasName("PK__DocRegis__0006533512CD142B");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.DocRegisterTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterTask_DocumentLinkTableType");

            entity.HasOne(d => d.InductionEnrolment).WithMany(p => p.DocRegisterTasks).HasConstraintName("FK_DocRegisterTask_InductionEnrolment");

            entity.HasOne(d => d.Task).WithMany(p => p.DocRegisterTasks).HasConstraintName("FK_DocRegisterTask_Task");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocRegisterTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocRegisterTask_UserArea");
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasIndex(e => e.CreatedDate, "IX_Document_CreatedDate").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.DisplayName, "IX_Document_DisplayName").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.FolderID, "IX_Document_FolderID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.Status, "IX_Document_Status").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_Document_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DocumentType).HasDefaultValue("Attachment");
            entity.Property(e => e.PrivacyLevel).HasDefaultValue("Public");
            entity.Property(e => e.Status).HasDefaultValue("Draft");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentArchivedByUsers).HasConstraintName("FK_Document_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Document_CreatedBy");

            entity.HasOne(d => d.Folder).WithMany(p => p.Documents).HasConstraintName("FK_Document_FolderID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentModifiedByUsers).HasConstraintName("FK_Document_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Documents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Document_UserArea");
        });

        modelBuilder.Entity<DocumentAssignment>(entity =>
        {
            entity.HasIndex(e => e.AssignedToUserID, "IX_DocumentAssignment_AssignedToUserID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.BundleAssignmentID, "IX_DocumentAssignment_BundleAssignmentID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.DocumentID, "IX_DocumentAssignment_DocumentID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.DueDate, "IX_DocumentAssignment_DueDate").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.Status, "IX_DocumentAssignment_Status").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_DocumentAssignment_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Priority).HasDefaultValue("Normal");
            entity.Property(e => e.ReminderEnabled).HasDefaultValue(true);
            entity.Property(e => e.ReminderFrequencyDays).HasDefaultValue(7);
            entity.Property(e => e.Status).HasDefaultValue("Pending");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentAssignmentArchivedByUsers).HasConstraintName("FK_DocumentAssignment_ArchivedBy");

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.DocumentAssignmentAssignedToUsers).HasConstraintName("FK_DocumentAssignment_AssignedToUser");

            entity.HasOne(d => d.BundleAssignment).WithMany(p => p.DocumentAssignments).HasConstraintName("FK_DocumentAssignment_BundleAssignment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentAssignmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentAssignment_CreatedBy");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentAssignment_Document");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentAssignmentModifiedByUsers).HasConstraintName("FK_DocumentAssignment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentAssignment_UserArea");
        });

        modelBuilder.Entity<DocumentBundle>(entity =>
        {
            entity.HasIndex(e => e.Category, "IX_DocumentBundle_Category").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.IsActive, "IX_DocumentBundle_IsActive").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_DocumentBundle_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.AllowBulkSign).HasDefaultValue(true);
            entity.Property(e => e.BundleType).HasDefaultValue("Standard");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentBundleArchivedByUsers).HasConstraintName("FK_DocumentBundle_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentBundleCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundle_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentBundleModifiedByUsers).HasConstraintName("FK_DocumentBundle_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentBundles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundle_UserArea");
        });

        modelBuilder.Entity<DocumentBundleAssignment>(entity =>
        {
            entity.HasIndex(e => e.AssignedToUserID, "IX_DocumentBundleAssignment_AssignedToUserID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.BundleID, "IX_DocumentBundleAssignment_BundleID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.DueDate, "IX_DocumentBundleAssignment_DueDate").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.Status, "IX_DocumentBundleAssignment_Status").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_DocumentBundleAssignment_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.AllowBulkSign).HasDefaultValue(true);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Status).HasDefaultValue("Pending");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentBundleAssignmentArchivedByUsers).HasConstraintName("FK_DocumentBundleAssignment_ArchivedBy");

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.DocumentBundleAssignmentAssignedToUsers).HasConstraintName("FK_DocumentBundleAssignment_AssignedToUser");

            entity.HasOne(d => d.Bundle).WithMany(p => p.DocumentBundleAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundleAssignment_Bundle");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentBundleAssignmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundleAssignment_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentBundleAssignmentModifiedByUsers).HasConstraintName("FK_DocumentBundleAssignment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentBundleAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundleAssignment_UserArea");
        });

        modelBuilder.Entity<DocumentBundleItem>(entity =>
        {
            entity.Property(e => e.IsRequired).HasDefaultValue(true);

            entity.HasOne(d => d.Bundle).WithMany(p => p.DocumentBundleItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentBundleItem_Bundle");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentBundleItems).HasConstraintName("FK_DocumentBundleItem_Document");

            entity.HasOne(d => d.DocumentTemplate).WithMany(p => p.DocumentBundleItems).HasConstraintName("FK_DocumentBundleItem_Template");
        });

        modelBuilder.Entity<DocumentEditLockUser>(entity =>
        {
            entity.HasKey(e => e.DocumentEditLockUserId).HasName("PK__Document__17401B7399114DC9");

            entity.Property(e => e.IsEnabled).HasDefaultValue(true);

            entity.HasOne(d => d.DocumentType).WithMany(p => p.DocumentEditLockUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentEditLockUser_DocumentLinkTableType");

            entity.HasOne(d => d.User).WithMany(p => p.DocumentEditLockUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentEditLockUser_User");
        });

        modelBuilder.Entity<DocumentFolder>(entity =>
        {
            entity.HasIndex(e => e.ParentFolderID, "IX_DocumentFolder_ParentFolderID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.Path, "IX_DocumentFolder_Path").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_DocumentFolder_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentFolderArchivedByUsers).HasConstraintName("FK_DocumentFolder_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentFolderCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentFolder_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentFolderModifiedByUsers).HasConstraintName("FK_DocumentFolder_ModifiedBy");

            entity.HasOne(d => d.ParentFolder).WithMany(p => p.InverseParentFolder).HasConstraintName("FK_DocumentFolder_ParentFolder");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentFolders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentFolder_UserArea");
        });

        modelBuilder.Entity<DocumentLink>(entity =>
        {
            entity.HasKey(e => e.DocumentLinkID).HasName("PK__Document__7862CD03E2866237");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentLinks).HasConstraintName("FK_DocumentLink_CreatedBy");

            entity.HasOne(d => d.DocumentLinkType).WithMany(p => p.DocumentLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLink_LinkTypeID");

            entity.HasOne(d => d.FirstTableType).WithMany(p => p.DocumentLinkFirstTableTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLinkFirstTable_DocumentLinkTableType");

            entity.HasOne(d => d.SecondTableType).WithMany(p => p.DocumentLinkSecondTableTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLinkSecondTable_DocumentLinkTableType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentLinks).HasConstraintName("FK_DocumentLink_UserAreaID");
        });

        modelBuilder.Entity<DocumentLinkTableLinkType>(entity =>
        {
            entity.HasKey(e => e.DocumentLinkTableLinkTypeID).HasName("PK__Document__76341C2B12F923E4");

            entity.HasOne(d => d.DocumentLinkTableChildType).WithMany(p => p.DocumentLinkTableLinkTypeDocumentLinkTableChildTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLinkTableLinkType_DocumentLinkTableChildTypeID");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.DocumentLinkTableLinkTypeDocumentLinkTableTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLinkTableLinkType_DocumentLinkTableTypeID");

            entity.HasOne(d => d.DocumentLinkType).WithMany(p => p.DocumentLinkTableLinkTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentLinkTableLinkType_DocumentLinkTypeID");
        });

        modelBuilder.Entity<DocumentLinkTableType>(entity =>
        {
            entity.HasKey(e => e.DocumentLinkTableTypeID).HasName("PK__Document__37431EFC20C2A4BE");

            entity.Property(e => e.DocumentLinkTableTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<DocumentLinkType>(entity =>
        {
            entity.HasKey(e => e.DocumentLinkTypeID).HasName("PK__Document__A6777F76CD8CDC61");

            entity.Property(e => e.DocumentLinkTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.Permission).WithMany(p => p.DocumentLinkTypes).HasConstraintName("FK_DocumentLinkType_PermissionID");
        });

        modelBuilder.Entity<DocumentRegister>(entity =>
        {
            entity.HasKey(e => e.DocumentRegisterID).HasName("PK__Document__6C94781275E4C789");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentRegisterArchivedByUsers).HasConstraintName("FK_DocumentRegister_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentRegisterCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegister_CreatedBy");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.DocumentRegisters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegister_DocumentLinkTableType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentRegisters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegister_UserArea");
        });

        modelBuilder.Entity<DocumentRegisterDocument>(entity =>
        {
            entity.HasKey(e => e.DocumentRegisterDocumentID).HasName("PK__Document__D084C31B20A02ABA");

            entity.HasOne(d => d.DocumentRegister).WithMany(p => p.DocumentRegisterDocuments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegisterDocument_DocumentRegister");
        });

        modelBuilder.Entity<DocumentRegisterDocumentTask>(entity =>
        {
            entity.HasKey(e => e.DocumentRegisterDocumentTaskID).HasName("PK__Document__39F37623DF02C37C");

            entity.HasOne(d => d.DocumentRegisterDocument).WithMany(p => p.DocumentRegisterDocumentTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegisterDocumentTask_DocumentRegisterDocument");

            entity.HasOne(d => d.Task).WithMany(p => p.DocumentRegisterDocumentTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegisterDocumentTask_Task");
        });

        modelBuilder.Entity<DocumentRegisterEmployee>(entity =>
        {
            entity.HasKey(e => e.DocumentRegisterEmployeeID).HasName("PK__Document__505CD3E36B8C2F55");

            entity.HasOne(d => d.DocumentRegister).WithMany(p => p.DocumentRegisterEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegisterEmployee_DocumentRegister");

            entity.HasOne(d => d.Employee).WithMany(p => p.DocumentRegisterEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRegisterEmployee_Employee");
        });

        modelBuilder.Entity<DocumentRequirement>(entity =>
        {
            entity.Property(e => e.IsRequired).HasDefaultValue(true);

            entity.HasOne(d => d.RequirementSet).WithMany(p => p.DocumentRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirement_RequirementSet");
        });

        modelBuilder.Entity<DocumentRequirementFulfillment>(entity =>
        {
            entity.Property(e => e.Status).HasDefaultValue("Pending");
            entity.Property(e => e.SubmittedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentRequirementFulfillments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirementFulfillment_Document");

            entity.HasOne(d => d.Requirement).WithMany(p => p.DocumentRequirementFulfillments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirementFulfillment_Requirement");

            entity.HasOne(d => d.ReviewedByUser).WithMany(p => p.DocumentRequirementFulfillmentReviewedByUsers).HasConstraintName("FK_DocumentRequirementFulfillment_ReviewedBy");

            entity.HasOne(d => d.SubmittedByUser).WithMany(p => p.DocumentRequirementFulfillmentSubmittedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirementFulfillment_SubmittedBy");
        });

        modelBuilder.Entity<DocumentRequirementSet>(entity =>
        {
            entity.HasIndex(e => e.ProcessType, "IX_DocumentRequirementSet_ProcessType").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_DocumentRequirementSet_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentRequirementSetArchivedByUsers).HasConstraintName("FK_DocumentRequirementSet_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentRequirementSetCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirementSet_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentRequirementSetModifiedByUsers).HasConstraintName("FK_DocumentRequirementSet_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentRequirementSets)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentRequirementSet_UserArea");
        });

        modelBuilder.Entity<DocumentSignature>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentSignature_Document");

            entity.HasOne(d => d.SignerUser).WithMany(p => p.DocumentSignatures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentSignature_Signer");
        });

        modelBuilder.Entity<DocumentTemplate>(entity =>
        {
            entity.HasKey(e => e.DocumentTemplateID).HasName("PK__Document__A99E4C17E3C7DE26");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DocumentType).HasDefaultValue("contract");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Version).HasDefaultValue("1.0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentTemplateArchivedByUsers).HasConstraintName("FK__DocumentT__Archi__0154EE1A");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__Creat__02491253");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentTemplateModifiedByUsers).HasConstraintName("FK__DocumentT__Modif__033D368C");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__UserA__04315AC5");
        });

        modelBuilder.Entity<DocumentTemplateTag>(entity =>
        {
            entity.HasKey(e => e.DocumentTemplateTagID).HasName("PK__Document__FD6C3B0A8CB6A89D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DataType).HasDefaultValue("text");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.DocumentTemplateTagArchivedByUsers).HasConstraintName("FK__DocumentT__Archi__7D845D36");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DocumentTemplateTagCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__Creat__7E78816F");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.DocumentTemplateTagModifiedByUsers).HasConstraintName("FK__DocumentT__Modif__7F6CA5A8");

            entity.HasOne(d => d.UserArea).WithMany(p => p.DocumentTemplateTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__UserA__0060C9E1");
        });

        modelBuilder.Entity<DocumentTemplateUsage>(entity =>
        {
            entity.HasKey(e => e.DocumentTemplateUsageID).HasName("PK__Document__7776AA98BB6DA3F1");

            entity.Property(e => e.UsedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.DocumentTemplate).WithMany(p => p.DocumentTemplateUsages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__Docum__7B9C14C4");

            entity.HasOne(d => d.UsedByUser).WithMany(p => p.DocumentTemplateUsages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DocumentT__UsedB__7C9038FD");
        });

        modelBuilder.Entity<DocumentViewLog>(entity =>
        {
            entity.Property(e => e.ViewedAt).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Document).WithMany(p => p.DocumentViewLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentViewLog_Document");

            entity.HasOne(d => d.User).WithMany(p => p.DocumentViewLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentViewLog_User");
        });

        modelBuilder.Entity<Domain>(entity =>
        {
            entity.HasKey(e => e.DomainID).HasName("PK__Domain__2498D77014169143");
        });

        modelBuilder.Entity<DrivingLicenseType>(entity =>
        {
            entity.HasKey(e => e.DrivingLicenseTypeID).HasName("PK__DrivingL__0866EF53EA405F9E");

            entity.Property(e => e.DrivingLicenseTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<EWMGEscalationEmployee>(entity =>
        {
            entity.HasKey(e => e.EWMGEscalationEmployeeID).HasName("PK__EWMGEsca__BEB0475F8BDCDBAD");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EWMGEscalationEmployeeArchivedByUsers).HasConstraintName("FK_EWMGEscalationEmployee_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EWMGEscalationEmployeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationEmployee_CreatedByUser");

            entity.HasOne(d => d.MasterLocation).WithMany(p => p.EWMGEscalationEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationEmployee_Location");

            entity.HasOne(d => d.MasterOrgGroup).WithMany(p => p.EWMGEscalationEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationEmployee_OrgGroup");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EWMGEscalationEmployeeModifiedByUsers).HasConstraintName("FK_EWMGEscalationEmployee_ModifiedByUser");

            entity.HasOne(d => d.TaskAssigneeEmployee).WithMany(p => p.EWMGEscalationEmployeeTaskAssigneeEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationEmployee_TaskAssigneeEmployee");

            entity.HasOne(d => d.Tier1ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier1ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier1ManagerEmployee");

            entity.HasOne(d => d.Tier2ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier2ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier2ManagerEmployee");

            entity.HasOne(d => d.Tier3ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier3ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier3ManagerEmployee");

            entity.HasOne(d => d.Tier4ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier4ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier4ManagerEmployee");

            entity.HasOne(d => d.Tier5ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier5ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier5ManagerEmployee");

            entity.HasOne(d => d.Tier6ManagerEmployee).WithMany(p => p.EWMGEscalationEmployeeTier6ManagerEmployees).HasConstraintName("FK_EWMGEscalationEmployee_Tier6ManagerEmployee");
        });

        modelBuilder.Entity<EWMGEscalationPeriod>(entity =>
        {
            entity.HasKey(e => e.EWMGEscalationPeriodID).HasName("PK__EWMGEsca__0BAC07673CF4C64A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EWMGEscalationPeriodArchivedByUsers).HasConstraintName("FK_EWMGEscalationPeriod_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EWMGEscalationPeriodCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationPeriod_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EWMGEscalationPeriodModifiedByUsers).HasConstraintName("FK_EWMGEscalationPeriod_ModifiedByUser");

            entity.HasOne(d => d.TaskSeverity).WithMany(p => p.EWMGEscalationPeriods).HasConstraintName("FK_EWMGEscalationPeriod_TaskSeverity");

            entity.HasOne(d => d.TaskType).WithMany(p => p.EWMGEscalationPeriods)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EWMGEscalationPeriod_TaskType");
        });

        modelBuilder.Entity<ElementType>(entity =>
        {
            entity.HasKey(e => e.ElementTypeID).HasName("PK__ElementT__562BDD5BD27C25E5");

            entity.Property(e => e.ElementTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsQuestion).HasDefaultValue(false);
        });

        modelBuilder.Entity<EmailAttachment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EmailAtt__3214EC07D127EA5F");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getutcdate())");

            entity.HasOne(d => d.Email).WithMany(p => p.EmailAttachments).HasConstraintName("FK__EmailAtta__Email__36DCD623");
        });

        modelBuilder.Entity<EmailFrequencyType>(entity =>
        {
            entity.HasKey(e => e.EmailFrequencyTypeID).HasName("PK__EmailFre__D93A1621D2DAB09E");

            entity.Property(e => e.EmailFrequencyTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<EmailLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EmailLog__3214EC0747403EE6");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getutcdate())");
        });

        modelBuilder.Entity<EmailMessage>(entity =>
        {
            entity.HasKey(e => e.EmailMessageID).HasName("PK__EmailMes__2F4E914E66EB15BF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmailMessageArchivedByUsers).HasConstraintName("FK_EmailMessage_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmailMessageCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailMessage_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmailMessageModifiedByUsers).HasConstraintName("FK_EmailMessage_ModifiedBy");
        });

        modelBuilder.Entity<EmailMessageAttachment>(entity =>
        {
            entity.HasKey(e => e.EmailMessageAttachmentID).HasName("PK__EmailMes__95EDB50CA44426A5");

            entity.HasOne(d => d.EmailMessage).WithMany(p => p.EmailMessageAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailMessageAttachment_EmailMessage");
        });

        modelBuilder.Entity<EmailRule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EmailRul__3214EC0786CCB225");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getutcdate())");
            entity.Property(e => e.Enabled).HasDefaultValue(true);
            entity.Property(e => e.Priority).HasDefaultValue(0);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getutcdate())");
        });

        modelBuilder.Entity<EmailServiceConfiguration>(entity =>
        {
            entity.HasIndex(e => e.ProviderType, "IX_EmailServiceConfiguration_ProviderType").HasFilter("([ArchivedDate] IS NULL AND [IsActive]=(1))");

            entity.HasIndex(e => new { e.UserAreaID, e.IsActive }, "IX_EmailServiceConfiguration_UserAreaID_IsActive").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "UQ_EmailServiceConfiguration_OneDefaultPerTenant")
                .IsUnique()
                .HasFilter("([IsDefault]=(1) AND [ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.RequiresEncryption).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmailServiceConfigurationArchivedByUsers).HasConstraintName("FK_EmailServiceConfiguration_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmailServiceConfigurationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailServiceConfiguration_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmailServiceConfigurationModifiedByUsers).HasConstraintName("FK_EmailServiceConfiguration_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithOne(p => p.EmailServiceConfiguration)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailServiceConfiguration_UserArea");
        });

        modelBuilder.Entity<EmailTemplate>(entity =>
        {
            entity.HasKey(e => e.EmailTemplateID).HasName("PK__EmailTem__BC0A385523DE6003");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmailTemplateArchivedByUsers).HasConstraintName("FK_EmailTemplate_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmailTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmailTemplate_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmailTemplateModifiedByUsers).HasConstraintName("FK_EmailTemplate_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmailTemplates).HasConstraintName("FK_EmailTemplate_UserArea");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeID).HasName("PK__Employee__7AD04FF18FA0C364");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeArchivedByUsers).HasConstraintName("FK_Employee_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee_CreatedBy");

            entity.HasOne(d => d.LineManagerEmployee).WithMany(p => p.InverseLineManagerEmployee).HasConstraintName("FK_Employee_LineManagerEmployee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeModifiedByUsers).HasConstraintName("FK_Employee_ModifiedBy");

            entity.HasOne(d => d.ProfileAttachment).WithMany(p => p.Employees).HasConstraintName("FK_Employee_Attachment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Employees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employee_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.EmployeeUsers).HasConstraintName("FK_Employee_User");
        });

        modelBuilder.Entity<EmployeeAbsenceConfig>(entity =>
        {
            entity.HasKey(e => e.EmployeeAbsenceConfigID).HasName("PK__Employee__B0B13DCCF3818EBB");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeAbsenceConfigArchivedByUsers).HasConstraintName("FK_EmployeeAbsenceConfig_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeAbsenceConfigCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeAbsenceConfig_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeAbsenceConfigs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeAbsenceConfig_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeAbsenceConfigModifiedByUsers).HasConstraintName("FK_EmployeeAbsenceConfig_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeAbsenceConfigs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeAbsenceConfig_UserArea");
        });

        modelBuilder.Entity<EmployeeAttachment>(entity =>
        {
            entity.HasKey(e => e.EmployeeAttachmentID).HasName("PK__Employee__CF5FA5DA85F48A92");

            entity.HasOne(d => d.Attachment).WithMany(p => p.EmployeeAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeAttachment_Attachment (AttachmentID)");

            entity.HasOne(d => d.Course).WithMany(p => p.EmployeeAttachments).HasConstraintName("FK_EmployeeAttachment_Course");

            entity.HasOne(d => d.EmployeeFolder).WithMany(p => p.EmployeeAttachments).HasConstraintName("FK_EmployeeAttachment_EmployeeFolder");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeAttachment_Employee");

            entity.HasOne(d => d.HRCaseAttachmentType).WithMany(p => p.EmployeeAttachments).HasConstraintName("FK_EmployeeAttachment_HRCaseAttachmentType");
        });

        modelBuilder.Entity<EmployeeCase>(entity =>
        {
            entity.HasKey(e => e.EmployeeCaseID).HasName("PK__Employee__0659038338B5D96D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeCaseArchivedByUsers).HasConstraintName("FK_EmployeeCase_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeCaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCase_CreatedByUser");

            entity.HasOne(d => d.EmployeeCaseStatusType).WithMany(p => p.EmployeeCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCase_EmployeeCaseStatusType");

            entity.HasOne(d => d.EmployeeCaseType).WithMany(p => p.EmployeeCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCase_EmployeeCaseType");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCase_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeCaseModifiedByUsers).HasConstraintName("FK_EmployeeCase_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCase_UserArea");
        });

        modelBuilder.Entity<EmployeeCaseNote>(entity =>
        {
            entity.HasKey(e => e.EmployeeCaseNoteID).HasName("PK__Employee__27F9C51581F9278A");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCaseNote_CreatedByUser");

            entity.HasOne(d => d.EmployeeCase).WithMany(p => p.EmployeeCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeCaseNote_EmployeeCase");
        });

        modelBuilder.Entity<EmployeeCaseStatusType>(entity =>
        {
            entity.HasKey(e => e.EmployeeCaseStatusTypeID).HasName("PK__Employee__2BFB0C049AC94D36");

            entity.Property(e => e.EmployeeCaseStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<EmployeeCaseType>(entity =>
        {
            entity.HasKey(e => e.EmployeeCaseTypeID).HasName("PK__Employee__73A50C1B723275F3");

            entity.Property(e => e.EmployeeCaseTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<EmployeeEntitlementLog>(entity =>
        {
            entity.HasKey(e => e.EmployeeEntitlementLogID).HasName("PK__Employee__5859F5EB91F920D5");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeEntitlementLogArchivedByUsers).HasConstraintName("FK_EmployeeEntitlementLog_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeEntitlementLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeEntitlementLog_CreatedBy");

            entity.HasOne(d => d.EmployeeAbsenceConfig).WithMany(p => p.EmployeeEntitlementLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeEntitlementLog_EmployeeAbsenceConfig");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeEntitlementLogModifiedByUsers).HasConstraintName("FK_EmployeeEntitlementLog_ModifiedBy");
        });

        modelBuilder.Entity<EmployeeFavouriteWalk>(entity =>
        {
            entity.HasKey(e => e.EmployeeFavouriteWalkID).HasName("PK__Employee__D690FD9B3A34E145");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeFavouriteWalkArchivedByUsers).HasConstraintName("FK_EmployeeFavouriteWalk_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeFavouriteWalkCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFavouriteWalk_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeFavouriteWalks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFavouriteWalk_EmployeeID");

            entity.HasOne(d => d.FavouriteWalk).WithMany(p => p.EmployeeFavouriteWalks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFavouriteWalk_WalkID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeFavouriteWalkModifiedByUsers).HasConstraintName("FK_EmployeeFavouriteWalk_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeFavouriteWalks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFavouriteWalk_UserAreaID");
        });

        modelBuilder.Entity<EmployeeFolder>(entity =>
        {
            entity.HasKey(e => e.EmployeeFolderID).HasName("PK__Employee__CD216BA940D72B0B");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeFolderArchivedByUsers).HasConstraintName("FK_EmployeeFolder_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeFolderCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFolder_CreatedByUser");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeFolders).HasConstraintName("FK_EmployeeFolder_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeFolderModifiedByUsers).HasConstraintName("FK_EmployeeFolder_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeFolders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeFolder_UserArea");
        });

        modelBuilder.Entity<EmployeePPE>(entity =>
        {
            entity.HasKey(e => e.EmployeePPEID).HasName("PK__Employee__1F6B84B21AD3E3F6");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeePPEArchivedByUsers).HasConstraintName("FK_EmployeePPE_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeePPECreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeePPE_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeePPEs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeePPE_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeePPEModifiedByUsers).HasConstraintName("FK_EmployeePPE_ModifiedBy");

            entity.HasOne(d => d.PPEType).WithMany(p => p.EmployeePPEs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeePPE_PPEType");
        });

        modelBuilder.Entity<EmployeeQualification>(entity =>
        {
            entity.HasKey(e => e.EmployeeQualificationID).HasName("PK__Employee__E618F3BC82C5BC7A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeQualificationArchivedByUsers).HasConstraintName("FK_EmployeeQualification_ArchivedBy");

            entity.HasOne(d => d.Attachment).WithMany(p => p.EmployeeQualifications).HasConstraintName("FK_EmployeeQualification_Attachment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeQualificationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeQualification_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeQualifications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeQualification_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeQualificationModifiedByUsers).HasConstraintName("FK_EmployeeQualification_ModifiedBy");
        });

        modelBuilder.Entity<EmployeeSicknessStatusType>(entity =>
        {
            entity.HasKey(e => e.EmployeeSicknessStatusTypeID).HasName("PK__Employee__3BBD7C9484DDEDB4");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeSicknessStatusTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeSicknessStatusType_User");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeSicknessStatusTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeSicknessStatusType_Employee");

            entity.HasOne(d => d.SicknessStatusType).WithMany(p => p.EmployeeSicknessStatusTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeSicknessStatusType_SicknessStatusType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeSicknessStatusTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeSicknessStatusType_UserArea");
        });

        modelBuilder.Entity<EmployeeTextBlock>(entity =>
        {
            entity.HasKey(e => e.EmployeeTextBlockID).HasName("PK__Employee__C5B323958DF81313");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeTextBlockArchivedByUsers).HasConstraintName("FK_EmployeeTextBlock_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeTextBlockCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTextBlock_CreatedBy");

            entity.HasOne(d => d.EmployeeFolder).WithMany(p => p.EmployeeTextBlocks).HasConstraintName("FK_EmployeeTextBlock_EmployeeFolder");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTextBlock_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeTextBlockModifiedByUsers).HasConstraintName("FK_EmployeeTextBlock_ModifiedBy");

            entity.HasOne(d => d.Task).WithMany(p => p.EmployeeTextBlocks).HasConstraintName("FK_EmployeeTextBlock_Task");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.EmployeeTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTextBlock_TextBlock");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTextBlock_UserArea");
        });

        modelBuilder.Entity<EmployeeTimePad>(entity =>
        {
            entity.HasKey(e => e.EmployeeTimePadID).HasName("PK__Employee__C9FB8A79AF185CF9");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeTimePads)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTimePad_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeTimePads)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeTimePad_Employee");
        });

        modelBuilder.Entity<EmployeeType>(entity =>
        {
            entity.HasKey(e => e.EmployeeTypeID).HasName("PK__Employee__1F1B6AB4233B1D31");

            entity.Property(e => e.EmployeeTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmployeeTypeArchivedByUsers).HasConstraintName("FK_EmployeeType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmployeeTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeeType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmployeeTypeModifiedByUsers).HasConstraintName("FK_EmployeeType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmployeeTypes).HasConstraintName("FK_EmployeeType_UserArea");
        });

        modelBuilder.Entity<EmploymentStatusType>(entity =>
        {
            entity.HasKey(e => e.EmploymentStatusTypeID).HasName("PK__Employme__C03E8DE03DA7A48A");

            entity.Property(e => e.EmploymentStatusTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EmploymentStatusTypeArchivedByUsers).HasConstraintName("FK_EmploymentStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EmploymentStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmploymentStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EmploymentStatusTypeModifiedByUsers).HasConstraintName("FK_EmploymentStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EmploymentStatusTypes).HasConstraintName("FK_EmploymentStatusType_UserArea");
        });

        modelBuilder.Entity<Enquiry>(entity =>
        {
            entity.HasKey(e => e.EnquiryID).HasName("PK__Enquiry__0A019B9DCC3298C4");

            entity.HasOne(d => d.EnquiryType).WithMany(p => p.Enquiries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Enquiry_EnquiryType");

            entity.HasOne(d => d.ProcessedByUser).WithMany(p => p.EnquiryProcessedByUsers).HasConstraintName("FK_Enquiry_ProcessedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Enquiries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Enquiry_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.EnquiryUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Enquiry_User");
        });

        modelBuilder.Entity<EnquiryType>(entity =>
        {
            entity.HasKey(e => e.EnquiryTypeID).HasName("PK__EnquiryT__BE8CFE1CF84D8E04");

            entity.Property(e => e.EnquiryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EnquiryTypeArchivedByUsers).HasConstraintName("FK_EnquiryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EnquiryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EnquiryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EnquiryTypeModifiedByUsers).HasConstraintName("FK_EnquiryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EnquiryTypes).HasConstraintName("FK_EnquiryType_UserArea");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventID).HasName("PK__Event__7944C870701B3541");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.EventArchivedByUsers).HasConstraintName("FK_Event_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.EventCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Event_CreatedByUser");

            entity.HasOne(d => d.Location).WithMany(p => p.Events).HasConstraintName("FK_Event_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.EventModifiedByUsers).HasConstraintName("FK_Event_ModifiedByUser");

            entity.HasOne(d => d.SystemProductType).WithMany(p => p.Events).HasConstraintName("FK_Event_SystemProductType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Events).HasConstraintName("FK_Event_UserArea");
        });

        modelBuilder.Entity<EventAudience>(entity =>
        {
            entity.HasKey(e => e.EventAudienceID).HasName("PK__EventAud__951577C696696F49");

            entity.HasOne(d => d.Event).WithMany(p => p.EventAudiences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventAudience_Event");

            entity.HasOne(d => d.UserArea).WithMany(p => p.EventAudiences).HasConstraintName("FK_EventAudience_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.EventAudiences).HasConstraintName("FK_EventAudience_User");
        });

        modelBuilder.Entity<EventTagType>(entity =>
        {
            entity.HasKey(e => e.EventTagTypeID).HasName("PK__EventTag__51E30532CC654985");

            entity.HasOne(d => d.Event).WithMany(p => p.EventTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventTagType_Event");

            entity.HasOne(d => d.TagType).WithMany(p => p.EventTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventTagType_TagType");
        });

        modelBuilder.Entity<ExposureType>(entity =>
        {
            entity.HasKey(e => e.ExposureTypeID).HasName("PK__Exposure__1AE5EF4A31430E22");

            entity.Property(e => e.ExposureTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ExposureTypeArchivedByUsers).HasConstraintName("FK_ExposureType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ExposureTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExposureType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ExposureTypeModifiedByUsers).HasConstraintName("FK_ExposureType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ExposureTypes).HasConstraintName("FK_ExposureType_UserArea");
        });

        modelBuilder.Entity<ExposureTypeTraining>(entity =>
        {
            entity.HasKey(e => e.ExposureTypeTrainingID).HasName("PK__Exposure__8310BD54942727C3");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ExposureTypeTrainingArchivedByUsers).HasConstraintName("FK_ExposureTypeTraining_ArchivedBy");

            entity.HasOne(d => d.Checklist).WithMany(p => p.ExposureTypeTrainings).HasConstraintName("FK_ExposureTypeTraining_ChecklistID");

            entity.HasOne(d => d.Course).WithMany(p => p.ExposureTypeTrainings).HasConstraintName("FK_ExposureTypeTraining_CourseID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ExposureTypeTrainingCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExposureTypeTraining_CreatedBy");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.ExposureTypeTrainings).HasConstraintName("FK_ExposureTypeTraining_DocumentLinkTableTypeID");

            entity.HasOne(d => d.ExposureType).WithMany(p => p.ExposureTypeTrainings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExposureTypeTraining_ExposureTypeID");

            entity.HasOne(d => d.FrequencyType).WithMany(p => p.ExposureTypeTrainings).HasConstraintName("FK_ExposureTypeTraining_FrequencyTypeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ExposureTypeTrainingModifiedByUsers).HasConstraintName("FK_ExposureTypeTraining_ModifiedBy");
        });

        modelBuilder.Entity<ExposuresEmployee>(entity =>
        {
            entity.HasKey(e => e.ExposuresEmployeeID).HasName("PK__Exposure__AAE20AD743776CBD");

            entity.HasOne(d => d.Employee).WithMany(p => p.ExposuresEmployees).HasConstraintName("FK_ExposuresEmployee_Employee");

            entity.HasOne(d => d.ExposureType).WithMany(p => p.ExposuresEmployees).HasConstraintName("FK_ExposuresEmployee_Exposure");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ExposuresEmployees).HasConstraintName("FK_ExposuresEmployee_UserArea");
        });

        modelBuilder.Entity<ExternalLink>(entity =>
        {
            entity.HasKey(e => e.ExternalLinkID).HasName("PK__External__CFF72D0B1102A2F0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ExternalLinkArchivedByUsers).HasConstraintName("FK_ExternalLink_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ExternalLinkCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExternalLink_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ExternalLinkModifiedByUsers).HasConstraintName("FK_ExternalLink_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ExternalLinks).HasConstraintName("FK_ExternalLink_UserAreaID");
        });

        modelBuilder.Entity<Favourite>(entity =>
        {
            entity.HasKey(e => e.FavouriteID).HasName("PK__Favourit__5944B57AD100857A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.FavouriteArchivedByUsers).HasConstraintName("FK_Favourite_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.FavouriteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favourite_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.FavouriteModifiedByUsers).HasConstraintName("FK_Favourite_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Favourites)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favourite_UserAreaID");

            entity.HasOne(d => d.User).WithMany(p => p.FavouriteUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favourite_UserID");
        });

        modelBuilder.Entity<FavouriteChecklist>(entity =>
        {
            entity.HasKey(e => e.FavouriteChecklistID).HasName("PK__Favourit__01F9BDCD69D1F1E7");

            entity.Property(e => e.IsForMobile).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.FavouriteChecklistArchivedByUsers).HasConstraintName("FK_FavouriteChecklist_ArchivedBy");

            entity.HasOne(d => d.Checklist).WithMany(p => p.FavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteChecklist_Checklist");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.FavouriteChecklistCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteChecklist_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.FavouriteChecklistModifiedByUsers).HasConstraintName("FK_FavouriteChecklist_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.FavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteChecklist_UserArea");
        });

        modelBuilder.Entity<FavouriteRiskAssessment>(entity =>
        {
            entity.HasKey(e => e.FavouriteRiskAssessmentID).HasName("PK__Favourit__095B0838E4A0A3ED");

            entity.Property(e => e.IsForMobile).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.FavouriteRiskAssessmentArchivedByUsers).HasConstraintName("FK_FavouriteRiskAssessment_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.FavouriteRiskAssessmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteRiskAssessment_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.FavouriteRiskAssessmentModifiedByUsers).HasConstraintName("FK_FavouriteRiskAssessment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.FavouriteRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteRiskAssessment_UserArea");
        });

        modelBuilder.Entity<FavouriteWalk>(entity =>
        {
            entity.HasKey(e => e.FavouriteWalkID).HasName("PK__Favourit__361BFE80C935E7B5");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.FavouriteWalkArchivedByUsers).HasConstraintName("FK_FavouriteWalk_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.FavouriteWalkCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteWalk_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.FavouriteWalkModifiedByUsers).HasConstraintName("FK_FavouriteWalk_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.FavouriteWalks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteWalk_UserAreaID");

            entity.HasOne(d => d.Walk).WithMany(p => p.FavouriteWalks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FavouriteWalk_WalkID");
        });

        modelBuilder.Entity<Folder>(entity =>
        {
            entity.HasKey(e => e.FolderID).HasName("PK__Folder__ACD7109FBDADE269");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.FolderArchivedByUsers).HasConstraintName("FK_Folder_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.FolderCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Folder_CreatedByUserID");

            entity.HasOne(d => d.FolderType).WithMany(p => p.Folders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Folder_FolderTypeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.FolderModifiedByUsers).HasConstraintName("FK_Folder_ModifiedByUserID");

            entity.HasOne(d => d.ParentFolder).WithMany(p => p.InverseParentFolder).HasConstraintName("FK_Folder_ParentFolderID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Folders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Folder_UserAreaID");
        });

        modelBuilder.Entity<FolderOrgGroup>(entity =>
        {
            entity.HasKey(e => e.FolderOrgGroupID).HasName("PK__FolderOr__469EA20E3852F281");

            entity.HasOne(d => d.Folder).WithMany(p => p.FolderOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FolderOrgGroup_FolderID");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.FolderOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FolderOrgGroup_OrgGroupID");
        });

        modelBuilder.Entity<FolderType>(entity =>
        {
            entity.HasKey(e => e.FolderTypeID).HasName("PK__FolderTy__AD516EC4D891FC3A");

            entity.Property(e => e.FolderTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<FrequencyType>(entity =>
        {
            entity.HasKey(e => e.FrequencyTypeID).HasName("PK__Frequenc__829BB4DC2B49845C");

            entity.Property(e => e.FrequencyTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.UserArea).WithMany(p => p.FrequencyTypes).HasConstraintName("FK_FrequencyType_UserArea");
        });

        modelBuilder.Entity<GenderType>(entity =>
        {
            entity.HasKey(e => e.GenderTypeID).HasName("PK__GenderTy__FE4AAC3807E2257E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.GenderTypeArchivedByUsers).HasConstraintName("FK_GenderType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.GenderTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GenderType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.GenderTypeModifiedByUsers).HasConstraintName("FK_GenderType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.GenderTypes).HasConstraintName("FK_GenderType_UserArea");
        });

        modelBuilder.Entity<GenericStatusType>(entity =>
        {
            entity.HasKey(e => e.GenericStatusTypeID).HasName("PK__GenericS__42755EC9FD2AEA16");

            entity.Property(e => e.GenericStatusTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.UserArea).WithMany(p => p.GenericStatusTypes).HasConstraintName("FK_GenericStatusType_UserArea");
        });

        modelBuilder.Entity<GeographicalAreaType>(entity =>
        {
            entity.HasKey(e => e.GeographicalAreaTypeID).HasName("PK__Geograph__8609E814D26C8431");

            entity.Property(e => e.GeographicalAreaTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.GeographicalAreaTypeArchivedByUsers).HasConstraintName("FK_GeographicalAreaType_ArchivedBy");

            entity.HasOne(d => d.Country).WithMany(p => p.GeographicalAreaTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GeographicalAreaType_CountryID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.GeographicalAreaTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GeographicalAreaType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.GeographicalAreaTypeModifiedByUsers).HasConstraintName("FK_GeographicalAreaType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.GeographicalAreaTypes).HasConstraintName("FK_GeographicalAreaType_UserArea");
        });

        modelBuilder.Entity<GraphBaseType>(entity =>
        {
            entity.HasKey(e => e.GraphBaseTypeID).HasName("PK__GraphBas__126529116B50DABE");
        });

        modelBuilder.Entity<GraphTabType>(entity =>
        {
            entity.HasKey(e => e.GraphTabTypeID).HasName("PK__GraphTab__129955BEE7D0B1C4");
        });

        modelBuilder.Entity<GraphType>(entity =>
        {
            entity.HasKey(e => e.GraphTypeID).HasName("PK__GraphTyp__9C3BEB90F9F51A9C");

            entity.HasOne(d => d.GraphBaseType).WithMany(p => p.GraphTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GraphType_GraphBaseType");

            entity.HasOne(d => d.GraphTabType).WithMany(p => p.GraphTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GraphType_GraphTabType");
        });

        modelBuilder.Entity<HAVSRegisterEntry>(entity =>
        {
            entity.HasKey(e => e.HAVSRegisterEntryID).HasName("PK__HAVSRegi__89BB80A47FE27BE2");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HAVSRegisterEntryArchivedByUsers).HasConstraintName("FK_HAVSRegisterEntry_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HAVSRegisterEntryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntry_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.HAVSRegisterEntries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntry_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HAVSRegisterEntryModifiedByUsers).HasConstraintName("FK_HAVSRegisterEntry_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HAVSRegisterEntries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntry_UserArea");
        });

        modelBuilder.Entity<HAVSRegisterEntryTool>(entity =>
        {
            entity.HasKey(e => e.HAVSRegisterEntryToolID).HasName("PK__HAVSRegi__D844042509121AE2");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HAVSRegisterEntryToolArchivedByUsers).HasConstraintName("FK_HAVSRegisterEntryTool_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HAVSRegisterEntryToolCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntryTool_CreatedBy");

            entity.HasOne(d => d.HAVSRegisterEntry).WithMany(p => p.HAVSRegisterEntryTools)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntryTool_HAVSRegisterEntry");

            entity.HasOne(d => d.HAVSTool).WithMany(p => p.HAVSRegisterEntryTools)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSRegisterEntryTool_HAVSTool");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HAVSRegisterEntryToolModifiedByUsers).HasConstraintName("FK_HAVSRegisterEntryTool_ModifiedBy");
        });

        modelBuilder.Entity<HAVSTool>(entity =>
        {
            entity.HasKey(e => e.HAVSToolID).HasName("PK__HAVSTool__8A29D4022B2C9F04");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HAVSToolArchivedByUsers).HasConstraintName("FK_HAVSTool_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HAVSToolCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSTool_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HAVSToolModifiedByUsers).HasConstraintName("FK_HAVSTool_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HAVSTools)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSTool_UserArea");
        });

        modelBuilder.Entity<HAVSToolApplicableEmployee>(entity =>
        {
            entity.HasKey(e => e.HAVSToolApplicableEmployeeID).HasName("PK__HAVSTool__69CD591313F12FB5");

            entity.HasOne(d => d.Employee).WithMany(p => p.HAVSToolApplicableEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolApplicableEmploye_Employee");

            entity.HasOne(d => d.HAVSTool).WithMany(p => p.HAVSToolApplicableEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolApplicableEmploye_HAVSTool");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HAVSToolApplicableEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolApplicableEmploye_UserArea");
        });

        modelBuilder.Entity<HAVSToolBannedEmployee>(entity =>
        {
            entity.HasKey(e => e.HAVSToolBannedEmployeeID).HasName("PK__HAVSTool__BB8CEFD6A84268F7");

            entity.HasOne(d => d.Employee).WithMany(p => p.HAVSToolBannedEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolBannedEmploye_Employee");

            entity.HasOne(d => d.HAVSTool).WithMany(p => p.HAVSToolBannedEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolBannedEmploye_HAVSTool");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HAVSToolBannedEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HAVSToolBannedEmploye_UserArea");
        });

        modelBuilder.Entity<HRCase>(entity =>
        {
            entity.HasKey(e => e.HRCaseID).HasName("PK__HRCase__9E2B1112BDA06D4D");

            entity.Property(e => e.SubmittedByUserTypeID).HasDefaultValue(1);

            entity.HasOne(d => d.AppealOfficerEmployee).WithMany(p => p.HRCaseAppealOfficerEmployees).HasConstraintName("FK_HRCase_AppealOfficerEmployee");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseArchivedByUsers).HasConstraintName("FK_HRCase_ArchivedByUser");

            entity.HasOne(d => d.AssumedLevelTagType).WithMany(p => p.HRCaseAssumedLevelTagTypes).HasConstraintName("FK_HRCase_AssumedLevelTagType");

            entity.HasOne(d => d.CaseOfficerEmployee).WithMany(p => p.HRCaseCaseOfficerEmployees).HasConstraintName("FK_HRCase_CaseOfficerEmployee");

            entity.HasOne(d => d.ConfirmedLevelTagType).WithMany(p => p.HRCaseConfirmedLevelTagTypes).HasConstraintName("FK_HRCase_ConfirmedLevelTagType");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCase_CreatedByUser");

            entity.HasOne(d => d.Employee).WithMany(p => p.HRCaseEmployees).HasConstraintName("FK_HRCase_Employee");

            entity.HasOne(d => d.HRCaseAdvisorUser).WithMany(p => p.HRCaseHRCaseAdvisorUsers).HasConstraintName("FK_HRCase_HRCaseAdvisorUser");

            entity.HasOne(d => d.HRCaseOutcomeType).WithMany(p => p.HRCases).HasConstraintName("FK_HRCase_HRCaseOutcomeType");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCase_HRCaseStatusType");

            entity.HasOne(d => d.HRCategory).WithMany(p => p.HRCases).HasConstraintName("FK_HRCase_HRCategory");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCase_HRType");

            entity.HasOne(d => d.InvestigatingOfficerEmployee).WithMany(p => p.HRCaseInvestigatingOfficerEmployees).HasConstraintName("FK_HRCase_InvestigatingOfficerEmployee");

            entity.HasOne(d => d.Location).WithMany(p => p.HRCases).HasConstraintName("FK_HRCase_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseModifiedByUsers).HasConstraintName("FK_HRCase_ModifiedByUser");

            entity.HasOne(d => d.SeverityGenericStatusType).WithMany(p => p.HRCases).HasConstraintName("FK_HRCase_SeverityGenericStatusType");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.HRCases).HasConstraintName("FK_HRCase_TaskSchedule");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCase_UserArea");
        });

        modelBuilder.Entity<HRCaseAdvisor>(entity =>
        {
            entity.HasKey(e => e.HRCaseAdvisorID).HasName("PK__HRCaseAd__76454A9EA2213EDD");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseAdvisorArchivedByUsers).HasConstraintName("FK_HRCaseAdvisor_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseAdvisorCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAdvisor_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.HRCaseAdvisors).HasConstraintName("FK_HRCaseAdvisor_EmployeeID");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseAdvisors).HasConstraintName("FK_HRCaseAdvisor_HRCaseID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseAdvisorModifiedByUsers).HasConstraintName("FK_HRCaseAdvisor_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCaseAdvisors).HasConstraintName("FK_HRCaseAdvisor_UserArea");
        });

        modelBuilder.Entity<HRCaseAttachment>(entity =>
        {
            entity.HasKey(e => e.HRCaseAttachmentID).HasName("PK__HRCaseAt__E29B746DF9969CA6");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseAttachmentArchivedByUsers).HasConstraintName("FK_HRCaseAttachment_ArchivedByUser");

            entity.HasOne(d => d.Attachment).WithMany(p => p.HRCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachment_Attachment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseAttachmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachment_CreatedByUser");

            entity.HasOne(d => d.HRCaseAttachmentType).WithMany(p => p.HRCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachment_HRCaseAttachmentType");

            entity.HasOne(d => d.HRCaseEvent).WithMany(p => p.HRCaseAttachments).HasConstraintName("FK_HRCaseAttachment_HRCaseEvent");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachment_HRCase");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseAttachments).HasConstraintName("FK_HRCaseAttachment_HRCaseMeeting");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCaseAttachments).HasConstraintName("FK_HRCaseAttachment_HRCaseStatusType");

            entity.HasOne(d => d.HRCaseTask).WithMany(p => p.HRCaseAttachments).HasConstraintName("FK_HRCaseAttachment_HRCaseTask");

            entity.HasOne(d => d.HRCaseTemplateCategory).WithMany(p => p.HRCaseAttachments).HasConstraintName("FK_HRCaseAttachment_HRCaseTemplateCategory");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseAttachmentModifiedByUsers).HasConstraintName("FK_HRCaseAttachment_ModifiedByUser");
        });

        modelBuilder.Entity<HRCaseAttachmentNote>(entity =>
        {
            entity.HasKey(e => e.HRCaseAttachmentNoteID).HasName("PK__HRCaseAt__834425D8A6F7C9DA");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseAttachmentNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachmentNote_CreatedByUser");

            entity.HasOne(d => d.HRCaseAttachment).WithMany(p => p.HRCaseAttachmentNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachmentNote_HRCaseAttachment");
        });

        modelBuilder.Entity<HRCaseAttachmentType>(entity =>
        {
            entity.HasKey(e => e.HRCaseAttachmentTypeID).HasName("PK__HRCaseAt__0C3CAA6D39AB928F");

            entity.Property(e => e.HRCaseAttachmentTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseAttachmentTypeArchivedByUsers).HasConstraintName("FK_HRCaseAttachmentType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseAttachmentTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseAttachmentType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseAttachmentTypeModifiedByUsers).HasConstraintName("FK_HRCaseAttachmentType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCaseAttachmentTypes).HasConstraintName("FK_HRCaseAttachmentType_UserArea");
        });

        modelBuilder.Entity<HRCaseEmail>(entity =>
        {
            entity.HasKey(e => e.HRCaseEmailID).HasName("PK__HRCaseEm__944FF54DB731F260");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseEmailArchivedByUsers).HasConstraintName("FK_HRCaseEmail_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseEmailCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseEmail_CreatedBy");

            entity.HasOne(d => d.EmailMessage).WithMany(p => p.HRCaseEmails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseEmail_EmailMessage");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseEmails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseEmail_HRCase");

            entity.HasOne(d => d.HRCategory).WithMany(p => p.HRCaseEmails).HasConstraintName("FK_HRCaseEmail_HRCategory");

            entity.HasOne(d => d.ImportanceGenericStatusType).WithMany(p => p.HRCaseEmails).HasConstraintName("FK_HRCaseEmail_ImportanceGenericStatusType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseEmailModifiedByUsers).HasConstraintName("FK_HRCaseEmail_ModifiedBy");
        });

        modelBuilder.Entity<HRCaseEvent>(entity =>
        {
            entity.HasKey(e => e.HRCaseEventID).HasName("PK__HRCaseEv__FE8BFFCE68950B51");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseEventArchivedByUsers).HasConstraintName("FK_HRCaseEvent_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseEventCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseEvent_CreatedByUser");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseEvent_HRCase");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseEvents).HasConstraintName("FK_HRCaseEvent_HRCaseMeeting");

            entity.HasOne(d => d.HRCategory).WithMany(p => p.HRCaseEvents).HasConstraintName("FK_HRCaseEvent_HRCategory");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseEventModifiedByUsers).HasConstraintName("FK_HRCaseEvent_ModifiedByUser");
        });

        modelBuilder.Entity<HRCaseMeeting>(entity =>
        {
            entity.HasKey(e => e.HRCaseMeetingID).HasName("PK__HRCaseMe__9EFA0B494984B7B0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseMeetingArchivedByUsers).HasConstraintName("FK_HRCaseMeeting_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseMeetingCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseMeeting_CreatedBy");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseMeetings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseMeeting_HRCase");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCaseMeetings).HasConstraintName("FK_HRCaseMeeting_HRCaseStatusType");

            entity.HasOne(d => d.HRMeetingType).WithMany(p => p.HRCaseMeetings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseMeeting_HRMeetingType");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.HRCaseMeetings).HasConstraintName("FK_HRCaseMeeting_ManagerEmployee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseMeetingModifiedByUsers).HasConstraintName("FK_HRCaseMeeting_ModifiedBy");

            entity.HasOne(d => d.SelfAssessmentAttachment).WithMany(p => p.HRCaseMeetings).HasConstraintName("FK_HRCaseMeeting_SAAttachment");

            entity.HasOne(d => d.SelfAssessmentQuestionnaireResponse).WithMany(p => p.HRCaseMeetings).HasConstraintName("FK_HRCaseMeeting_SAQuestionnaireResponse");
        });

        modelBuilder.Entity<HRCaseMeetingAttendee>(entity =>
        {
            entity.HasKey(e => e.HRCaseMeetingAttendeeID).HasName("PK__HRCaseMe__F5846B8B98B026E0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseMeetingAttendeeArchivedByUsers).HasConstraintName("FK_HRCaseMeetingAttendee_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseMeetingAttendeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseMeetingAttendee_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.HRCaseMeetingAttendees).HasConstraintName("FK_HRCaseMeetingAttendee_Employee");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseMeetingAttendees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseMeetingAttendee_HRCaseMeeting");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseMeetingAttendeeModifiedByUsers).HasConstraintName("FK_HRCaseMeetingAttendee_ModifiedBy");
        });

        modelBuilder.Entity<HRCaseNote>(entity =>
        {
            entity.HasKey(e => e.HRCaseNoteID).HasName("PK__HRCaseNo__F71B7B1BE94016DB");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseNoteArchivedByUsers).HasConstraintName("FK_HRCaseNote_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseNote_CreatedBy");

            entity.HasOne(d => d.HRCaseEvent).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_HRCaseEvent");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseNote_HRCase");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_HRCaseMeeting");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_HRCaseStatusType");

            entity.HasOne(d => d.HRCaseTemplateCategory).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_HRCaseTemplateCategory");

            entity.HasOne(d => d.HRCategory).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_HRCategory");

            entity.HasOne(d => d.ImportanceGenericStatusType).WithMany(p => p.HRCaseNotes).HasConstraintName("FK_HRCaseNote_ImportanceGenericStatusType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseNoteModifiedByUsers).HasConstraintName("FK_HRCaseNote_ModifiedBy");
        });

        modelBuilder.Entity<HRCaseOutcomeType>(entity =>
        {
            entity.HasKey(e => e.HRCaseOutcomeTypeID).HasName("PK__HRCaseOu__E5C1EE0B4FA1E17B");

            entity.Property(e => e.HRCaseOutcomeTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseOutcomeTypeArchivedByUsers).HasConstraintName("FK_HRCaseOutcomeType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseOutcomeTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseOutcomeType_CreatedBy");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRCaseOutcomeTypes).HasConstraintName("FK_HRCaseOutcomeType_HRType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseOutcomeTypeModifiedByUsers).HasConstraintName("FK_HRCaseOutcomeType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCaseOutcomeTypes).HasConstraintName("FK_HRCaseOutcomeType_UserArea");
        });

        modelBuilder.Entity<HRCasePing>(entity =>
        {
            entity.HasKey(e => e.HRCasePingID).HasName("PK__HRCasePi__C9C36DDEC0FF1D06");

            entity.HasOne(d => d.EmulatingUser).WithMany(p => p.HRCasePingEmulatingUsers).HasConstraintName("FK_HRCasePing_EmulatingUser");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCasePings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCasePing_HRCase");

            entity.HasOne(d => d.User).WithMany(p => p.HRCasePingUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCasePing_User");
        });

        modelBuilder.Entity<HRCaseStatusType>(entity =>
        {
            entity.HasKey(e => e.HRCaseStatusTypeID).HasName("PK__HRCaseSt__32DA80FF28D24004");

            entity.Property(e => e.HRCaseStatusTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseStatusTypeArchivedByUsers).HasConstraintName("FK_HRCaseStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseStatusType_CreatedBy");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRCaseStatusTypes).HasConstraintName("FK_HRCaseStatusType_HRType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseStatusTypeModifiedByUsers).HasConstraintName("FK_HRCaseStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCaseStatusTypes).HasConstraintName("FK_HRCaseStatusType_UserArea");
        });

        modelBuilder.Entity<HRCaseSupporter>(entity =>
        {
            entity.HasKey(e => e.HRCaseSupporterID).HasName("PK__HRCaseSu__B1C3FF04B9803844");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseSupporters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseSupporter_HRCase");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCaseSupporters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseSupporter_HRCaseStatusType");
        });

        modelBuilder.Entity<HRCaseTagType>(entity =>
        {
            entity.HasKey(e => e.HRCaseTagTypeID).HasName("PK__HRCaseTa__E5CEA826D5B8B640");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTagType_HRCase");

            entity.HasOne(d => d.TagType).WithMany(p => p.HRCaseTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTagType_TagType");
        });

        modelBuilder.Entity<HRCaseTask>(entity =>
        {
            entity.HasKey(e => e.HRCaseTaskID).HasName("PK__HRCaseTa__3B9AB0D373362EA5");

            entity.HasOne(d => d.HRCaseEvent).WithMany(p => p.HRCaseTasks).HasConstraintName("FK_HRCaseTask_HRCaseEvent");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTask_HRCase");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseTasks).HasConstraintName("FK_HRCaseTask_HRCaseMeeting");

            entity.HasOne(d => d.HRCaseStatusType).WithMany(p => p.HRCaseTasks).HasConstraintName("FK_HRCaseTask_HRCaseStatusType");

            entity.HasOne(d => d.Task).WithMany(p => p.HRCaseTasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTask_Task");
        });

        modelBuilder.Entity<HRCaseTemplateCategory>(entity =>
        {
            entity.HasKey(e => e.HRCaseTemplateCategoryID).HasName("PK__HRCaseTe__559BDA42A0BFC57B");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCaseTemplateCategoryArchivedByUsers).HasConstraintName("FK_HRCaseTemplateCategory_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCaseTemplateCategoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTemplateCategory_CreatedBy");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTemplateCategory_HRCase");

            entity.HasOne(d => d.HRTemplateCategory).WithMany(p => p.HRCaseTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTemplateCategory_HRTemplateCategory");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCaseTemplateCategoryModifiedByUsers).HasConstraintName("FK_HRCaseTemplateCategory_ModifiedBy");
        });

        modelBuilder.Entity<HRCaseTextBlockCollection>(entity =>
        {
            entity.HasKey(e => e.HRCaseTextBlockCollectionID).HasName("PK__HRCaseTe__882001BF1DB53CB2");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseTextBlockCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTextBlockCollection_HRCase");

            entity.HasOne(d => d.HRCaseMeeting).WithMany(p => p.HRCaseTextBlockCollections).HasConstraintName("FK_HRCaseTextBlockCollection_HRCaseMeeting");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.HRCaseTextBlockCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTextBlockCollection_TextBlockCollection");
        });

        modelBuilder.Entity<HRCaseTimePad>(entity =>
        {
            entity.HasKey(e => e.HRCaseTimePadID).HasName("PK__HRCaseTi__0B378004C1AE02CC");

            entity.HasOne(d => d.EmulatingUser).WithMany(p => p.HRCaseTimePadEmulatingUsers).HasConstraintName("FK_HRCaseTimePad_EmulatingUser");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseTimePads)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTimePad_HRCase");

            entity.HasOne(d => d.User).WithMany(p => p.HRCaseTimePadUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseTimePad_User");
        });

        modelBuilder.Entity<HRCaseViewerUser>(entity =>
        {
            entity.HasKey(e => e.HRCaseViewerUserID).HasName("PK__HRCaseVi__93EB00B73E02CFEC");

            entity.HasOne(d => d.HRCase).WithMany(p => p.HRCaseViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseViewerUser_HRCase");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCaseViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseViewerUser_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.HRCaseViewerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCaseViewerUser_User");
        });

        modelBuilder.Entity<HRCategory>(entity =>
        {
            entity.HasKey(e => e.HRCategoryID).HasName("PK__HRCatego__78F6248FCE51B96E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRCategoryArchivedByUsers).HasConstraintName("FK_HRCategory_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCategoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCategory_CreatedBy");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRCategories).HasConstraintName("FK_HRCategory_HRType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRCategoryModifiedByUsers).HasConstraintName("FK_HRCategory_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRCategories).HasConstraintName("FK_HRCategory_UserArea");
        });

        modelBuilder.Entity<HRCostBaseRate>(entity =>
        {
            entity.HasKey(e => e.HRCostBaseRateID).HasName("PK__HRCostBa__9F3D2115A0CE860E");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCostBaseRates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCostBaseRate_CreatedBy");
        });

        modelBuilder.Entity<HRCostUserRate>(entity =>
        {
            entity.HasKey(e => e.HRCostUserRateID).HasName("PK__HRCostUs__8A0BBC3FB7DC13B7");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRCostUserRates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRCostUserRate_CreatedBy");
        });

        modelBuilder.Entity<HRMeetingType>(entity =>
        {
            entity.HasKey(e => e.HRMeetingTypeID).HasName("PK__HRMeetin__295F435F31D68AB8");

            entity.Property(e => e.HRMeetingTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRMeetingTypeArchivedByUsers).HasConstraintName("FK_HRMeetingType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRMeetingTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRMeetingType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRMeetingTypeModifiedByUsers).HasConstraintName("FK_HRMeetingType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRMeetingTypes).HasConstraintName("FK_HRMeetingType_UserArea");
        });

        modelBuilder.Entity<HRTemplate>(entity =>
        {
            entity.HasKey(e => e.HRTemplateID).HasName("PK__HRTempla__C5ADBC19AD8B80EE");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRTemplateArchivedByUsers).HasConstraintName("FK_HRTemplate_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HRTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTemplate_CreatedBy");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTemplate_HRType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HRTemplateModifiedByUsers).HasConstraintName("FK_HRTemplate_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HRTemplates).HasConstraintName("FK_HRTemplate_UserArea");
        });

        modelBuilder.Entity<HRTemplateCategory>(entity =>
        {
            entity.HasKey(e => e.HRTemplateCategoryID).HasName("PK__HRTempla__78D3C39F2403FA71");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HRTemplateCategories).HasConstraintName("FK_HRTemplateCategory_ArchivedBy");

            entity.HasOne(d => d.HRCategory).WithMany(p => p.HRTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTemplateCategory_HRCategory");

            entity.HasOne(d => d.HRTemplate).WithMany(p => p.HRTemplateCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTemplateCategory_HRTemplate");
        });

        modelBuilder.Entity<HRType>(entity =>
        {
            entity.HasKey(e => e.HRTypeID).HasName("PK__HRType__1F0788AB1352E813");

            entity.Property(e => e.HRTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<HRTypeHRMeetingType>(entity =>
        {
            entity.HasKey(e => e.HRTypeHRMeetingTypeID).HasName("PK__HRTypeHR__E70014BB538D2C17");

            entity.HasOne(d => d.HRMeetingType).WithMany(p => p.HRTypeHRMeetingTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTypeHRMeetingType_HRMeetingType");

            entity.HasOne(d => d.HRType).WithMany(p => p.HRTypeHRMeetingTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HRTypeHRMeetingType_HRType");
        });

        modelBuilder.Entity<Hazard>(entity =>
        {
            entity.HasKey(e => e.HazardID).HasName("PK__tmp_ms_x__29CF35F6975CBC36");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.Hazards).HasConstraintName("FK_Hazard_AssignedUser");

            entity.HasOne(d => d.HazardCategoryType).WithMany(p => p.Hazards).HasConstraintName("FK_Hazard_CategoryType");

            entity.HasOne(d => d.HazardSeverityType).WithMany(p => p.Hazards).HasConstraintName("FK_Hazard_HazardSeverityType");

            entity.HasOne(d => d.Location).WithMany(p => p.Hazards).HasConstraintName("FK_Hazard_Location");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Hazards)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Hazard_UserArea");
        });

        modelBuilder.Entity<HazardCategoryType>(entity =>
        {
            entity.HasKey(e => e.HazardCategoryTypeID).HasName("PK__tmp_ms_x__B406D65D95BC5495");

            entity.Property(e => e.CreatedByUserID).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HazardCategoryTypeArchivedByUsers).HasConstraintName("FK_HazardCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HazardCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HazardCategoryTypeModifiedByUsers).HasConstraintName("FK_HazardCategoryType_ModifiedBy");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory).HasConstraintName("FK_HazardCategoryType_Parent");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HazardCategoryTypes).HasConstraintName("FK_HazardCategoryType_UserArea");
        });

        modelBuilder.Entity<HazardControlMeasure>(entity =>
        {
            entity.HasKey(e => e.HazardControlMeasureID).HasName("PK__HazardCo__DA67ADF936D22159");

            entity.HasOne(d => d.ControlMeasure).WithMany(p => p.HazardControlMeasures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardControlMeasure_ControlMeasure");

            entity.HasOne(d => d.Hazard).WithMany(p => p.HazardControlMeasures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardControlMeasure_Hazard");
        });

        modelBuilder.Entity<HazardReport>(entity =>
        {
            entity.HasKey(e => e.HazardReportID).HasName("PK__HazardRe__5D51009F031FA04D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HazardReportArchivedByUsers).HasConstraintName("FK_HazardReport_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HazardReportCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardReport_CreatedBy");

            entity.HasOne(d => d.HazardReportType).WithMany(p => p.HazardReports).HasConstraintName("FK_HazardReport_HazardReportType");

            entity.HasOne(d => d.Location).WithMany(p => p.HazardReports).HasConstraintName("FK_HazardReport_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HazardReportModifiedByUsers).HasConstraintName("FK_HazardReport_ModifiedBy");

            entity.HasOne(d => d.Task).WithMany(p => p.HazardReports).HasConstraintName("FK_HazardReport_Task");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HazardReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardReport_UserArea");
        });

        modelBuilder.Entity<HazardReportAttachment>(entity =>
        {
            entity.HasKey(e => e.HazardReportAttachmentID).HasName("PK__HazardRe__780613A6B8AE4093");

            entity.HasOne(d => d.Attachment).WithMany(p => p.HazardReportAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardReportAttachment_Attachment");

            entity.HasOne(d => d.HazardReport).WithMany(p => p.HazardReportAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardReportAttachment_HazardReport");
        });

        modelBuilder.Entity<HazardReportType>(entity =>
        {
            entity.HasKey(e => e.HazardReportTypeID).HasName("PK__HazardRe__24136937FC5F2E9F");

            entity.Property(e => e.HazardReportTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.UserArea).WithMany(p => p.HazardReportTypes).HasConstraintName("FK_HazardReportType_UserArea");
        });

        modelBuilder.Entity<HazardSeverityType>(entity =>
        {
            entity.HasKey(e => e.HazardSeverityTypeID).HasName("PK__tmp_ms_x__CC4FEAD38DB022D7");

            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.HazardSeverityTypeArchivedByUsers).HasConstraintName("FK_HazardSeverityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.HazardSeverityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HazardSeverityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.HazardSeverityTypeModifiedByUsers).HasConstraintName("FK_HazardSeverityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HazardSeverityTypes).HasConstraintName("FK_HazardSeverityType_UserArea");
        });

        modelBuilder.Entity<HelpGuide>(entity =>
        {
            entity.HasKey(e => e.HelpGuideID).HasName("PK__HelpGuid__19F585A22FB16450");

            entity.Property(e => e.HelpGuideID).ValueGeneratedNever();

            entity.HasOne(d => d.ModuleType).WithMany(p => p.HelpGuides)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HelpGuide_ModuleTypeID");
        });

        modelBuilder.Entity<HelpText>(entity =>
        {
            entity.HasKey(e => e.HelpTextID).HasName("PK__HelpText__0FA749C0DB96EE6B");

            entity.HasOne(d => d.ModuleType).WithMany(p => p.HelpTexts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HelpText_ModuleTypeID");

            entity.HasOne(d => d.Theme).WithMany(p => p.HelpTexts).HasConstraintName("FK_HelpText_ThemeID");
        });

        modelBuilder.Entity<HelpTextAttachment>(entity =>
        {
            entity.HasKey(e => e.HelpTextAttachmentID).HasName("PK__HelpText__AAA6DD55C5C6C87A");
        });

        modelBuilder.Entity<HighLevelProductType>(entity =>
        {
            entity.HasKey(e => e.HighLevelProductTypeID).HasName("PK__HighLeve__C0A543AB055C9356");

            entity.HasOne(d => d.UserArea).WithMany(p => p.HighLevelProductTypes).HasConstraintName("FK_HighLevelProductType_UserArea");
        });

        modelBuilder.Entity<Import>(entity =>
        {
            entity.HasKey(e => e.ImportID).HasName("PK__Import__8697678AA8788D4C");

            entity.Property(e => e.ImportProgress).HasDefaultValue((byte)0);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ImportArchivedByUsers).HasConstraintName("FK_Import_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ImportCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_CreatedBy");

            entity.HasOne(d => d.ImportRecordType).WithMany(p => p.Imports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_ImportRecordType");

            entity.HasOne(d => d.ImportStatusType).WithMany(p => p.Imports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_ImportStatusType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ImportModifiedByUsers).HasConstraintName("FK_Import_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Imports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Import_UserArea");
        });

        modelBuilder.Entity<ImportRecordType>(entity =>
        {
            entity.HasKey(e => e.ImportRecordTypeID).HasName("PK__ImportRe__A594C98ADBDE771A");

            entity.Property(e => e.ImportRecordTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ImportStatusType>(entity =>
        {
            entity.HasKey(e => e.ImportStatusTypeID).HasName("PK__ImportSt__E6C1D9CFF55CCBA7");

            entity.Property(e => e.ImportStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<InboundEmail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__InboundE__3214EC0792246BEB");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getutcdate())");
            entity.Property(e => e.Processed).HasDefaultValue(false);
            entity.Property(e => e.ReceivedAt).HasDefaultValueSql("(getutcdate())");
        });

        modelBuilder.Entity<IncidentAttachment>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
        });

        modelBuilder.Entity<IncidentCase>(entity =>
        {
            entity.HasKey(e => e.IncidentCaseID).HasName("PK__tmp_ms_x__1C761051AB548F44");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IncidentPriorityTypeID).HasDefaultValue(2);
            entity.Property(e => e.IncidentSeverityTypeID).HasDefaultValue(1);
            entity.Property(e => e.IncidentStatusTypeID).HasDefaultValue(1);
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ReportedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.IncidentPriorityType).WithMany(p => p.IncidentCases).HasConstraintName("FK__IncidentC__Incid__4891720A");

            entity.HasOne(d => d.IncidentSeverityType).WithMany(p => p.IncidentCases).HasConstraintName("FK__IncidentC__Incid__4D562727");

            entity.HasOne(d => d.IncidentStatusType).WithMany(p => p.IncidentCases).HasConstraintName("FK__IncidentC__Incid__521ADC44");

            entity.HasOne(d => d.IncidentType).WithMany(p => p.IncidentCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__IncidentC__Incid__5E80B329");
        });

        modelBuilder.Entity<IncidentCaseLink>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.LinkType).HasDefaultValue("Related");

            entity.HasOne(d => d.SourceIncidentCase).WithMany(p => p.IncidentCaseLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentCaseLink_SourceIncidentCase");
        });

        modelBuilder.Entity<IncidentCaseNote>(entity =>
        {
            entity.HasIndex(e => new { e.UserAreaID, e.CreatedDate }, "IX_IncidentCaseNote_UserAreaID_CreatedDate")
                .IsDescending(false, true)
                .HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.IncidentCase).WithMany(p => p.IncidentCaseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentCaseNote_IncidentCase");
        });

        modelBuilder.Entity<IncidentCaseViewerRole>(entity =>
        {
            entity.HasKey(e => e.IncidentCaseViewerRoleID).HasName("PK__Incident__1772C0478266A7A6");

            entity.HasOne(d => d.Role).WithMany(p => p.IncidentCaseViewerRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentCaseViewerRole_Role");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentCaseViewerRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentCaseViewerRole_UserArea");
        });

        modelBuilder.Entity<IncidentCategoryType>(entity =>
        {
            entity.HasKey(e => e.IncidentCategoryTypeID).HasName("PK__Incident__7295995FB992E6C0");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentCategoryTypeArchivedByUsers).HasConstraintName("FK_IncidentCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentCategoryTypeModifiedByUsers).HasConstraintName("FK_IncidentCategoryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentCategoryTypes).HasConstraintName("FK_IncidentCategoryType_UserArea");
        });

        modelBuilder.Entity<IncidentFormDatum>(entity =>
        {
            entity.HasKey(e => e.IncidentFormDataID).HasName("PK__Incident__D1C9EA311CBEF599");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Status).HasDefaultValue("Draft");

            entity.HasOne(d => d.IncidentCase).WithMany(p => p.IncidentFormData).HasConstraintName("FK__IncidentF__Incid__26716430");

            entity.HasOne(d => d.IncidentType).WithMany(p => p.IncidentFormData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__IncidentF__Incid__5F74D762");
        });

        modelBuilder.Entity<IncidentKind>(entity =>
        {
            entity.HasKey(e => e.IncidentKindID).HasName("PK__Incident__B9D2D68B3FD729EC");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentKindArchivedByUsers).HasConstraintName("FK_IncidentKind_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentKindCreatedByUsers).HasConstraintName("FK_IncidentKind_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentKindModifiedByUsers).HasConstraintName("FK_IncidentKind_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentKinds).HasConstraintName("FK_IncidentKind_UserAreaID");
        });

        modelBuilder.Entity<IncidentPriorityType>(entity =>
        {
            entity.HasKey(e => e.IncidentPriorityTypeID).HasName("PK__tmp_ms_x__3D58231F77A8DD04");

            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentPriorityTypeArchivedByUsers).HasConstraintName("FK_IncidentPriorityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentPriorityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentPriorityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentPriorityTypeModifiedByUsers).HasConstraintName("FK_IncidentPriorityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentPriorityTypes).HasConstraintName("FK_IncidentPriorityType_UserArea");
        });

        modelBuilder.Entity<IncidentSeverityType>(entity =>
        {
            entity.HasKey(e => e.IncidentSeverityTypeID).HasName("PK__tmp_ms_x__F4909AF51725660F");

            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentSeverityTypeArchivedByUsers).HasConstraintName("FK_IncidentSeverityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentSeverityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentSeverityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentSeverityTypeModifiedByUsers).HasConstraintName("FK_IncidentSeverityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentSeverityTypes).HasConstraintName("FK_IncidentSeverityType_UserArea");
        });

        modelBuilder.Entity<IncidentStatusType>(entity =>
        {
            entity.HasKey(e => e.IncidentStatusTypeID).HasName("PK__tmp_ms_x__56892548BEB64FA4");

            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentStatusTypeArchivedByUsers).HasConstraintName("FK_IncidentStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentStatusTypeModifiedByUsers).HasConstraintName("FK_IncidentStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentStatusTypes).HasConstraintName("FK_IncidentStatusType_UserArea");
        });

        modelBuilder.Entity<IncidentType>(entity =>
        {
            entity.HasKey(e => e.IncidentTypeID).HasName("PK__tmp_ms_x__A161F66195C6CC97");

            entity.Property(e => e.CreatedByUserID).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(0);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.IncidentTypeArchivedByUsers).HasConstraintName("FK_IncidentType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.IncidentTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_IncidentType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.IncidentTypeModifiedByUsers).HasConstraintName("FK_IncidentType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.IncidentTypes).HasConstraintName("FK_IncidentType_UserArea");
        });

        modelBuilder.Entity<InductionAllocation>(entity =>
        {
            entity.HasKey(e => e.InductionAllocationID).HasName("PK__Inductio__9770CCC18093EF1A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InductionAllocationArchivedByUsers).HasConstraintName("FK_InductionAllocation_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InductionAllocationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionAllocation_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.InductionAllocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionAllocation_Employee");

            entity.HasOne(d => d.InductionBundle).WithMany(p => p.InductionAllocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionAllocation_InductionBundle");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InductionAllocationModifiedByUsers).HasConstraintName("FK_InductionAllocation_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.InductionAllocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionAllocation_UserArea");
        });

        modelBuilder.Entity<InductionBundle>(entity =>
        {
            entity.HasKey(e => e.InductionBundleID).HasName("PK__Inductio__DAFE501CADE635C1");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InductionBundleArchivedByUsers).HasConstraintName("FK_InductionBundle_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InductionBundleCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionBundle_CreatedBy");

            entity.HasOne(d => d.EmployeeType).WithMany(p => p.InductionBundles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionBundle_EmployeeType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InductionBundleModifiedByUsers).HasConstraintName("FK_InductionBundle_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.InductionBundles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionBundle_UserArea");
        });

        modelBuilder.Entity<InductionBundleItem>(entity =>
        {
            entity.HasKey(e => e.InductionBundleItemID).HasName("PK__Inductio__E54162033606B610");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InductionBundleItemArchivedByUsers).HasConstraintName("FK_InductionBundleItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InductionBundleItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionBundleItem_CreatedBy");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.InductionBundleItems).HasConstraintName("FK_InductionBundleItem_DocumentLinkTableTypeID");

            entity.HasOne(d => d.InductionBundle).WithMany(p => p.InductionBundleItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionBundleItem_InductionBundle");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InductionBundleItemModifiedByUsers).HasConstraintName("FK_InductionBundleItem_ModifiedBy");
        });

        modelBuilder.Entity<InductionEnrolment>(entity =>
        {
            entity.HasKey(e => e.InductionEnrolmentID).HasName("PK__Inductio__F5ADF724EE426D1B");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InductionEnrolmentArchivedByUsers).HasConstraintName("FK_InductionEnrolment_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InductionEnrolmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionEnrolment_CreatedBy");

            entity.HasOne(d => d.InductionAllocation).WithMany(p => p.InductionEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionAllocation_InductionAllocation");

            entity.HasOne(d => d.InductionBundleItem).WithMany(p => p.InductionEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionEnrolment_InductionBundleItem");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InductionEnrolmentModifiedByUsers).HasConstraintName("FK_InductionEnrolment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.InductionEnrolments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InductionEnrolment_UserArea");
        });

        modelBuilder.Entity<InjuryType>(entity =>
        {
            entity.HasKey(e => e.InjuryTypeID).HasName("PK__InjuryTy__0B735E779F18E97D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InjuryTypeArchivedByUsers).HasConstraintName("FK_InjuryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InjuryTypeCreatedByUsers).HasConstraintName("FK_InjuryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InjuryTypeModifiedByUsers).HasConstraintName("FK_InjuryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.InjuryTypes).HasConstraintName("FK_InjuryType_UserAreaID");
        });

        modelBuilder.Entity<InjuryTypeBodyPart>(entity =>
        {
            entity.HasKey(e => e.InjuryTypeBodyPartID).HasName("PK__InjuryTy__ABD52C23F4CAA53D");

            entity.HasOne(d => d.BodyPart).WithMany(p => p.InjuryTypeBodyParts).HasConstraintName("FK_InjuryTypeBodyPart_BodyPartID");

            entity.HasOne(d => d.InjuryType).WithMany(p => p.InjuryTypeBodyParts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InjuryTypeBodyPart_InjuryTypeID");
        });

        modelBuilder.Entity<JobExecution>(entity =>
        {
            entity.HasIndex(e => new { e.UserAreaID, e.ExecutionStatus }, "IX_JobExecution_UserAreaID_ExecutionStatus").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.AttemptNumber).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ExecutionStartTime).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ExecutionStatus).HasDefaultValue("running");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.JobExecutionArchivedByUsers).HasConstraintName("FK_JobExecution_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.JobExecutionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobExecution_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.JobExecutionModifiedByUsers).HasConstraintName("FK_JobExecution_ModifiedByUser");

            entity.HasOne(d => d.ScheduledJob).WithMany(p => p.JobExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobExecution_ScheduledJob");

            entity.HasOne(d => d.UserArea).WithMany(p => p.JobExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobExecution_UserArea");
        });

        modelBuilder.Entity<JobRole>(entity =>
        {
            entity.HasKey(e => e.JobRoleID).HasName("PK__JobRole__6D8BAC0F9F6F67AD");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.JobRoleArchivedByUsers).HasConstraintName("FK_JobRole_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.JobRoleCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobRole_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.JobRoleModifiedByUsers).HasConstraintName("FK_JobRole_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.JobRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobRole_UserArea");
        });

        modelBuilder.Entity<JobRoleEmployee>(entity =>
        {
            entity.HasKey(e => e.JobRoleEmployeeID).HasName("PK__JobRoleE__F474C272F3C0572B");

            entity.HasOne(d => d.Employee).WithMany(p => p.JobRoleEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobRoleEmployee_Employee");

            entity.HasOne(d => d.JobRole).WithMany(p => p.JobRoleEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobRoleEmployee_JobRole");
        });

        modelBuilder.Entity<JobTemplate>(entity =>
        {
            entity.HasIndex(e => new { e.UserAreaID, e.TemplateCategory }, "IX_JobTemplate_UserAreaID_TemplateCategory").HasFilter("([ArchivedDate] IS NULL AND [IsActive]=(1))");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DefaultHttpMethod).HasDefaultValue("POST");
            entity.Property(e => e.DefaultMaxRetries).HasDefaultValue(3);
            entity.Property(e => e.DefaultTimeoutSeconds).HasDefaultValue(30);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.JobTemplateArchivedByUsers).HasConstraintName("FK_JobTemplate_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.JobTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobTemplate_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.JobTemplateModifiedByUsers).HasConstraintName("FK_JobTemplate_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.JobTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_JobTemplate_UserArea");
        });

        modelBuilder.Entity<LanguageType>(entity =>
        {
            entity.HasKey(e => e.LanguageTypeID).HasName("PK__Language__9BA512C5288E28BD");

            entity.Property(e => e.LanguageTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.UserArea).WithMany(p => p.LanguageTypes).HasConstraintName("FK_LanguageType_UserArea");
        });

        modelBuilder.Entity<Lead>(entity =>
        {
            entity.HasKey(e => e.LeadID).HasName("PK__Lead__73EF791A8DC7171E");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.LeadArchivedByUsers).HasConstraintName("FK_Lead_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.LeadCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Lead_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.LeadModifiedByUsers).HasConstraintName("FK_Lead_ModifiedBy");
        });

        modelBuilder.Entity<LegalRegister>(entity =>
        {
            entity.Property(e => e.EntryType).HasDefaultValue("Government");
        });

        modelBuilder.Entity<LegalRegister1>(entity =>
        {
            entity.HasIndex(e => new { e.UserAreaID, e.ComplianceStatus }, "IX_LegalRegister_ComplianceStatus").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => new { e.UserAreaID, e.IndustryName }, "IX_LegalRegister_IndustryName").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => new { e.UserAreaID, e.IsRecent }, "IX_LegalRegister_IsRecent").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => e.UserAreaID, "IX_LegalRegister_UserAreaID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.ComplianceStatus).HasDefaultValue("Under Review");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.LegalRegister1ArchivedByUsers).HasConstraintName("FK_LegalRegister_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.LegalRegister1CreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegister_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.LegalRegister1ModifiedByUsers).HasConstraintName("FK_LegalRegister_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.LegalRegister1s)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegister_UserArea");
        });

        modelBuilder.Entity<LegalRegisterAttachment>(entity =>
        {
            entity.HasOne(d => d.LegalRegister).WithMany(p => p.LegalRegisterAttachments).HasConstraintName("FK_LegalRegisterAttachments_LegalRegister");
        });

        modelBuilder.Entity<LegalRegisterAttachment1>(entity =>
        {
            entity.HasIndex(e => e.LegalRegisterID, "IX_LegalRegisterAttachment_LegalRegisterID").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.LegalRegisterAttachment1ArchivedByUsers).HasConstraintName("FK_LegalRegisterAttachment_ArchivedBy");

            entity.HasOne(d => d.Attachment).WithMany(p => p.LegalRegisterAttachment1s)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegisterAttachment_Attachment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.LegalRegisterAttachment1CreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegisterAttachment_CreatedBy");

            entity.HasOne(d => d.LegalRegister).WithMany(p => p.LegalRegisterAttachment1s)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegisterAttachment_LegalRegister");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.LegalRegisterAttachment1ModifiedByUsers).HasConstraintName("FK_LegalRegisterAttachment_ModifiedBy");
        });

        modelBuilder.Entity<LegalRegisterLinkedRecord>(entity =>
        {
            entity.HasIndex(e => e.LegalRegisterID, "IX_LegalRegisterLinkedRecord_LegalRegisterID").HasFilter("([ArchivedDate] IS NULL)");

            entity.HasIndex(e => new { e.LinkedRecordType, e.LinkedRecordID }, "IX_LegalRegisterLinkedRecord_LinkedRecord").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.LegalRegisterLinkedRecordArchivedByUsers).HasConstraintName("FK_LegalRegisterLinkedRecord_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.LegalRegisterLinkedRecordCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegisterLinkedRecord_CreatedBy");

            entity.HasOne(d => d.LegalRegister).WithMany(p => p.LegalRegisterLinkedRecords)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LegalRegisterLinkedRecord_LegalRegister");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.LegalRegisterLinkedRecordModifiedByUsers).HasConstraintName("FK_LegalRegisterLinkedRecord_ModifiedBy");
        });

        modelBuilder.Entity<Licence>(entity =>
        {
            entity.HasKey(e => e.LicenceID).HasName("PK__Licence__37087CCE611D182D");

            entity.Property(e => e.IsNotArchived).HasComputedColumnSql("(case when [ArchivedDate] IS NULL then (1) else (0) end)", true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.Licences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Licence_UserArea");
        });

        modelBuilder.Entity<LicenceHighLevelProductType>(entity =>
        {
            entity.HasKey(e => e.LicenceProductTypeID).HasName("PK__LicenceH__AC05D8F85B997CE4");

            entity.HasOne(d => d.HighLevelProductType).WithMany(p => p.LicenceHighLevelProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LicenceProductType_HighLevelProductTypeID");

            entity.HasOne(d => d.Licence).WithMany(p => p.LicenceHighLevelProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LicenceProductType_LicenceID");
        });

        modelBuilder.Entity<LocalAuthorityType>(entity =>
        {
            entity.HasKey(e => e.LocalAuthorityTypeID).HasName("PK__LocalAut__EAC44B6FBAB36862");

            entity.Property(e => e.LocalAuthorityTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.GeographicalAreaType).WithMany(p => p.LocalAuthorityTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocalAuthorityType_GeographicalAreaTypeID");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationID).HasName("PK__Location__E7FEA477BD346D4C");

            entity.Property(e => e.IsMain).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.LocationArchivedByUsers).HasConstraintName("FK_Location_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.LocationCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Location_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.LocationModifiedByUsers).HasConstraintName("FK_Location_ModifiedBy");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_Location_Location");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Locations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Location_UserArea");
        });

        modelBuilder.Entity<LocationEmployee>(entity =>
        {
            entity.HasKey(e => e.LocationEmployeeID).HasName("PK__Location__3D55BB5C1A9435BE");

            entity.HasOne(d => d.Employee).WithMany(p => p.LocationEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationEmployee_Employee");

            entity.HasOne(d => d.Location).WithMany(p => p.LocationEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationEmployee_Location");
        });

        modelBuilder.Entity<LocationType>(entity =>
        {
            entity.HasKey(e => e.LocationTypeID).HasName("PK__Location__737D32D9C24C7962");

            entity.Property(e => e.LocationTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<LogUserLogin>(entity =>
        {
            entity.HasKey(e => e.LogUserLoginID).HasName("PK__LogUserL__5AECF2B011971D81");

            entity.HasOne(d => d.UserArea).WithMany(p => p.LogUserLogins)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LogUserLogin_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.LogUserLogins)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LogUserLogin_User");
        });

        modelBuilder.Entity<LoginAction>(entity =>
        {
            entity.HasKey(e => e.LoginActionID).HasName("PK__LoginAct__B4B946EF896C9AC5");

            entity.HasOne(d => d.LoginActionType).WithMany(p => p.LoginActions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LoginAction_LoginActionType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.LoginActions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LoginAction_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.LoginActions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Login_User");
        });

        modelBuilder.Entity<LoginActionType>(entity =>
        {
            entity.HasKey(e => e.LoginActionTypeID).HasName("PK__LoginAct__1C2EEF52DCA6410D");

            entity.Property(e => e.LoginActionTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<MainActivityType>(entity =>
        {
            entity.HasKey(e => e.MainActivityTypeID).HasName("PK__MainActi__3BF7D019735B2D36");

            entity.Property(e => e.MainActivityTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.MainActivityTypeArchivedByUsers).HasConstraintName("FK_MainActivityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.MainActivityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MainActivityType_CreatedBy");

            entity.HasOne(d => d.MainIndustryType).WithMany(p => p.MainActivityTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MainActivityType_MainIndustryTypeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.MainActivityTypeModifiedByUsers).HasConstraintName("FK_MainActivityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MainActivityTypes).HasConstraintName("FK_MainActivityType_UserArea");
        });

        modelBuilder.Entity<MainFactorType>(entity =>
        {
            entity.HasKey(e => e.MainFactorTypeID).HasName("PK__MainFact__309BAAE669DFDAED");

            entity.Property(e => e.MainFactorTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.MainFactorTypeArchivedByUsers).HasConstraintName("FK_MainFactorType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.MainFactorTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MainFactorType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.MainFactorTypeModifiedByUsers).HasConstraintName("FK_MainFactorType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MainFactorTypes).HasConstraintName("FK_MainFactorType_UserArea");
        });

        modelBuilder.Entity<MainIndustryType>(entity =>
        {
            entity.HasKey(e => e.MainIndustryTypeID).HasName("PK__MainIndu__A16537D19700DF12");

            entity.Property(e => e.MainIndustryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.MainIndustryTypeArchivedByUsers).HasConstraintName("FK_MainIndustryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.MainIndustryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MainIndustryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.MainIndustryTypeModifiedByUsers).HasConstraintName("FK_MainIndustryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MainIndustryTypes).HasConstraintName("FK_MainIndustryType_UserArea");
        });

        modelBuilder.Entity<ManagerType>(entity =>
        {
            entity.HasKey(e => e.ManagerTypeID).HasName("PK__ManagerT__14D4F9A0B941D5A5");

            entity.Property(e => e.ManagerTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ManagerTypeArchivedByUsers).HasConstraintName("FK_ManagerType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ManagerTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ManagerType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ManagerTypeModifiedByUsers).HasConstraintName("FK_ManagerType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ManagerTypes).HasConstraintName("FK_ManagerType_UserArea");
        });

        modelBuilder.Entity<MaritalStatusType>(entity =>
        {
            entity.HasKey(e => e.MaritalStatusTypeID).HasName("PK__MaritalS__30DF3D3DDA0A75AF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.MaritalStatusTypeArchivedByUsers).HasConstraintName("FK_MaritalStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.MaritalStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MaritalStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.MaritalStatusTypeModifiedByUsers).HasConstraintName("FK_MaritalStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MaritalStatusTypes).HasConstraintName("FK_MaritalStatusType_UserArea");
        });

        modelBuilder.Entity<MethodStatement>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DocumentVersion).HasDefaultValue("1.0");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCurrentVersion).HasDefaultValue(true);
            entity.Property(e => e.MinimumPersonnel).HasDefaultValue(1);
        });

        modelBuilder.Entity<MethodStatementStep>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.PersonnelRequired).HasDefaultValue(1);
        });

        modelBuilder.Entity<MigrateV5TempChecklistQuestionnaireResponse>(entity =>
        {
            entity.Property(e => e.ROWID).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<MobileProperty>(entity =>
        {
            entity.HasKey(e => e.MobilePropertyID).HasName("PK__MobilePr__D4D6E3799C38373A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.MobilePropertyArchivedByUsers).HasConstraintName("FK_MobileProperty_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.MobilePropertyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MobileProperty_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.MobilePropertyModifiedByUsers).HasConstraintName("FK_MobileProperty_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MobileProperties).HasConstraintName("FK_MobileProperty_UserAreaID");

            entity.HasOne(d => d.User).WithMany(p => p.MobilePropertyUsers).HasConstraintName("FK_MobileProperty_UserID");
        });

        modelBuilder.Entity<MobileSubmission>(entity =>
        {
            entity.HasKey(e => e.MobileSubmissionID).HasName("PK__MobileSu__9C2B7F1D4103FCEA");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_AccidentCase");

            entity.HasOne(d => d.AssetInspection).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_AssetInspection");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_QuestionnaireResponse");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_RiskAssessment");

            entity.HasOne(d => d.RiskAssessmentMonitorEvent).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_RiskAssessmentMonitorEvent");

            entity.HasOne(d => d.Task).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_Task");

            entity.HasOne(d => d.UserArea).WithMany(p => p.MobileSubmissions).HasConstraintName("FK_MobileSubmission_UserArea");
        });

        modelBuilder.Entity<MobileSubmissionDataLog>(entity =>
        {
            entity.HasKey(e => e.MobileSubmissionDataLogID).HasName("PK__MobileSu__8590940F888412B3");

            entity.Property(e => e.IsError).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.MobileSubmissionDataLogs).HasConstraintName("FK_MobileSubmissionDataLog_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.MobileSubmissionDataLogs).HasConstraintName("FK_MobileSubmissionDataLog_User");
        });

        modelBuilder.Entity<ModuleType>(entity =>
        {
            entity.HasKey(e => e.ModuleTypeID).HasName("PK__ModuleTy__5EBC4F2C4E98901D");

            entity.Property(e => e.ModuleTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsMobileViewable).HasDefaultValue(false);
            entity.Property(e => e.IsNotArchived).HasComputedColumnSql("(case when [ArchivedDate] IS NULL then (1) else (0) end)", true);
            entity.Property(e => e.IsVisibleOnSidebar).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ModuleTypes).HasConstraintName("FK_ModuleType_ArchivedUser");

            entity.HasOne(d => d.DefaultSystemProductType).WithMany(p => p.ModuleTypes).HasConstraintName("FK_ModuleType_DefaultSystemProductType");

            entity.HasOne(d => d.DisplayPermission).WithMany(p => p.ModuleTypeDisplayPermissions).HasConstraintName("FK_ModuleType_DisplayPermission");

            entity.HasOne(d => d.RootPermission).WithMany(p => p.ModuleTypeRootPermissions).HasConstraintName("FK_ModuleType_RootPermission");
        });

        modelBuilder.Entity<MonitoringReportXsltTransformer>(entity =>
        {
            entity.HasKey(e => e.MonitoringReportXsltTransformerID).HasName("PK__Monitori__8A1715EA6EC4C89E");

            entity.Property(e => e.MonitoringReportXsltTransformerID).ValueGeneratedNever();
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.LanguageType).WithMany(p => p.MonitoringReportXsltTransformers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MonitoringReportXsltTransformer_LanguageType");

            entity.HasOne(d => d.RegionType).WithMany(p => p.MonitoringReportXsltTransformers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MonitoringReportXsltTransformer_RegionType");

            entity.HasOne(d => d.XsltTransformerType).WithMany(p => p.MonitoringReportXsltTransformers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MonitoringReportXsltTransformer_XsltTransformersType");
        });

        modelBuilder.Entity<NonWorkingDay>(entity =>
        {
            entity.HasKey(e => e.NonWorkingDayID).HasName("PK__NonWorki__2BB55D443520F519");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.NonWorkingDayArchivedByUsers).HasConstraintName("FK_NonWorkingDay_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.NonWorkingDayCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NonWorkingDay_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.NonWorkingDayModifiedByUsers).HasConstraintName("FK_NonWorkingDay_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.NonWorkingDays).HasConstraintName("FK_NonWorkingDay_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.NonWorkingDays)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NonWorkingDay_UserArea");
        });

        modelBuilder.Entity<NotWorkingCategoryType>(entity =>
        {
            entity.HasKey(e => e.NotWorkingCategoryTypeID).HasName("PK__NotWorki__9E6FB09868F73165");

            entity.Property(e => e.NotWorkingCategoryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.NotWorkingCategoryTypeArchivedByUsers).HasConstraintName("FK_NotWorkingCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.NotWorkingCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NotWorkingCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.NotWorkingCategoryTypeModifiedByUsers).HasConstraintName("FK_NotWorkingCategoryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.NotWorkingCategoryTypes).HasConstraintName("FK_NotWorkingCategoryType_UserArea");
        });

        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.NoteID).HasName("PK__Note__EACE357F813E8A07");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.NoteArchivedByUsers).HasConstraintName("FK_Note_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.NoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Note_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.NoteModifiedByUsers).HasConstraintName("FK_Note_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Notes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Note_UserArea");
        });

        modelBuilder.Entity<OccupationalDiseaseType>(entity =>
        {
            entity.HasKey(e => e.OccupationalDiseaseTypeID).HasName("PK__Occupati__A06A52D883A082BF");

            entity.Property(e => e.OccupationalDiseaseTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.OccupationalDiseaseTypeArchivedByUsers).HasConstraintName("FK_OccupationalDiseaseType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.OccupationalDiseaseTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OccupationalDiseaseType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.OccupationalDiseaseTypeModifiedByUsers).HasConstraintName("FK_OccupationalDiseaseType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.OccupationalDiseaseTypes).HasConstraintName("FK_OccupationalDiseaseType_UserArea");
        });

        modelBuilder.Entity<OperationType>(entity =>
        {
            entity.HasKey(e => e.OperationTypeID).HasName("PK__Operatio__FF7FE533E15F690A");

            entity.Property(e => e.OperationTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<OptionList>(entity =>
        {
            entity.HasKey(e => e.OptionListID).HasName("PK__OptionLi__4EF3D78112B85FE3");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.OptionListArchivedByUsers).HasConstraintName("FK_OptionList_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.OptionListCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OptionList_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.OptionListModifiedByUsers).HasConstraintName("FK_OptionList_ModifiedBy");

            entity.HasOne(d => d.Questionnaire).WithMany(p => p.OptionLists).HasConstraintName("FK_OptionList_Questionnaire");

            entity.HasOne(d => d.UserArea).WithMany(p => p.OptionLists).HasConstraintName("FK_OptionList_UserArea");
        });

        modelBuilder.Entity<OptionListItem>(entity =>
        {
            entity.HasKey(e => e.OptionListItemID).HasName("PK__OptionLi__4EDD1F1CA6ECD946");

            entity.Property(e => e.OrderIndex).HasDefaultValue(0);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.OptionListItemArchivedByUsers).HasConstraintName("FK_OptionListItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.OptionListItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OptionListItem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.OptionListItemModifiedByUsers).HasConstraintName("FK_OptionListItem_ModifiedBy");

            entity.HasOne(d => d.OptionList).WithMany(p => p.OptionListItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OptionListItem_OptionList");
        });

        modelBuilder.Entity<OrgGroup>(entity =>
        {
            entity.HasKey(e => e.OrgGroupID).HasName("PK__OrgGroup__973443D945821076");

            entity.Property(e => e.IsMain).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.OrgGroupArchivedByUsers).HasConstraintName("FK_OrgGroup_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.OrgGroupCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroup_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.OrgGroupModifiedByUsers).HasConstraintName("FK_OrgGroup_ModifiedBy");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_OrgGroup_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.OrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroup_UserArea");
        });

        modelBuilder.Entity<OrgGroupCategory>(entity =>
        {
            entity.HasKey(e => e.OrgGroupCategoryID).HasName("PK__OrgGroup__18CA2E582866749F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.OrgGroupCategoryArchivedByUsers).HasConstraintName("FK_OrgGroupCategory_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.OrgGroupCategoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupCategory_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.OrgGroupCategoryModifiedByUsers).HasConstraintName("FK_OrgGroupCategory_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.OrgGroupCategories).HasConstraintName("FK_OrgGroupCategory_UserArea");
        });

        modelBuilder.Entity<OrgGroupEmployee>(entity =>
        {
            entity.HasKey(e => e.OrgGroupEmployeeID).HasName("PK__OrgGroup__4F7189B59E3721EA");

            entity.HasOne(d => d.Employee).WithMany(p => p.OrgGroupEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupEmployee_Employee");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.OrgGroupEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupEmployee_OrgGroup");
        });

        modelBuilder.Entity<OrgGroupLocation>(entity =>
        {
            entity.HasKey(e => e.OrgGroupLocationID).HasName("PK__OrgGroup__E28392A77FFCB56A");

            entity.HasOne(d => d.Location).WithMany(p => p.OrgGroupLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupLocation_Location");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.OrgGroupLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupLocation_OrgGroup");
        });

        modelBuilder.Entity<OrgGroupTaskSetting>(entity =>
        {
            entity.HasKey(e => e.OrgGroupTaskSettingID).HasName("PK__OrgGroup__570EE460092543DD");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.OrgGroupTaskSettings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupTaskSetting_OrgGroup");

            entity.HasOne(d => d.TaskOverdueAlertEmployee).WithMany(p => p.OrgGroupTaskSettings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupTaskSetting_Employee");

            entity.HasOne(d => d.UserArea).WithMany(p => p.OrgGroupTaskSettings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupTaskSetting_UserArea");
        });

        modelBuilder.Entity<OrgGroupUser>(entity =>
        {
            entity.HasKey(e => e.OrgGroupUserID).HasName("PK__OrgGroup__2B7E37B9D3ED6CB4");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.OrgGroupUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupUser_OrgGroup");

            entity.HasOne(d => d.User).WithMany(p => p.OrgGroupUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrgGroupUser_User");
        });

        modelBuilder.Entity<PPEType>(entity =>
        {
            entity.HasKey(e => e.PPETypeID).HasName("PK__PPEType__5449D9AC652D22A5");

            entity.Property(e => e.PPETypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PPETypeArchivedByUsers).HasConstraintName("FK_PPEType_ArchivedBy");

            entity.HasOne(d => d.ControlMeasure).WithMany(p => p.PPETypes).HasConstraintName("FK_PPEType_ControlMeasure");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PPETypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PPEType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PPETypeModifiedByUsers).HasConstraintName("FK_PPEType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PPETypes).HasConstraintName("FK_PPEType_UserArea");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.PermissionID).HasName("PK__Permissi__EFA6FB0F9495B85F");

            entity.Property(e => e.IsNotArchived).HasComputedColumnSql("(case when [ArchivedDate] IS NULL then (1) else (0) end)", true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.Permissions).HasConstraintName("FK_Permission_ArchivedByUser");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_Permission_ParentID");
        });

        modelBuilder.Entity<PersonTitleType>(entity =>
        {
            entity.HasKey(e => e.PersonTitleTypeID).HasName("PK__PersonTi__4B3E53B2CF3F4906");

            entity.Property(e => e.OrderNum).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PersonTitleTypeArchivedByUsers).HasConstraintName("FK_PersonTitleType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PersonTitleTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonTitleType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PersonTitleTypeModifiedByUsers).HasConstraintName("FK_PersonTitleType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PersonTitleTypes).HasConstraintName("FK_PersonTitleType_UserArea");
        });

        modelBuilder.Entity<PersonsAtRisk>(entity =>
        {
            entity.HasKey(e => e.PersonsAtRiskID).HasName("PK__PersonsA__531C650A8042068F");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.PersonsAtRisks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonsAtRisk_UserArea");
        });

        modelBuilder.Entity<PersonsInCharge>(entity =>
        {
            entity.HasKey(e => e.PersonsInChargeID).HasName("PK__PersonsI__05D1078C852BE6F4");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.PersonsInCharges)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonsInCharge_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.PersonsInCharges)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonsInCharge_User");
        });

        modelBuilder.Entity<PlanCollection>(entity =>
        {
            entity.HasKey(e => e.PlanCollectionID).HasName("PK__PlanColl__AF533CE39A42EC89");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PlanCollectionArchivedByUsers).HasConstraintName("FK_PlanCollection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PlanCollectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollection_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PlanCollectionModifiedByUsers).HasConstraintName("FK_PlanCollection_ModifiedBy");

            entity.HasOne(d => d.PlanCollectionType).WithMany(p => p.PlanCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollection_PlanCollectionType");
        });

        modelBuilder.Entity<PlanCollectionItem>(entity =>
        {
            entity.HasKey(e => e.PlanCollectionItemID).HasName("PK__PlanColl__813A5FA64D614AC4");

            entity.HasOne(d => d.AlertType).WithMany(p => p.PlanCollectionItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollectionItem_AlertType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PlanCollectionItemArchivedByUsers).HasConstraintName("FK_PlanCollectionItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PlanCollectionItemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollectionItem_CreatedBy");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.PlanCollectionItems).HasConstraintName("FK_PlanCollectionItem_DocumentLinkTableType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PlanCollectionItemModifiedByUsers).HasConstraintName("FK_PlanCollectionItem_ModifiedBy");

            entity.HasOne(d => d.PlanCollection).WithMany(p => p.PlanCollectionItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollectionItem_PlanCollection");
        });

        modelBuilder.Entity<PlanCollectionType>(entity =>
        {
            entity.HasKey(e => e.PlanCollectionTypeID).HasName("PK__PlanColl__C3C0A2DC17C1F6C1");

            entity.Property(e => e.PlanCollectionTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PlanCollectionTypeArchivedByUsers).HasConstraintName("FK_PlanCollectionType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PlanCollectionTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlanCollectionType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PlanCollectionTypeModifiedByUsers).HasConstraintName("FK_PlanCollectionType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PlanCollectionTypes).HasConstraintName("FK_PlanCollectionType_UserArea");
        });

        modelBuilder.Entity<Policy>(entity =>
        {
            entity.HasKey(e => e.PolicyID).HasName("PK__Policy__2E13394416B34172");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCurrentVersion).HasDefaultValue(true);
            entity.Property(e => e.PolicyVersion).HasDefaultValue("1.0");
            entity.Property(e => e.RequiresAcknowledgment).HasDefaultValue(true);
            entity.Property(e => e.RequiresTraining).HasDefaultValue(false);
            entity.Property(e => e.ReviewFrequencyMonths).HasDefaultValue(12);

            entity.HasOne(d => d.ApproverUser).WithMany(p => p.PolicyApproverUsers).HasConstraintName("FK_Policy_Approver");

            entity.HasOne(d => d.AuthorUser).WithMany(p => p.PolicyAuthorUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Policy_Author");

            entity.HasOne(d => d.PolicyCategory).WithMany(p => p.Policies).HasConstraintName("FK_Policy_PolicyCategory");

            entity.HasOne(d => d.PolicyOwnerUser).WithMany(p => p.PolicyPolicyOwnerUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Policy_PolicyOwner");

            entity.HasOne(d => d.PolicyStatusType).WithMany(p => p.Policies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Policy_PolicyStatus");

            entity.HasOne(d => d.PolicyType).WithMany(p => p.Policies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Policy_PolicyType");

            entity.HasOne(d => d.PreviousVersion).WithMany(p => p.InversePreviousVersion).HasConstraintName("FK_Policy_PreviousVersion");

            entity.HasOne(d => d.PublishedByUser).WithMany(p => p.PolicyPublishedByUsers).HasConstraintName("FK_Policy_Publisher");

            entity.HasOne(d => d.ReviewerUser).WithMany(p => p.PolicyReviewerUsers).HasConstraintName("FK_Policy_Reviewer");

            entity.HasOne(d => d.TrainingCourse).WithMany(p => p.Policies).HasConstraintName("FK_Policy_TrainingCourse");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Policies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Policy_UserArea");
        });

        modelBuilder.Entity<PolicyAcknowledgment>(entity =>
        {
            entity.HasKey(e => e.PolicyAcknowledgmentID).HasName("PK__PolicyAc__3AB82FDEFC426B20");

            entity.Property(e => e.AcknowledgmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.AcknowledgmentMethod).HasDefaultValue("Digital");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsVerified).HasDefaultValue(true);

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyAcknowledgments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAcknowledgment_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyAcknowledgments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAcknowledgment_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.PolicyAcknowledgments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAcknowledgment_User");
        });

        modelBuilder.Entity<PolicyApprovalLog>(entity =>
        {
            entity.HasKey(e => e.PolicyApprovalLogID).HasName("PK__PolicyAp__80119CAA6AF4D6FD");

            entity.Property(e => e.ApprovalDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ApprovalLevel).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ApproverUser).WithMany(p => p.PolicyApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyApprovalLog_Approver");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyApprovalLog_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyApprovalLog_UserArea");
        });

        modelBuilder.Entity<PolicyAttachment>(entity =>
        {
            entity.HasKey(e => e.PolicyAttachmentID).HasName("PK__PolicyAt__E311F73A549B1A0D");

            entity.Property(e => e.AttachmentType).HasDefaultValue("Document");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsRequired).HasDefaultValue(false);
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Attachment).WithMany(p => p.PolicyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAttachment_Attachment");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAttachment_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyAttachment_UserArea");
        });

        modelBuilder.Entity<PolicyCategory>(entity =>
        {
            entity.HasKey(e => e.PolicyCategoryID).HasName("PK__PolicyCa__C0F36D7DAC00D5F4");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(0);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory).HasConstraintName("FK_PolicyCategory_Parent");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyCategory_UserArea");
        });

        modelBuilder.Entity<PolicyCompliance>(entity =>
        {
            entity.HasKey(e => e.PolicyComplianceID).HasName("PK__PolicyCo__713C61264B7F442E");

            entity.Property(e => e.ComplianceDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ExemptionApprovedByNavigation).WithMany(p => p.PolicyComplianceExemptionApprovedByNavigations).HasConstraintName("FK_PolicyCompliance_ExemptionApprover");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyCompliances)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyCompliance_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyCompliances)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyCompliance_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.PolicyComplianceUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyCompliance_User");
        });

        modelBuilder.Entity<PolicyExternalLink>(entity =>
        {
            entity.HasKey(e => e.PolicyExternalLinkID).HasName("PK__PolicyEx__6F29590993B6B649");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.LinkType).HasDefaultValue("Reference");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyExternalLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyExternalLink_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyExternalLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyExternalLink_UserArea");
        });

        modelBuilder.Entity<PolicyLocationAssignment>(entity =>
        {
            entity.HasKey(e => e.PolicyLocationAssignmentID).HasName("PK__PolicyLo__E6F4F6159B3774D8");

            entity.Property(e => e.AssignmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Location).WithMany(p => p.PolicyLocationAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyLocationAssignment_Location");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyLocationAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyLocationAssignment_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyLocationAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyLocationAssignment_UserArea");
        });

        modelBuilder.Entity<PolicyOrgGroupAssignment>(entity =>
        {
            entity.HasKey(e => e.PolicyOrgGroupAssignmentID).HasName("PK__PolicyOr__5B0E779538129F2E");

            entity.Property(e => e.AssignmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsMandatory).HasDefaultValue(true);

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.PolicyOrgGroupAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyOrgGroupAssignment_OrgGroup");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyOrgGroupAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyOrgGroupAssignment_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyOrgGroupAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyOrgGroupAssignment_UserArea");
        });

        modelBuilder.Entity<PolicyReview>(entity =>
        {
            entity.HasKey(e => e.PolicyReviewID).HasName("PK__PolicyRe__BA2C37FE7BC5D2AE");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ReviewDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyReviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyReview_Policy");

            entity.HasOne(d => d.ReviewerUser).WithMany(p => p.PolicyReviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyReview_Reviewer");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyReviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyReview_UserArea");
        });

        modelBuilder.Entity<PolicyStatusType>(entity =>
        {
            entity.HasKey(e => e.PolicyStatusTypeID).HasName("PK__PolicySt__AB37073D9C85C0DC");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<PolicyTag>(entity =>
        {
            entity.HasKey(e => e.PolicyTagID).HasName("PK__PolicyTa__903E6BDD8A1B11D0");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyTag_UserArea");
        });

        modelBuilder.Entity<PolicyTagAssignment>(entity =>
        {
            entity.HasKey(e => e.PolicyTagAssignmentID).HasName("PK__PolicyTa__B5C4EE9B7448D4D8");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyTagAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyTagAssignment_Policy");

            entity.HasOne(d => d.PolicyTag).WithMany(p => p.PolicyTagAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyTagAssignment_Tag");
        });

        modelBuilder.Entity<PolicyType>(entity =>
        {
            entity.HasKey(e => e.PolicyTypeID).HasName("PK__PolicyTy__90DE2D5EE71CBFB6");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.RequiresAcknowledgment).HasDefaultValue(true);
            entity.Property(e => e.RequiresApproval).HasDefaultValue(true);
            entity.Property(e => e.RequiresTraining).HasDefaultValue(false);
            entity.Property(e => e.ReviewFrequencyMonths).HasDefaultValue(12);

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyTypes).HasConstraintName("FK_PolicyType_UserArea");
        });

        modelBuilder.Entity<PolicyUserAssignment>(entity =>
        {
            entity.HasKey(e => e.PolicyUserAssignmentID).HasName("PK__PolicyUs__04E55B6014E8F3B5");

            entity.Property(e => e.AssignmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.Priority).HasDefaultValue("Normal");
            entity.Property(e => e.Status).HasDefaultValue("Assigned");

            entity.HasOne(d => d.AssignedByUser).WithMany(p => p.PolicyUserAssignmentAssignedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyUserAssignment_AssignedBy");

            entity.HasOne(d => d.AssignedToUser).WithMany(p => p.PolicyUserAssignmentAssignedToUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyUserAssignment_AssignedTo");

            entity.HasOne(d => d.Policy).WithMany(p => p.PolicyUserAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyUserAssignment_Policy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PolicyUserAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PolicyUserAssignment_UserArea");
        });

        modelBuilder.Entity<PrintedHeader>(entity =>
        {
            entity.HasKey(e => e.PrintedHeaderID).HasName("PK__PrintedH__CA57F9B63BFF49F5");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.PrintedHeaderArchivedByUsers).HasConstraintName("FK_PrintedHeader_ArchivedByUserID");

            entity.HasOne(d => d.Attachment).WithMany(p => p.PrintedHeaders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PrintedHeader_AttachmentID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.PrintedHeaderCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PrintedHeader_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.PrintedHeaderModifiedByUsers).HasConstraintName("FK_PrintedHeader_ModifiedByUserID");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.PrintedHeaders).HasConstraintName("FK_PrintedHeader_OrgGroupID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.PrintedHeaders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PrintedHeader_UserAreaID");
        });

        modelBuilder.Entity<Process>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsTemplate).HasDefaultValue(false);
            entity.Property(e => e.MaxRetries).HasDefaultValue(3);
            entity.Property(e => e.Priority).HasDefaultValue("Medium");
            entity.Property(e => e.Status).HasDefaultValue("Active");
            entity.Property(e => e.TimeoutMinutes).HasDefaultValue(60);
            entity.Property(e => e.Version).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ProcessArchivedByUsers).HasConstraintName("FK_Process_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ProcessCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Process_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ProcessModifiedByUsers).HasConstraintName("FK_Process_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Processes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Process_UserArea");
        });

        modelBuilder.Entity<ProcessExecution>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ProcessExecutionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessExecution_CreatedBy");

            entity.HasOne(d => d.Process).WithMany(p => p.ProcessExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessExecution_Process");

            entity.HasOne(d => d.StartedByUser).WithMany(p => p.ProcessExecutionStartedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessExecution_StartedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ProcessExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessExecution_UserArea");
        });

        modelBuilder.Entity<ProcessStep>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.GeneratesTask).HasDefaultValue(false);
            entity.Property(e => e.IsConditional).HasDefaultValue(false);

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ProcessSteps)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessStep_CreatedBy");

            entity.HasOne(d => d.Process).WithMany(p => p.ProcessSteps)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessStep_Process");

            entity.HasOne(d => d.TaskType).WithMany(p => p.ProcessSteps).HasConstraintName("FK_ProcessStep_TaskType");
        });

        modelBuilder.Entity<ProcessStepExecution>(entity =>
        {
            entity.Property(e => e.RetryCount).HasDefaultValue(0);

            entity.HasOne(d => d.CompletedByUser).WithMany(p => p.ProcessStepExecutions).HasConstraintName("FK_ProcessStepExecution_CompletedBy");

            entity.HasOne(d => d.GeneratedTask).WithMany(p => p.ProcessStepExecutions).HasConstraintName("FK_ProcessStepExecution_Task");

            entity.HasOne(d => d.ProcessExecution).WithMany(p => p.ProcessStepExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessStepExecution_ProcessExecution");

            entity.HasOne(d => d.ProcessStep).WithMany(p => p.ProcessStepExecutions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessStepExecution_ProcessStep");
        });

        modelBuilder.Entity<ProcessedDocument>(entity =>
        {
            entity.HasKey(e => e.ProcessedDocumentID).HasName("PK__Processe__3648FEC1B603B095");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ProcessedDocumentArchivedByUsers).HasConstraintName("FK_ProcessedDocument_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ProcessedDocumentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessedDocument_CreatedBy");

            entity.HasOne(d => d.DocumentAttachment).WithMany(p => p.ProcessedDocuments).HasConstraintName("FK_ConvertedDocument_DocumentAttachment");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ProcessedDocumentModifiedByUsers).HasConstraintName("FK_ProcessedDocument_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ProcessedDocuments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProcessedDocument_UserArea");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeID).HasName("PK__ProductT__A1312F4E323D968B");
        });

        modelBuilder.Entity<ProductTypeHighLevelProductType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeHighLevelProductTypeID).HasName("PK__ProductT__9A67BD90E83139A3");

            entity.HasOne(d => d.HighLevelProductType).WithMany(p => p.ProductTypeHighLevelProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductTypeHighLevelProductType_HighLevelProductType");

            entity.HasOne(d => d.ProductType).WithMany(p => p.ProductTypeHighLevelProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductTypeHighLevelProductType_ProductType");
        });

        modelBuilder.Entity<ProductTypeModuleType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeModuleTypeID).HasName("PK__ProductT__CB2777070DE860E2");

            entity.HasOne(d => d.ModuleType).WithMany(p => p.ProductTypeModuleTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductTypeModuleType_ModuleType");

            entity.HasOne(d => d.ProductType).WithMany(p => p.ProductTypeModuleTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductTypeModuleType_ProductType");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionID).HasName("PK__Question__0DC06F8CCDB19CA6");

            entity.Property(e => e.AllowFurtherActions).HasDefaultValue(true);
            entity.Property(e => e.IsMandatory).HasDefaultValue(true);

            entity.HasOne(d => d.AnswerGrid).WithMany(p => p.Questions).HasConstraintName("FK_Question_AnswerGrid");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.Questions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_AnswerType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionArchivedByUsers).HasConstraintName("FK_Question_ArchivedBy");

            entity.HasOne(d => d.Attachment).WithMany(p => p.Questions).HasConstraintName("FK_Question_AttachmentID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_CreatedBy");

            entity.HasOne(d => d.ElementType).WithMany(p => p.Questions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_ElementType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionModifiedByUsers).HasConstraintName("FK_Question_ModifiedBy");

            entity.HasOne(d => d.OptionList).WithMany(p => p.Questions).HasConstraintName("FK_Question_OptionList");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent).HasConstraintName("FK_Question_ParentID");

            entity.HasOne(d => d.QuestionnaireSection).WithMany(p => p.Questions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_QuestionnaireSection");

            entity.HasOne(d => d.QuestionnaireTypeKeyField).WithMany(p => p.Questions).HasConstraintName("FK_Question_QuestionnaireTypeKeyFieldID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Questions).HasConstraintName("FK_Question_UserArea");
        });

        modelBuilder.Entity<QuestionAnswer>(entity =>
        {
            entity.HasKey(e => e.QuestionAnswerID).HasName("PK__Question__86BEDFEF1C89D409");

            entity.HasOne(d => d.ActionType).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_ActionType");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.QuestionAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionAnswer_AnswerType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionAnswerArchivedByUsers).HasConstraintName("FK_QuestionAnswer_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionAnswerCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionAnswer_CreatedBy");

            entity.HasOne(d => d.JumpToSectionNavigation).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_QuestionnaireSection");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_ManagerEmployee");

            entity.HasOne(d => d.ManagerOrgGroup).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_ManagerOrgGroup");

            entity.HasOne(d => d.ManagerType).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_ManagerType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionAnswerModifiedByUsers).HasConstraintName("FK_QuestionAnswer_ModifiedBy");

            entity.HasOne(d => d.OptionList).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_OptionlistItem");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionAnswer_Question");

            entity.HasOne(d => d.TaskSeverity).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_TaskSeverity");

            entity.HasOne(d => d.UserArea).WithMany(p => p.QuestionAnswers).HasConstraintName("FK_QuestionAnswer_UserArea");
        });

        modelBuilder.Entity<QuestionAnswerBackup>(entity =>
        {
            entity.Property(e => e.QuestionAnswerID).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<QuestionOptionListItem>(entity =>
        {
            entity.HasKey(e => e.QuestionOptionListItemID).HasName("PK__Question__12473C7D36987F58");

            entity.HasOne(d => d.OptionListItem).WithMany(p => p.QuestionOptionListItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionOptionListItem_OptionListItemID");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionOptionListItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionOptionListItem_QuestionID");
        });

        modelBuilder.Entity<QuestionResponse>(entity =>
        {
            entity.HasKey(e => e.QuestionResponseID).HasName("PK__Question__4BB959452671E2CF");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.QuestionResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionResponse_AnswerType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionResponseArchivedByUsers).HasConstraintName("FK_QuestionResponse_ArchivedBy");

            entity.HasOne(d => d.Attachment).WithMany(p => p.QuestionResponses).HasConstraintName("FK_QuestionResponse_AttachmentID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionResponseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionResponse_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionResponseModifiedByUsers).HasConstraintName("FK_QuestionResponse_ModifiedBy");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionResponse_Question");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.QuestionResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionResponse_QuestionnaireResponse");

            entity.HasOne(d => d.UserArea).WithMany(p => p.QuestionResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionResponse_UserArea");
        });

        modelBuilder.Entity<QuestionStaticDataItem>(entity =>
        {
            entity.HasKey(e => e.QuestionStaticDataItemID).HasName("PK__Question__5B586882F26608D8");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionStaticDataItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionStaticDataItem_QuestionID");

            entity.HasOne(d => d.QuestionnaireStaticDataType).WithMany(p => p.QuestionStaticDataItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionStaticDataItem_QuestionnaireStaticDataTypeID");
        });

        modelBuilder.Entity<QuestionValidation>(entity =>
        {
            entity.HasKey(e => e.QuestionValidationID).HasName("PK__Question__BE31910F610401EE");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionValidations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionValidation_QuestionID");

            entity.HasOne(d => d.ValidationType).WithMany(p => p.QuestionValidations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionValidation_ValidationTypeID");
        });

        modelBuilder.Entity<Questionnaire>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireID).HasName("PK__Question__A56EF4055F0A720D");

            entity.Property(e => e.MajorVersion).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionnaireArchivedByUsers).HasConstraintName("FK_Questionnaire_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionnaireCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questionnaire_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionnaireModifiedByUsers).HasConstraintName("FK_Questionnaire_ModifiedBy");

            entity.HasOne(d => d.OriginalQuestionnaire).WithMany(p => p.InverseOriginalQuestionnaire).HasConstraintName("FK_Questionnaire_OriginalID");

            entity.HasOne(d => d.QuestionnaireDisclaimerType).WithMany(p => p.Questionnaires).HasConstraintName("CK_Questionnaire_QuestionnaireDisclaimer");

            entity.HasOne(d => d.QuestionnaireType).WithMany(p => p.Questionnaires)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questionnaire_QuestionnaireType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Questionnaires).HasConstraintName("FK_Questionnaire_UserArea");
        });

        modelBuilder.Entity<QuestionnaireDisclaimerType>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireDisclaimerTypeID).HasName("PK__Question__644737B053E0BC51");

            entity.Property(e => e.QuestionnaireDisclaimerTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<QuestionnaireResponse>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireResponseID).HasName("PK__Question__30E353278A4CBDBE");

            entity.Property(e => e.CompletedTimeframe).IsFixedLength();
            entity.Property(e => e.IsApprovedSubmission).HasDefaultValue(true);

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_AccidentCase");

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_AccidentFormTypeID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionnaireResponseArchivedByUsers).HasConstraintName("FK_QuestionnaireResponse_ArchivedBy");

            entity.HasOne(d => d.ChecklistEnrolment).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_ChecklistEnrolmentID");

            entity.HasOne(d => d.CourseEnrollment).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_CourseEnrollmentID");

            entity.HasOne(d => d.CourseEnrolment).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_CourseEnrolment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionnaireResponseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponse_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_EmployeeID");

            entity.HasOne(d => d.InductionEnrolment).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_InductionEnrolmentID");

            entity.HasOne(d => d.Location).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionnaireResponseModifiedByUsers).HasConstraintName("FK_QuestionnaireResponse_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.QuestionnaireResponses).HasConstraintName("FK_QuestionnaireResponse_OrgGroupID");

            entity.HasOne(d => d.Questionnaire).WithMany(p => p.QuestionnaireResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponse_Questionnaire");

            entity.HasOne(d => d.UserArea).WithMany(p => p.QuestionnaireResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponse_UserArea");
        });

        modelBuilder.Entity<QuestionnaireResponseAttachment>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireResponseAttachment1).HasName("PK__Question__464F8B935EF6A8A5");

            entity.HasOne(d => d.Attachment).WithMany(p => p.QuestionnaireResponseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseAttachment_Attachment");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.QuestionnaireResponseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseAttachment_QuestionnaireResponse");
        });

        modelBuilder.Entity<QuestionnaireResponseNote>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireResponseNoteID).HasName("PK__Question__B456723BACFC4144");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionnaireResponseNoteArchivedByUsers).HasConstraintName("FK_QuestionnaireResponseNote_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionnaireResponseNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseNote_CreatedByUser");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.QuestionnaireResponseNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseNote_QuestionnaireResponse");
        });

        modelBuilder.Entity<QuestionnaireResponseSignOff>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireResponseSignOffID).HasName("PK__Question__1EDCB28A33CCB1E6");

            entity.HasOne(d => d.PrimaryQuestionnaireResponse).WithMany(p => p.QuestionnaireResponseSignOffPrimaryQuestionnaireResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseSignOff_PrimaryQuestionnaireResponse");

            entity.HasOne(d => d.SignOffQuestionnaireResponse).WithMany(p => p.QuestionnaireResponseSignOffSignOffQuestionnaireResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponseSignOff_SignOffQuestionnaireResponse");
        });

        modelBuilder.Entity<QuestionnaireResponseXML>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireResponseXMLID).HasName("PK__Question__8A4A89E34A8F8803");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.QuestionnaireResponseXMLs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireResponse_QuestionnaireResponseID");
        });

        modelBuilder.Entity<QuestionnaireSection>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireSectionID).HasName("PK__Question__2FB63FF761623969");

            entity.Property(e => e.ShowByDefault).HasDefaultValue(true);
            entity.Property(e => e.ShowSlideTitle).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.QuestionnaireSectionArchivedByUsers).HasConstraintName("FK_QuestionnaireSection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.QuestionnaireSectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireSection_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.QuestionnaireSectionModifiedByUsers).HasConstraintName("FK_QuestionnaireSection_ModifiedBy");

            entity.HasOne(d => d.Questionnaire).WithMany(p => p.QuestionnaireSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireSection_Questionnaire");

            entity.HasOne(d => d.QuestionnaireTypeKeyFieldCategory).WithMany(p => p.QuestionnaireSections).HasConstraintName("FK_QuestionnaireSection_QuestionnaireTypeKeyFieldCategoryID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.QuestionnaireSections).HasConstraintName("FK_QuestionnaireSection_UserArea");
        });

        modelBuilder.Entity<QuestionnaireStaticDataType>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireStaticDataTypeID).HasName("PK__Question__423397F4D5FCF0FD");

            entity.Property(e => e.QuestionnaireStaticDataTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsPostBackRequired).HasDefaultValue(true);
        });

        modelBuilder.Entity<QuestionnaireStatusType>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireStatusTypeID).HasName("PK__Question__233B0EF789DE2CC5");

            entity.Property(e => e.QuestionnaireStatusTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsVisible).HasDefaultValue(false);
        });

        modelBuilder.Entity<QuestionnaireType>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireTypeID).HasName("PK__Question__5E68A8A34259E90E");

            entity.Property(e => e.QuestionnaireTypeID).ValueGeneratedNever();
            entity.Property(e => e.IsELearning).HasDefaultValue(false);
        });

        modelBuilder.Entity<QuestionnaireTypeKeyField>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireTypeKeyFieldID).HasName("PK__Question__A8564B5198EDB6B1");

            entity.Property(e => e.QuestionnaireTypeKeyFieldID).ValueGeneratedNever();

            entity.HasOne(d => d.AnswerType).WithMany(p => p.QuestionnaireTypeKeyFields)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireTypeKeyField_AnswerTypeID");

            entity.HasOne(d => d.QuestionnaireType).WithMany(p => p.QuestionnaireTypeKeyFields)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireTypeKeyField_QuestionnaireTypeID");

            entity.HasOne(d => d.QuestionnaireTypeKeyFieldCategory).WithMany(p => p.QuestionnaireTypeKeyFields)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireTypeKeyField_QuestionnaireTypeKeyFieldCategoryID");
        });

        modelBuilder.Entity<QuestionnaireTypeKeyFieldCategory>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireTypeKeyFieldCategoryID).HasName("PK__Question__83A9D3B2B5858588");

            entity.Property(e => e.QuestionnaireTypeKeyFieldCategoryID).ValueGeneratedNever();
        });

        modelBuilder.Entity<QuestionnaireTypeKeyFieldLink>(entity =>
        {
            entity.HasKey(e => e.QuestionnaireTypeKeyFieldLinkId).HasName("PK__Question__2959F0A05802A3E8");

            entity.HasOne(d => d.QuestionnaireTypeKeyFieldChildNavigation).WithMany(p => p.QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldChildNavigations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireTypeKeyFieldLink_Child");

            entity.HasOne(d => d.QuestionnaireTypeKeyFieldParentNavigation).WithMany(p => p.QuestionnaireTypeKeyFieldLinkQuestionnaireTypeKeyFieldParentNavigations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionnaireTypeKeyFieldLink_Parent");
        });

        modelBuilder.Entity<RIDDORSubmission>(entity =>
        {
            entity.HasKey(e => e.RIDDORSubmissionID).HasName("PK__RIDDORSu__700B9A027D78DE99");

            entity.HasOne(d => d.AccidentCase).WithMany(p => p.RIDDORSubmissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RIDDORSubmission_AccidentCase");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RIDDORSubmissionArchivedByUsers).HasConstraintName("FK_RIDDORSubmission_ArchiveddBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RIDDORSubmissionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RIDDORSubmission_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RIDDORSubmissionModifiedByUsers).HasConstraintName("FK_RIDDORSubmission_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RIDDORSubmissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RIDDORSubmission_UserArea");
        });

        modelBuilder.Entity<RecruitmentType>(entity =>
        {
            entity.HasKey(e => e.RecruitmentTypeID).HasName("PK__Recruitm__28E7BE4890EC5201");

            entity.Property(e => e.RecruitmentTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RecruitmentTypeArchivedByUsers).HasConstraintName("FK_RecruitmentType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RecruitmentTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RecruitmentTypeModifiedByUsers).HasConstraintName("FK_RecruitmentType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RecruitmentTypes).HasConstraintName("FK_RecruitmentType_UserArea");
        });

        modelBuilder.Entity<RecruitmentTypeVacancy>(entity =>
        {
            entity.HasKey(e => e.RecruitmentTypeVacancyID).HasName("PK__Recruitm__618720CA1D3CA835");

            entity.HasOne(d => d.RecruitmentType).WithMany(p => p.RecruitmentTypeVacancies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentTypeVacancy_RecruitmentType");

            entity.HasOne(d => d.RecruitmentVacancy).WithMany(p => p.RecruitmentTypeVacancies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentTypeVacancy_RecruitmentVacancy");
        });

        modelBuilder.Entity<RecruitmentVacancy>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyID).HasName("PK__Recruitm__7B596B979E88F2FD");

            entity.Property(e => e.TotalVacancies).HasDefaultValue((byte)1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RecruitmentVacancyArchivedByUsers).HasConstraintName("FK_RecruitmentVacancy_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RecruitmentVacancyCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancy_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RecruitmentVacancyModifiedByUsers).HasConstraintName("FK_RecruitmentVacancy_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RecruitmentVacancies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancy_UserArea");
        });

        modelBuilder.Entity<RecruitmentVacancyApplicant>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyApplicantID).HasName("PK__Recruitm__C0EC05B6C6F3DEC5");

            entity.HasOne(d => d.ApplicationStatusType).WithMany(p => p.RecruitmentVacancyApplicants)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyApplicant_ApplicationStatusType");

            entity.HasOne(d => d.Contact).WithMany(p => p.RecruitmentVacancyApplicants)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyApplicant_Contact");

            entity.HasOne(d => d.RecruitmentVacancy).WithMany(p => p.RecruitmentVacancyApplicants)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyApplicant_RecruitmentVacancy");
        });

        modelBuilder.Entity<RecruitmentVacancyAttachment>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyAttachmentID).HasName("PK__Recruitm__F5004DCFC25040F7");

            entity.HasOne(d => d.Attachment).WithMany(p => p.RecruitmentVacancyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyAttachment_Attachment");

            entity.HasOne(d => d.Contact).WithMany(p => p.RecruitmentVacancyAttachments).HasConstraintName("FK_RecruitmentVacancyAttachment_Contact");

            entity.HasOne(d => d.RecruitmentVacancyApplicant).WithMany(p => p.RecruitmentVacancyAttachments).HasConstraintName("FK_RecruitmentVacancyAttachment_RecruitmentVacancyApplicant");

            entity.HasOne(d => d.RecruitmentVacancyAttachmentType).WithMany(p => p.RecruitmentVacancyAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyAttachment_RecruitmentVacancyAttachmentType");

            entity.HasOne(d => d.RecruitmentVacancy).WithMany(p => p.RecruitmentVacancyAttachments).HasConstraintName("FK_RecruitmentVacancyAttachment_RecruitmentVacancy");
        });

        modelBuilder.Entity<RecruitmentVacancyAttachmentType>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyAttachmentTypeID).HasName("PK__Recruitm__9BC89432301AC6AB");

            entity.Property(e => e.RecruitmentVacancyAttachmentTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<RecruitmentVacancyInfoItem>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyInfoItemID).HasName("PK__Recruitm__40DD70E636936751");

            entity.HasOne(d => d.RecruitmentVacancy).WithMany(p => p.RecruitmentVacancyInfoItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyInfoItem_RecruitmentVacancy");
        });

        modelBuilder.Entity<RecruitmentVacancyInterview>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyInterviewID).HasName("PK__Recruitm__A3EC44B8C379303F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RecruitmentVacancyInterviewArchivedByUsers).HasConstraintName("FK_RecruitmentVacancyInterview_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RecruitmentVacancyInterviewCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyInterview_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RecruitmentVacancyInterviewModifiedByUsers).HasConstraintName("FK_RecruitmentVacancyInterview_ModifiedBy");

            entity.HasOne(d => d.RecruitmentVacancyApplicant).WithMany(p => p.RecruitmentVacancyInterviews)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyInterview_RecruitmentVacancyApplicant");
        });

        modelBuilder.Entity<RecruitmentVacancyTagType>(entity =>
        {
            entity.HasKey(e => e.RecruitmentVacancyTagTypeID).HasName("PK__Recruitm__3A0237C98D3FE0CA");

            entity.HasOne(d => d.RecruitmentVacancy).WithMany(p => p.RecruitmentVacancyTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyTagType_RecruitmentVacancy");

            entity.HasOne(d => d.TagType).WithMany(p => p.RecruitmentVacancyTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecruitmentVacancyTagType_TagType");
        });

        modelBuilder.Entity<ReferrerFriend>(entity =>
        {
            entity.HasKey(e => e.ReferrerFriendID).HasName("PK__Referrer__5DDF469B5B342DDB");

            entity.HasOne(d => d.ReferrerStatusType).WithMany(p => p.ReferrerFriends)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerFriend_ReferrerStatusType");

            entity.HasOne(d => d.ReferrerUser).WithMany(p => p.ReferrerFriends)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerFriend_ReferrerUser");
        });

        modelBuilder.Entity<ReferrerFriendBenefit>(entity =>
        {
            entity.HasKey(e => e.ReferrerFriendBenefitID).HasName("PK__Referrer__BA0B33FC0F8A0D43");

            entity.HasOne(d => d.BenefitType).WithMany(p => p.ReferrerFriendBenefits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerFriendBenefit_BenefitType");

            entity.HasOne(d => d.ReferrerFriend).WithMany(p => p.ReferrerFriendBenefits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerFriendBenefit_ReferrerFriend");
        });

        modelBuilder.Entity<ReferrerStatusType>(entity =>
        {
            entity.HasKey(e => e.ReferrerStatusTypeID).HasName("PK__Referrer__AA7F5B69ADBE3908");

            entity.Property(e => e.ReferrerStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ReferrerUser>(entity =>
        {
            entity.HasKey(e => e.ReferrerUserID).HasName("PK__Referrer__F8DF5D4EEDC14D4D");
        });

        modelBuilder.Entity<ReferrerUserBenefit>(entity =>
        {
            entity.HasKey(e => e.ReferrerUserBenefitID).HasName("PK__Referrer__6AB60A29088317F2");

            entity.HasOne(d => d.BenefitType).WithMany(p => p.ReferrerUserBenefits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerUserBenefit_BenefitType");

            entity.HasOne(d => d.ReferrerUser).WithMany(p => p.ReferrerUserBenefits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReferrerUserBenefit_ReferrerUser");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.RefreshTokenID).HasName("PK__RefreshT__F5845E5917792A75");

            entity.HasIndex(e => new { e.ExpiresAt, e.IsActive }, "IX_RefreshToken_Cleanup").HasFilter("([IsActive]=(0))");

            entity.Property(e => e.GUID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RefreshTokenCreatedByUsers).HasConstraintName("FK_RefreshToken_CreatedBy");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokenUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RefreshToken_User");
        });

        modelBuilder.Entity<RegionType>(entity =>
        {
            entity.HasKey(e => e.RegionTypeID).HasName("PK__RegionTy__E7CC172B79B209E4");

            entity.Property(e => e.RegionTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ReportingFieldType>(entity =>
        {
            entity.HasKey(e => e.ReportingFieldTypeID).HasName("PK__Reportin__E37FBDFDEF456B68");

            entity.Property(e => e.ReportingFieldTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.AnswerType).WithMany(p => p.ReportingFieldTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReportingFieldType_AnswerType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ReportingFieldTypes).HasConstraintName("FK_ReportingFieldType_UserArea");
        });

        modelBuilder.Entity<RequirementType>(entity =>
        {
            entity.HasKey(e => e.RequirementTypeID).HasName("PK__Requirem__D58B7EE36C3745BF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RequirementTypeArchivedByUsers).HasConstraintName("FK_RequirementType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RequirementTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RequirementType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RequirementTypeModifiedByUsers).HasConstraintName("FK_RequirementType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RequirementTypes).HasConstraintName("FK_Requirement_UserArea");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.HasKey(e => e.ResourceID).HasName("PK__Resource__4ED1814FD1B0A814");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ResourceArchivedByUsers).HasConstraintName("FK_Resource_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ResourceCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Resource_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ResourceModifiedByUsers).HasConstraintName("FK_Resource_ModifiedByUserID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Resources)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Resource_UserArea");
        });

        modelBuilder.Entity<ResourceCreditLimit>(entity =>
        {
            entity.HasKey(e => e.ResourceCreditLimitID).HasName("PK__Resource__9A363C77F3453BC2");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ResourceCreditLimitArchivedByUsers).HasConstraintName("FK_ResourceLimit_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ResourceCreditLimitCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceLimit_CreatedBy");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.ResourceCreditLimits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceLimit_DocumentLinkTableType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ResourceCreditLimitModifiedByUsers).HasConstraintName("FK_ResourceLimit_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ResourceCreditLimits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceLimit_UserArea");
        });

        modelBuilder.Entity<ResourceLocation>(entity =>
        {
            entity.HasKey(e => e.ResourceLocationID).HasName("PK__Resource__647B5BC763F2D271");

            entity.HasOne(d => d.Location).WithMany(p => p.ResourceLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceLocation_Location");

            entity.HasOne(d => d.Resource).WithMany(p => p.ResourceLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceLocation_Resource");
        });

        modelBuilder.Entity<ResourceOrgGroup>(entity =>
        {
            entity.HasKey(e => e.ResourceOrgGroupID).HasName("PK__Resource__2E7170EB7E3B8E58");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.ResourceOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceOrgGroup_OrgGroup");

            entity.HasOne(d => d.Resource).WithMany(p => p.ResourceOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ResourceOrgGroup_Resource");
        });

        modelBuilder.Entity<RiskAssessment>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentID).HasName("PK__RiskAsse__2E8DAE681C42DCBC");

            entity.Property(e => e.ApprovalRequired).HasDefaultValue(true);
            entity.Property(e => e.AssessmentDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCurrentVersion).HasDefaultValue(true);
            entity.Property(e => e.Version).HasDefaultValue("1.0");

            entity.HasOne(d => d.ApprovedByUser).WithMany(p => p.RiskAssessmentApprovedByUsers).HasConstraintName("FK_RiskAssessment_ApprovedBy");

            entity.HasOne(d => d.AssessedByUser).WithMany(p => p.RiskAssessmentAssessedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessment_AssessedBy");

            entity.HasOne(d => d.PreviousVersion).WithMany(p => p.InversePreviousVersion).HasConstraintName("FK_RiskAssessment_PreviousVersion");

            entity.HasOne(d => d.ReviewedByUser).WithMany(p => p.RiskAssessmentReviewedByUsers).HasConstraintName("FK_RiskAssessment_ReviewedBy");

            entity.HasOne(d => d.RiskAssessmentFormatType).WithMany(p => p.RiskAssessments).HasConstraintName("FK_RiskAssessment_Format");

            entity.HasOne(d => d.RiskAssessmentStatusType).WithMany(p => p.RiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessment_Status");

            entity.HasOne(d => d.RiskAssessmentType).WithMany(p => p.RiskAssessments).HasConstraintName("FK_RiskAssessment_Type");

            entity.HasOne(d => d.RiskMatrixType).WithMany(p => p.RiskAssessments).HasConstraintName("FK_RiskAssessment_Matrix");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessment_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentAffectedItem>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentAffectedItemID).HasName("PK__RiskAsse__16565ABE19CE2275");

            entity.HasOne(d => d.AffectedItem).WithMany(p => p.RiskAssessmentAffectedItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentAffectedItem_AffectedItem");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskAssessmentAffectedItemArchivedByUsers).HasConstraintName("FK_RiskAssessmentAffectedItem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskAssessmentAffectedItemCreatedByUsers).HasConstraintName("FK_RiskAssessmentAffectedItem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RiskAssessmentAffectedItemModifiedByUsers).HasConstraintName("FK_RiskAssessmentAffectedItem_ModifiedBy");

            entity.HasOne(d => d.RiskAssessmentHazard).WithMany(p => p.RiskAssessmentAffectedItems).HasConstraintName("FK_RiskAssessmentAffectedItem_RiskAssessmentHazard");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentAffectedItems)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentAffectedItem_RiskAssessment");
        });

        modelBuilder.Entity<RiskAssessmentApprovalLog>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentApprovalLogID).HasName("PK__RiskAsse__FCF6054AC0041B2D");

            entity.Property(e => e.ApprovalDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ApprovalLevel).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ApproverUser).WithMany(p => p.RiskAssessmentApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentApprovalLog_Approver");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentApprovalLog_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentApprovalLog_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentAttachment>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentAttachmentID).HasName("PK__RiskAsse__355CAE02FA216FE6");

            entity.Property(e => e.AttachmentType).HasDefaultValue("Document");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Attachment).WithMany(p => p.RiskAssessmentAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentAttachment_Attachment");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentAttachment_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentAttachment_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentControlMeasure>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentControlMeasureID).HasName("PK__RiskAsse__89784D0F1107DFE2");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ImplementationStatus).HasDefaultValue("Planned");
            entity.Property(e => e.MonitoringRequired).HasDefaultValue(false);
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.ControlMeasure).WithMany(p => p.RiskAssessmentControlMeasures).HasConstraintName("FK_RiskAssessmentControlMeasure_Control");

            entity.HasOne(d => d.ResponsiblePerson).WithMany(p => p.RiskAssessmentControlMeasures).HasConstraintName("FK_RiskAssessmentControlMeasure_ResponsiblePerson");

            entity.HasOne(d => d.RiskAssessmentHazard).WithMany(p => p.RiskAssessmentControlMeasures).HasConstraintName("FK_RiskAssessmentControlMeasure_Hazard");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentControlMeasures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentControlMeasure_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentControlMeasures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentControlMeasure_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentControlMeasurePersonsInCharge>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentControlMeasurePersonsInChargeID).HasName("PK__RiskAsse__DD6587D5B7D217CB");
        });

        modelBuilder.Entity<RiskAssessmentControlMeasureScore_TO_DELETE_>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentControlMeasureScoreID).HasName("PK__RiskAsse__4E7139B976510263");
        });

        modelBuilder.Entity<RiskAssessmentConversion>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentConversionID).HasName("PK__RiskAsse__D7B8332CD3D41059");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskAssessmentConversionArchivedByUsers).HasConstraintName("FK_RiskAssessmentConversion_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskAssessmentConversionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentConversion_CreatedByUser");

            entity.HasOne(d => d.NewRiskAssessment).WithMany(p => p.RiskAssessmentConversionNewRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentConversion_RiskAssessment2");

            entity.HasOne(d => d.SourceRiskAssessment).WithMany(p => p.RiskAssessmentConversionSourceRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentConversion_RiskAssessment1");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentConversions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentConversion_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentExternalLink>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentExternalLinkID).HasName("PK__RiskAsse__9841272FFB43A30A");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.LinkType).HasDefaultValue("Reference");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentExternalLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentExternalLink_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentExternalLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentExternalLink_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentFieldType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentFieldTypeID).HasName("PK__RiskAsse__757924B244C66B5E");

            entity.Property(e => e.RiskAssessmentFieldTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskAssessmentFieldTypeArchivedByUsers).HasConstraintName("FK_RiskAssessmentFieldType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskAssessmentFieldTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentFieldType_CreatedBy");

            entity.HasOne(d => d.Hazard).WithMany(p => p.RiskAssessmentFieldTypes).HasConstraintName("FK_RiskAssessmentFieldType_Hazard");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RiskAssessmentFieldTypeModifiedByUsers).HasConstraintName("FK_RiskAssessmentFieldType_ModifiedBy");

            entity.HasOne(d => d.RiskAssessmentSectionType).WithMany(p => p.RiskAssessmentFieldTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentFieldType_RiskAssessmentSectionType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentFieldTypes).HasConstraintName("FK_RiskAssessmentFieldType_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentFieldTypeResponse>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentFieldTypeResponseID).HasName("PK__RiskAsse__23F3593B7AC7F6C0");

            entity.HasOne(d => d.RiskAssessmentFieldType).WithMany(p => p.RiskAssessmentFieldTypeResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentFieldTypeResponse_RiskAssessmentFieldType");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentFieldTypeResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentFieldTypeResponse_RiskAssessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentFieldTypeResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentFieldTypeResponse_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentFieldTypeScore_TO_DELETE_>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentFieldTypeScoreID).HasName("PK__RiskAsse__4962E8FE6ABEF4B4");
        });

        modelBuilder.Entity<RiskAssessmentFormatType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentFormatTypeID).HasName("PK__RiskAsse__1E8D26EEC40EAB75");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<RiskAssessmentHazard>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentHazardID).HasName("PK__RiskAsse__384E1ECD29C8D013");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Hazard).WithMany(p => p.RiskAssessmentHazards).HasConstraintName("FK_RiskAssessmentHazard_Hazard");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentHazards)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentHazard_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentHazards)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentHazard_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentHazardCategoryType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentHazardCategoryTypeID).HasName("PK__RiskAsse__E82AA73412AC453F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskAssessmentHazardCategoryTypeArchivedByUsers).HasConstraintName("FK_RiskAssessmentHazardCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskAssessmentHazardCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentHazardCategoryType_CreatedBy");

            entity.HasOne(d => d.HazardCategoryType).WithMany(p => p.RiskAssessmentHazardCategoryTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentHazardCategoryType_HazardCategoryType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RiskAssessmentHazardCategoryTypeModifiedByUsers).HasConstraintName("FK_RiskAssessmentHazardCategoryType_ModifiedBy");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentHazardCategoryTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentHazardCategoryType_RiskAssessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentHazardCategoryTypes).HasConstraintName("FK_RiskAssessmentHazardCategoryType_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentLocation>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentLocationID).HasName("PK__RiskAsse__BF81D79FE59145FB");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Location).WithMany(p => p.RiskAssessmentLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentLocation_Location");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentLocation_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentLocation_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentMonitorEvent>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentMonitorEventID).HasName("PK__RiskAsse__4A5CCDAEB4C951EC");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskAssessmentMonitorEventArchivedByUsers).HasConstraintName("FK_RiskAssessmentMonitorEvent_ArchivedBy");

            entity.HasOne(d => d.CheckedByEmployee).WithMany(p => p.RiskAssessmentMonitorEventCheckedByEmployees).HasConstraintName("FK_RiskAssessmentMonitorEvent_CheckedByEmployeeID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskAssessmentMonitorEventCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEvent_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.RiskAssessmentMonitorEvents).HasConstraintName("FK_RiskAssessmentMonitorEvent_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RiskAssessmentMonitorEventModifiedByUsers).HasConstraintName("FK_RiskAssessmentMonitorEvent_ModifiedBy");

            entity.HasOne(d => d.MonitorEmployee).WithMany(p => p.RiskAssessmentMonitorEventMonitorEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEvent_MonitorEmployeeID");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.RiskAssessmentMonitorEvents).HasConstraintName("FK_RiskAssessmentMonitorEvent_OrgGroup");

            entity.HasOne(d => d.OriginalRiskAssessment).WithMany(p => p.RiskAssessmentMonitorEventOriginalRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEvent_OriginalRiskAssessment");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentMonitorEventRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEvent_RiskAssessment");

            entity.HasOne(d => d.UserAreaDivision).WithMany(p => p.RiskAssessmentMonitorEvents).HasConstraintName("FK_RiskAssessmentMonitorEvent_UserAreaDivision");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentMonitorEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEvent_UserAreaID");
        });

        modelBuilder.Entity<RiskAssessmentMonitorEventScore>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentMonitorEventScoreID).HasName("PK__RiskAsse__6AD92592FA5EBFD9");

            entity.HasOne(d => d.RiskAssessmentControlMeasure).WithMany(p => p.RiskAssessmentMonitorEventScores).HasConstraintName("FK_RiskAssessmentMonitorEventScore_RiskAssessmentControlMeasure");

            entity.HasOne(d => d.RiskAssessmentFieldType).WithMany(p => p.RiskAssessmentMonitorEventScores).HasConstraintName("FK_RiskAssessmentMonitorEventScore_RiskAssessmentFieldType");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentMonitorEventScores)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEventScore_RiskAssessment");

            entity.HasOne(d => d.RiskAssessmentMonitorEvent).WithMany(p => p.RiskAssessmentMonitorEventScores)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEventScore_RiskAssessmentMonitorEvent");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentMonitorEventScores)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEventScore_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentMonitorEventXML>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentMonitorEventXMLID).HasName("PK__RiskAsse__6B45B45DF6E0A4B4");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentMonitorEventXMLs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEventXML_RiskAssessment");

            entity.HasOne(d => d.RiskAssessmentMonitorEvent).WithMany(p => p.RiskAssessmentMonitorEventXMLs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentMonitorEventXML_RiskAssessmentMonitorEvent");
        });

        modelBuilder.Entity<RiskAssessmentOperation>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentOperationID).HasName("PK__RiskAsse__76EEAF0E6818E74B");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.OperationSequence).HasDefaultValue(0);

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentOperations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentOperation_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentOperations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentOperation_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentOrgGroup>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentOrgGroupID).HasName("PK__RiskAsse__D3E68373A3D1E6F9");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.RiskAssessmentOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentOrgGroup_OrgGroup");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentOrgGroup_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentOrgGroup_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentPersonsAtRisk>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentPersonsAtRiskID).HasName("PK__RiskAsse__C3239D3A7E297BFF");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.PersonsAtRisk).WithMany(p => p.RiskAssessmentPersonsAtRisks).HasConstraintName("FK_RiskAssessmentPersonsAtRisk_Category");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentPersonsAtRisks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentPersonsAtRisk_Assessment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskAssessmentPersonsAtRisks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentPersonsAtRisk_UserArea");
        });

        modelBuilder.Entity<RiskAssessmentRiskSafetyPhrase>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentRiskSafetyPhraseID).HasName("PK__RiskAsse__845DC34B945B8D28");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentRiskSafetyPhrases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentRiskSafetyPhrase_RiskAssessment");

            entity.HasOne(d => d.RiskSafetyPhrase).WithMany(p => p.RiskAssessmentRiskSafetyPhrases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentRiskSafetyPhrase_RiskSafetyPhrase");
        });

        modelBuilder.Entity<RiskAssessmentSectionType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentSectionTypeID).HasName("PK__RiskAsse__0D1791A0748CDD7C");

            entity.Property(e => e.RiskAssessmentSectionTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.RiskAssessmentType).WithMany(p => p.RiskAssessmentSectionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentSectionType_RiskAssessmentType");
        });

        modelBuilder.Entity<RiskAssessmentStatusType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentStatusTypeID).HasName("PK__RiskAsse__EFBD7625062CC63F");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<RiskAssessmentType>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentTypeID).HasName("PK__RiskAsse__7C45B53BB9C57A21");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<RiskAssessmentXML>(entity =>
        {
            entity.HasKey(e => e.RiskAssessmentXMLID).HasName("PK__RiskAsse__4B90713B1ECA9BF2");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.RiskAssessmentXMLs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskAssessmentXML_RiskAssessment");
        });

        modelBuilder.Entity<RiskLevelColourType>(entity =>
        {
            entity.HasKey(e => e.RiskLevelColourTypeID).HasName("PK__RiskLeve__90B8FA0A135A7801");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<RiskMatrixConsequenceType>(entity =>
        {
            entity.HasKey(e => e.RiskMatrixConsequenceTypeID).HasName("PK__RiskMatr__7DB6CA5DCCEA93E0");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.RiskMatrixType).WithMany(p => p.RiskMatrixConsequenceTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskMatrixConsequence_MatrixType");
        });

        modelBuilder.Entity<RiskMatrixLikelihoodType>(entity =>
        {
            entity.HasKey(e => e.RiskMatrixLikelihoodTypeID).HasName("PK__RiskMatr__22B42EDA7107BADE");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.RiskMatrixType).WithMany(p => p.RiskMatrixLikelihoodTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskMatrixLikelihood_MatrixType");
        });

        modelBuilder.Entity<RiskMatrixType>(entity =>
        {
            entity.HasKey(e => e.RiskMatrixTypeID).HasName("PK__RiskMatr__A6113B0007E0D004");

            entity.Property(e => e.ConsequenceLevels).HasDefaultValue(5);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsDefault).HasDefaultValue(false);
            entity.Property(e => e.LikelihoodLevels).HasDefaultValue(5);
        });

        modelBuilder.Entity<RiskMatrixTypeColour>(entity =>
        {
            entity.HasKey(e => e.RiskMatrixTypeColourID).HasName("PK__RiskMatr__04564ABCC583448F");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.RiskLevelColourType).WithMany(p => p.RiskMatrixTypeColours)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskMatrixTypeColour_Colour");

            entity.HasOne(d => d.RiskMatrixType).WithMany(p => p.RiskMatrixTypeColours)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskMatrixTypeColour_MatrixType");
        });

        modelBuilder.Entity<RiskSafetyPhrase>(entity =>
        {
            entity.HasKey(e => e.RiskSafetyPhraseID).HasName("PK__RiskSafe__289673C0C2C4DD82");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RiskSafetyPhraseArchivedByUsers).HasConstraintName("FK_RiskSafetyPhrase_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RiskSafetyPhraseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RiskSafetyPhrase_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RiskSafetyPhraseModifiedByUsers).HasConstraintName("FK_RiskSafetyPhrase_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RiskSafetyPhrases).HasConstraintName("FK_RiskSafetyPhrase_UserArea");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleID).HasName("PK__Role__8AFACE3A8ED3138F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RoleArchivedByUsers).HasConstraintName("FK_Role_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RoleCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Role_CreatedByUserID");

            entity.HasOne(d => d.DefaultModuleType).WithMany(p => p.Roles).HasConstraintName("FK_Role_ModuleType");

            entity.HasOne(d => d.DefaultSystemProductType).WithMany(p => p.Roles).HasConstraintName("FK_Role_SystemProductType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RoleModifiedByUsers).HasConstraintName("FK_Role_ModifiedByUserID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Roles).HasConstraintName("FK_Role_UserAreaID");
        });

        modelBuilder.Entity<RoleNavigationPreference>(entity =>
        {
            entity.HasKey(e => e.RoleNavigationPreferencesID).HasName("PK__RoleNavi__8152B534461DC24B");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.UpdatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.RolePermissionID).HasName("PK__RolePerm__120F469A65BD5B60");

            entity.Property(e => e.Permit).HasDefaultValue(true);

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions).HasConstraintName("FK_RolePermission_PermissionID");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissions).HasConstraintName("FK_RolePermission_RoleID");
        });

        modelBuilder.Entity<RootCauseCategoryType>(entity =>
        {
            entity.HasKey(e => e.RootCauseCategoryTypeID).HasName("PK__RootCaus__079DA4AEE9925D95");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RootCauseCategoryTypeArchivedByUsers).HasConstraintName("FK_RootCauseCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RootCauseCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RootCauseCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RootCauseCategoryTypeModifiedByUsers).HasConstraintName("FK_RootCauseCategoryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RootCauseCategoryTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RootCauseCategoryType_UserAreaID");
        });

        modelBuilder.Entity<RootCauseType>(entity =>
        {
            entity.HasKey(e => e.RootCauseTypeID).HasName("PK__RootCaus__1B97E343E91D32E3");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.RootCauseTypeArchivedByUsers).HasConstraintName("FK_RootCauseType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.RootCauseTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RootCauseType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.RootCauseTypeModifiedByUsers).HasConstraintName("FK_RootCauseType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.RootCauseTypes).HasConstraintName("FK_RootCauseType_UserAreaID");
        });

        modelBuilder.Entity<SCORMPackage>(entity =>
        {
            entity.HasKey(e => e.SCORMPackageID).HasName("PK__SCORMPac__D74603983A48AFD8");

            entity.Property(e => e.GUID).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SCORMPackageArchivedByUsers).HasConstraintName("FK_SCORMPackage_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SCORMPackageCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SCORMPackage_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SCORMPackageModifiedByUsers).HasConstraintName("FK_SCORMPackage_ModifiedBy");

            entity.HasOne(d => d.OriginalSCORMPackage).WithMany(p => p.InverseOriginalSCORMPackage).HasConstraintName("FK_SCORMPackage_OriginalID");
        });

        modelBuilder.Entity<SCORMPackageUserArea>(entity =>
        {
            entity.HasKey(e => e.SCORMPackageUserAreaID).HasName("PK__SCORMPac__9603DE0030D73D8F");

            entity.HasOne(d => d.SCORMPackage).WithMany(p => p.SCORMPackageUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SCORMPackageUserArea_SCORMPackage");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SCORMPackageUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SCORMPackageUserArea_UserArea");
        });

        modelBuilder.Entity<SSIP>(entity =>
        {
            entity.HasKey(e => e.SSIPID).HasName("PK__SSIP__067B0F85827F6DB8");

            entity.Property(e => e.SSIPID).ValueGeneratedNever();
        });

        modelBuilder.Entity<SSOWApprovalLog>(entity =>
        {
            entity.HasKey(e => e.SSOWApprovalLogID).HasName("PK__SSOWAppr__B37E96C4A109C156");

            entity.Property(e => e.ApprovalDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ApprovalLevel).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ApproverUser).WithMany(p => p.SSOWApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWApprovalLog_Approver");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWApprovalLog_UserArea");
        });

        modelBuilder.Entity<SSOWAttachment>(entity =>
        {
            entity.HasKey(e => e.SSOWAttachmentID).HasName("PK__SSOWAtta__CD0D2225BE21E5C7");

            entity.Property(e => e.AttachmentType).HasDefaultValue("Document");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsRequired).HasDefaultValue(false);
            entity.Property(e => e.SequenceOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Attachment).WithMany(p => p.SSOWAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWAttachment_Attachment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWAttachment_UserArea");
        });

        modelBuilder.Entity<SSOWDocumentType>(entity =>
        {
            entity.HasKey(e => e.SSOWDocumentTypeID).HasName("PK__SSOWDocu__0A478C2FDA83C708");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.RequiresApproval).HasDefaultValue(true);

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWDocumentTypes).HasConstraintName("FK_SSOWDocumentType_UserArea");
        });

        modelBuilder.Entity<SSOWExternalLink>(entity =>
        {
            entity.HasKey(e => e.SSOWExternalLinkID).HasName("PK__SSOWExte__FD3F681EFBFFE741");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.LinkType).HasDefaultValue("Reference");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWExternalLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWExternalLink_UserArea");
        });

        modelBuilder.Entity<SSOWLocation>(entity =>
        {
            entity.HasKey(e => e.SSOWLocationID).HasName("PK__SSOWLoca__0E46FCF2EAF252BB");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Location).WithMany(p => p.SSOWLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWLocation_Location");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWLocation_UserArea");
        });

        modelBuilder.Entity<SSOWOrgGroup>(entity =>
        {
            entity.HasKey(e => e.SSOWOrgGroupID).HasName("PK__SSOWOrgG__1BFD725B8E30E272");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.SSOWOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWOrgGroup_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWOrgGroup_UserArea");
        });

        modelBuilder.Entity<SSOWRiskCategory>(entity =>
        {
            entity.HasKey(e => e.SSOWRiskCategoryID).HasName("PK__SSOWRisk__7C88551EF2C602AF");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.RiskLevel).HasDefaultValue("Medium");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SSOWRiskCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SSOWRiskCategory_UserArea");
        });

        modelBuilder.Entity<SSOWStatusType>(entity =>
        {
            entity.HasKey(e => e.SSOWStatusTypeID).HasName("PK__SSOWStat__76ADE7ADD2CF6100");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<SafeSystemOfWork>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkID).HasName("PK__SafeSyst__1ED1B1908F3FC9A0");

            entity.Property(e => e.IncludeAdvancedDetails).HasDefaultValue(true);
            entity.Property(e => e.IncludePPEOptions).HasDefaultValue(true);
            entity.Property(e => e.IncludeRiskAssessmentOptions).HasDefaultValue(true);
            entity.Property(e => e.IncludeSSOWLinks).HasDefaultValue(true);
            entity.Property(e => e.Version).HasDefaultValue(1);

            entity.HasOne(d => d.ApprovalStatusType).WithMany(p => p.SafeSystemOfWorks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWork_ApprovalStatusTypeID");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SafeSystemOfWorkArchivedByUsers).HasConstraintName("FK_SafeSystemOfWork_ArchivedBy");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.SafeSystemOfWorks).HasConstraintName("FK_SafeSystemOfWork_ContractorCompanyID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SafeSystemOfWorkCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWork_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.SafeSystemOfWorks).HasConstraintName("FK_SafeSystemOfWork_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SafeSystemOfWorkModifiedByUsers).HasConstraintName("FK_SafeSystemOfWork_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.SafeSystemOfWorks).HasConstraintName("FK_SafeSystemOfWork_OrgGroupID");

            entity.HasOne(d => d.OriginalSafeSystemOfWork).WithMany(p => p.InverseOriginalSafeSystemOfWork).HasConstraintName("FK_SafeSystemOfWork_OriginalSafeSystemOfWorkID");

            entity.HasOne(d => d.PermitAttachment).WithMany(p => p.SafeSystemOfWorks).HasConstraintName("FK_SafeSystemOfWork_PermitAttachmentID");

            entity.HasOne(d => d.SafeSystemOfWorkTemplate).WithMany(p => p.SafeSystemOfWorks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWork_SafeSystemOfWorkTemplateID");

            entity.HasOne(d => d.SafeSystemOfWorkType).WithMany(p => p.SafeSystemOfWorks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWork_SafeSystemOfWorkTypeID");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.SafeSystemOfWorks).HasConstraintName("FK_SafeSystemOfWork_TextBlockCollectionID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeSystemOfWorks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWork_UserAreaID");
        });

        modelBuilder.Entity<SafeSystemOfWorkCompetency>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkCompetencyID).HasName("PK__SafeSyst__9B6D6D863AF562C1");

            entity.HasOne(d => d.Competency).WithMany(p => p.SafeSystemOfWorkCompetencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkCompetency_Competency");

            entity.HasOne(d => d.SafeSystemOfWork).WithMany(p => p.SafeSystemOfWorkCompetencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkCompetency_SafeSystemOfWork");
        });

        modelBuilder.Entity<SafeSystemOfWorkLink>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkLinkID).HasName("PK__SafeSyst__E6E8A0600E5FC4D4");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.SafeSystemOfWorkLinks).HasConstraintName("FK_SafeSystemOfWorkLink_DocumentLinkTableType");

            entity.HasOne(d => d.SafeSystemOfWork).WithMany(p => p.SafeSystemOfWorkLinks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLink_SafeSystemOfWork");
        });

        modelBuilder.Entity<SafeSystemOfWorkLinkRecord>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkLinkRecordID).HasName("PK__SafeSyst__D1D899D147BCF028");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.SafeSystemOfWorkLinkRecords)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLinkRecord_DocumentLinkTableType");

            entity.HasOne(d => d.SafeSystemOfWorkLink).WithMany(p => p.SafeSystemOfWorkLinkRecords)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLinkRecord_SafeSystemOfWorkLink");
        });

        modelBuilder.Entity<SafeSystemOfWorkLocation>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkLocationID).HasName("PK__SafeSyst__DAE522A73E6DD7BC");

            entity.HasOne(d => d.Location).WithMany(p => p.SafeSystemOfWorkLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLocation_Location");

            entity.HasOne(d => d.SafeSystemOfWork).WithMany(p => p.SafeSystemOfWorkLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLocation_SafeSystemOfWork");
        });

        modelBuilder.Entity<SafeSystemOfWorkLog>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkLogID).HasName("PK__SafeSyst__AE1E5C52A2FC6CA6");

            entity.HasOne(d => d.LoggedByUser).WithMany(p => p.SafeSystemOfWorkLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLog_User");

            entity.HasOne(d => d.SafeSystemOfWork).WithMany(p => p.SafeSystemOfWorkLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLog_SafeSystemOfWork");

            entity.HasOne(d => d.SafeSystemOfWorkLogType).WithMany(p => p.SafeSystemOfWorkLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLog_SafeSystemOfWorkLogType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeSystemOfWorkLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkLog_UserArea");
        });

        modelBuilder.Entity<SafeSystemOfWorkLogType>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkLogTypeID).HasName("PK__SafeSyst__5989FF1D861CF4CE");

            entity.Property(e => e.SafeSystemOfWorkLogTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<SafeSystemOfWorkRiskAssessmentType>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkRiskAssessmentTypeID).HasName("PK__SafeSyst__D7C60745F283FF5B");

            entity.Property(e => e.SafeSystemOfWorkRiskAssessmentTypeID).ValueGeneratedNever();
            entity.Property(e => e.HasRelatedRiskAssessments).HasDefaultValue(true);
        });

        modelBuilder.Entity<SafeSystemOfWorkTemplate>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkTemplateID).HasName("PK__SafeSyst__A0D75AA71CE25314");

            entity.Property(e => e.IncludeAdvancedDetails).HasDefaultValue(true);
            entity.Property(e => e.IncludePPEOptions).HasDefaultValue(true);
            entity.Property(e => e.IncludeRiskAssessmentOptions).HasDefaultValue(true);
            entity.Property(e => e.IncludeSSOWLinks).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SafeSystemOfWorkTemplateArchivedByUsers).HasConstraintName("FK_SafeSystemOfWorkTemplate_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SafeSystemOfWorkTemplateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkTemplate_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SafeSystemOfWorkTemplateModifiedByUsers).HasConstraintName("FK_SafeSystemOfWorkTemplate_ModifiedBy");

            entity.HasOne(d => d.SafeSystemOfWorkType).WithMany(p => p.SafeSystemOfWorkTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkTemplate_SafeSystemOfWorkType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeSystemOfWorkTemplates).HasConstraintName("FK_SafeSystemOfWorkTemplate_UserArea");
        });

        modelBuilder.Entity<SafeSystemOfWorkTemplateSection>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkTemplateSectionID).HasName("PK__SafeSyst__232E660A502D0E13");

            entity.HasOne(d => d.SafeSystemOfWorkTemplate).WithMany(p => p.SafeSystemOfWorkTemplateSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkTemplateSection_SafeSystemOfWorkTemplate");

            entity.HasOne(d => d.TextBlockSection).WithMany(p => p.SafeSystemOfWorkTemplateSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkTemplateSection_TextBlockSection");
        });

        modelBuilder.Entity<SafeSystemOfWorkType>(entity =>
        {
            entity.HasKey(e => e.SafeSystemOfWorkTypeID).HasName("PK__SafeSyst__AB976EB773FBE9E9");

            entity.Property(e => e.SafeSystemOfWorkTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SafeSystemOfWorkTypeArchivedByUsers).HasConstraintName("FK_SafeSystemOfWorkType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SafeSystemOfWorkTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SafeSystemOfWorkTypeModifiedByUsers).HasConstraintName("FK_SafeSystemOfWorkType_ModifiedBy");

            entity.HasOne(d => d.TextBlockType).WithMany(p => p.SafeSystemOfWorkTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeSystemOfWorkType_TextBlockType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeSystemOfWorkTypes).HasConstraintName("FK_SafeSystemOfWorkType_UserArea");
        });

        modelBuilder.Entity<SafeWorkingProcedure>(entity =>
        {
            entity.HasKey(e => e.SafeWorkingProcedureID).HasName("PK__SafeWork__6548DF85A3EB1029");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.DocumentVersion).HasDefaultValue("1.0");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCurrentVersion).HasDefaultValue(true);

            entity.HasOne(d => d.AuthorUser).WithMany(p => p.SafeWorkingProcedures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeWorkingProcedure_Author");

            entity.HasOne(d => d.PreviousVersion).WithMany(p => p.InversePreviousVersion).HasConstraintName("FK_SafeWorkingProcedure_PreviousVersion");

            entity.HasOne(d => d.RiskAssessment).WithMany(p => p.SafeWorkingProcedures).HasConstraintName("FK_SafeWorkingProcedure_RiskAssessment");

            entity.HasOne(d => d.SSOWDocumentType).WithMany(p => p.SafeWorkingProcedures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeWorkingProcedure_DocumentType");

            entity.HasOne(d => d.SSOWRiskCategory).WithMany(p => p.SafeWorkingProcedures).HasConstraintName("FK_SafeWorkingProcedure_RiskCategory");

            entity.HasOne(d => d.SSOWStatusType).WithMany(p => p.SafeWorkingProcedures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeWorkingProcedure_Status");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeWorkingProcedures)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeWorkingProcedure_UserArea");
        });

        modelBuilder.Entity<SafeWorkingProcedureStep>(entity =>
        {
            entity.HasKey(e => e.SafeWorkingProcedureStepID).HasName("PK__SafeWork__6941C5C0314B5082");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.CriticalControlPoint).HasDefaultValue(false);
            entity.Property(e => e.VerificationRequired).HasDefaultValue(false);

            entity.HasOne(d => d.SafeWorkingProcedure).WithMany(p => p.SafeWorkingProcedureSteps).HasConstraintName("FK_SafeWorkingProcedureStep_SafeWorkingProcedure");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SafeWorkingProcedureSteps)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SafeWorkingProcedureStep_UserArea");
        });

        modelBuilder.Entity<ScheduledEvent>(entity =>
        {
            entity.HasKey(e => e.ScheduledEventID).HasName("PK__Schedule__272BFD394740C93D");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ScheduledEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledEvent_CreatedByUser");

            entity.HasOne(d => d.EmailFrequencyType).WithMany(p => p.ScheduledEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledEvent_EmailFrequencyType");

            entity.HasOne(d => d.ScheduledEventType).WithMany(p => p.ScheduledEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledEvent_ScheduledEventType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ScheduledEvents).HasConstraintName("FK_ScheduledEvent_UserArea");
        });

        modelBuilder.Entity<ScheduledEventLog>(entity =>
        {
            entity.HasKey(e => e.ScheduledEventLogID).HasName("PK__Schedule__DCC542B9B3D918C7");

            entity.HasOne(d => d.ScheduledEvent).WithMany(p => p.ScheduledEventLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledEventLog_ScheduledEvent");
        });

        modelBuilder.Entity<ScheduledEventType>(entity =>
        {
            entity.HasKey(e => e.ScheduledEventTypeID).HasName("PK__Schedule__62F98369CA868564");

            entity.Property(e => e.ScheduledEventTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<ScheduledJob>(entity =>
        {
            entity.HasIndex(e => new { e.IsActive, e.NextRunTime }, "IX_ScheduledJob_IsActive_NextRunTime").HasFilter("([ArchivedDate] IS NULL AND [IsActive]=(1))");

            entity.HasIndex(e => new { e.UserAreaID, e.ArchivedDate }, "IX_ScheduledJob_UserAreaID_ArchivedDate").HasFilter("([ArchivedDate] IS NULL)");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.HttpMethod).HasDefaultValue("POST");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.MaxRetries).HasDefaultValue(3);
            entity.Property(e => e.RetryDelaySeconds).HasDefaultValue(60);
            entity.Property(e => e.TimeZone).HasDefaultValue("UTC");
            entity.Property(e => e.TimeoutSeconds).HasDefaultValue(30);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ScheduledJobArchivedByUsers).HasConstraintName("FK_ScheduledJob_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ScheduledJobCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledJob_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ScheduledJobModifiedByUsers).HasConstraintName("FK_ScheduledJob_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ScheduledJobs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScheduledJob_UserArea");
        });

        modelBuilder.Entity<ScheduledTask>(entity =>
        {
            entity.HasKey(e => e.TaskID).HasName("PK__Schedule__7C6949D15625D6FE");
        });

        modelBuilder.Entity<SectorType>(entity =>
        {
            entity.HasKey(e => e.SectorTypeID).HasName("PK__SectorTy__1E4CA48FACAB4620");

            entity.Property(e => e.SectorTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SectorTypeArchivedByUsers).HasConstraintName("FK_SectorType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SectorTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SectorType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SectorTypeModifiedByUsers).HasConstraintName("FK_SectorType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SectorTypes).HasConstraintName("FK_SectorType_UserArea");
        });

        modelBuilder.Entity<SeverityOfInjuryType>(entity =>
        {
            entity.HasKey(e => e.SeverityOfInjuryTypeID).HasName("PK__Severity__367ADE9B2C450F1B");

            entity.Property(e => e.SeverityOfInjuryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SeverityOfInjuryTypeArchivedByUsers).HasConstraintName("FK_SeverityOfInjuryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SeverityOfInjuryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SeverityOfInjuryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SeverityOfInjuryTypeModifiedByUsers).HasConstraintName("FK_SeverityOfInjuryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SeverityOfInjuryTypes).HasConstraintName("FK_SeverityOfInjuryType_UserArea");
        });

        modelBuilder.Entity<SeverityType>(entity =>
        {
            entity.HasKey(e => e.SeverityTypeID).HasName("PK__Severity__64231A722D863D4A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SeverityTypeArchivedByUsers).HasConstraintName("FK_SeverityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SeverityTypeCreatedByUsers).HasConstraintName("FK_SeverityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SeverityTypeModifiedByUsers).HasConstraintName("FK_SeverityType_ModifiedBy");

            entity.HasOne(d => d.TaskSeverity).WithMany(p => p.SeverityTypes).HasConstraintName("FK_SeverityType_TaskSeverity");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SeverityTypes).HasConstraintName("FK_SeverityType_UserArea");
        });

        modelBuilder.Entity<ShortcutSystem>(entity =>
        {
            entity.HasKey(e => e.ShortcutSystemID).HasName("PK__Shortcut__5A8AF8019659376D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ShortcutSystemArchivedByUsers).HasConstraintName("FK_ShortcutSystem_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ShortcutSystemCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShortcutSystem_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ShortcutSystemModifiedByUsers).HasConstraintName("FK_ShortcutSystem_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ShortcutSystems).HasConstraintName("FK_ShortcutSystem_UserArea");
        });

        modelBuilder.Entity<ShortcutSystemUser>(entity =>
        {
            entity.HasKey(e => e.ShortcutSystemUserID).HasName("PK__Shortcut__DA5D6C31F1638A71");

            entity.HasOne(d => d.ShortcutSystem).WithMany(p => p.ShortcutSystemUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShortcutSystemUser_ShortcutSystem");

            entity.HasOne(d => d.User).WithMany(p => p.ShortcutSystemUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShortcutSystemUser_User");
        });

        modelBuilder.Entity<ShortcutUserFavourite>(entity =>
        {
            entity.HasKey(e => e.ShortcutUserFavouriteID).HasName("PK__Shortcut__A9EAF5349E651A50");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.ShortcutUserFavouriteArchivedByUsers).HasConstraintName("FK_ShortcutUserFavourite_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ShortcutUserFavouriteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShortcutUserFavourite_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ShortcutUserFavouriteModifiedByUsers).HasConstraintName("FK_ShortcutUserFavourite_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.ShortcutUserFavourites).HasConstraintName("FK_ShortcutUserFavourite_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.ShortcutUserFavouriteUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShortcutUserFavourite_User");
        });

        modelBuilder.Entity<SicknessStatusType>(entity =>
        {
            entity.HasKey(e => e.SicknessStatusTypeID).HasName("PK__Sickness__B70DBD98E60CF8E5");

            entity.Property(e => e.SicknessStatusTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SicknessStatusTypeArchivedByUsers).HasConstraintName("FK_SicknessStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SicknessStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SicknessStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SicknessStatusTypeModifiedByUsers).HasConstraintName("FK_SicknessStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SicknessStatusTypes).HasConstraintName("FK_SicknessStatusType_UserArea");
        });

        modelBuilder.Entity<SourceStaticDataType>(entity =>
        {
            entity.HasKey(e => e.SourceStaticDataTypeID).HasName("PK__SourceSt__1C8005C79EB6FAD7");
        });

        modelBuilder.Entity<SourceStaticDatum>(entity =>
        {
            entity.HasKey(e => e.SourceStaticDataID).HasName("PK__SourceSt__CDDFD5B0007C0040");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SourceStaticDatumArchivedByUsers).HasConstraintName("FK_SourceStaticData_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SourceStaticDatumCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SourceStaticData_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SourceStaticDatumModifiedByUsers).HasConstraintName("FK_SourceStaticData_ModifiedBy");

            entity.HasOne(d => d.SourceStaticDataType).WithMany(p => p.SourceStaticData)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SourceStaticData_SourceStaticDataTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.SourceStaticData).HasConstraintName("FK_SourceStaticData_UserAreaID");
        });

        modelBuilder.Entity<SubActivityType>(entity =>
        {
            entity.HasKey(e => e.SubActivityTypeID).HasName("PK__SubActiv__B9756C9EE818DEC5");

            entity.Property(e => e.SubActivityTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.SupplierID).HasName("PK__Supplier__4BE666945AB61683");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.SupplierArchivedByUsers).HasConstraintName("FK_Supplier_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.SupplierCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Supplier_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.SupplierModifiedByUsers).HasConstraintName("FK_Supplier_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Suppliers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Supplier_UserArea");
        });

        modelBuilder.Entity<SystemConfiguration>(entity =>
        {
            entity.HasKey(e => e.SystemConfigurationID).HasName("PK__SystemCo__E5841C24D7AB8B6D");

            entity.Property(e => e.SystemConfigurationID).ValueGeneratedNever();
        });

        modelBuilder.Entity<SystemCredential>(entity =>
        {
            entity.HasKey(e => e.SystemCredentialID).HasName("PK__SystemCr__7AB8027F8EA0AA21");

            entity.Property(e => e.IsEnabled).HasDefaultValue(true);
        });

        modelBuilder.Entity<SystemPermission>(entity =>
        {
            entity.HasKey(e => e.PermissionID).HasName("PK__SystemPe__EFA6FB0F81295A5C");
        });

        modelBuilder.Entity<SystemProductType>(entity =>
        {
            entity.HasKey(e => e.SystemProductTypeID).HasName("PK__SystemPr__3805BC137B1E07C3");

            entity.Property(e => e.SystemProductTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<SystemRole>(entity =>
        {
            entity.HasKey(e => e.RoleID).HasName("PK__SystemRo__8AFACE3AA31ABFA5");

            entity.Property(e => e.IsSystemRole).HasDefaultValue(true);
        });

        modelBuilder.Entity<SystemRolePermission>(entity =>
        {
            entity.HasKey(e => e.SystemRoleID).HasName("PK__SystemRo__DE3AAA66B9A438EE");

            entity.HasOne(d => d.Permission).WithMany(p => p.SystemRolePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SystemRolePermission_SystemPermission");
        });

        modelBuilder.Entity<TagType>(entity =>
        {
            entity.HasKey(e => e.TagTypeID).HasName("PK__TagType__BEE8E8CB06DAFB11");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TagTypeArchivedByUsers).HasConstraintName("FK_TagType_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TagTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TagType_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TagTypeModifiedByUsers).HasConstraintName("FK_TagType_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TagTypes).HasConstraintName("FK_TagType_UserArea");
        });

        modelBuilder.Entity<TaskActivity>(entity =>
        {
            entity.HasKey(e => e.TaskActivityID).HasName("PK__TaskActi__46F9BEEF86BD9831");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskActivityArchivedByUsers).HasConstraintName("FK_TaskActivity_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskActivityCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskActivity_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.TaskActivities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskActivity_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskActivityModifiedByUsers).HasConstraintName("FK_TaskActivity_ModifiedBy");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskActivities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskActivity_SeverityType");
        });

        modelBuilder.Entity<TaskAssignableUser>(entity =>
        {
            entity.HasKey(e => e.TaskAssignableUserID).HasName("PK__TaskAssi__D07489A340078E82");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskAssignableUserArchivedByUsers).HasConstraintName("FK_TaskAssignableUser_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskAssignableUserCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignableUser_CreatedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskAssignableUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignableUser_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.TaskAssignableUserUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignableUser_User");
        });

        modelBuilder.Entity<TaskAssignment>(entity =>
        {
            entity.HasKey(e => e.TaskAssignmentID).HasName("PK__TaskAssi__75E8D25F7F44E900");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskAssignmentArchivedByUsers).HasConstraintName("FK_TaskAssignment_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskAssignmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignment_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.TaskAssignments).HasConstraintName("FK_TaskAssignment_Employee");

            entity.HasOne(d => d.Location).WithMany(p => p.TaskAssignments).HasConstraintName("FK_TaskAssignment_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskAssignmentModifiedByUsers).HasConstraintName("FK_TaskAssignment_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskAssignments).HasConstraintName("FK_TaskAssignment_OrgGroup");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignment_Task");
        });

        modelBuilder.Entity<TaskAssignmentLog>(entity =>
        {
            entity.HasKey(e => e.TaskAssignmentLogID).HasName("PK__TaskAssi__3CC5ADFBD582A312");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskAssignmentLogArchivedByUsers).HasConstraintName("FK_TaskAssignmentLog_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskAssignmentLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignmentLog_CreatedByUser");

            entity.HasOne(d => d.Employee).WithMany(p => p.TaskAssignmentLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignmentLog_Employee");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskAssignmentLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignmentLog_Task");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskAssignmentLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAssignmentLog_UserArea");
        });

        modelBuilder.Entity<TaskAttachment>(entity =>
        {
            entity.HasKey(e => e.TaskAttachmentID).HasName("PK__TaskAtta__DAB4550E7C248E19");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskAttachmentArchivedByUsers).HasConstraintName("FK_TaskAttachment_ArchivedByUser");

            entity.HasOne(d => d.Attachment).WithMany(p => p.TaskAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAttachment_Attachment");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskAttachmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAttachment_CreatedByUser");

            entity.HasOne(d => d.TaskActivity).WithMany(p => p.TaskAttachments).HasConstraintName("FK_TaskAttachment_TaskActivity");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskAttachment_Task");
        });

        modelBuilder.Entity<TaskCategoryType>(entity =>
        {
            entity.HasKey(e => e.TaskCategoryTypeID).HasName("PK__TaskCate__7B23EC6A0EAF2327");

            entity.Property(e => e.TaskCategoryTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskCategoryTypeArchivedByUsers).HasConstraintName("FK_TaskCategoryType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskCategoryTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskCategoryType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskCategoryTypeModifiedByUsers).HasConstraintName("FK_TaskCategoryType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskCategoryTypes).HasConstraintName("FK_TaskCategoryType_UserArea");
        });

        modelBuilder.Entity<TaskClassification>(entity =>
        {
            entity.HasKey(e => e.TaskClassificationID).HasName("PK__TaskClas__DAAB92B6EB658A95");

            entity.HasOne(d => d.TaskClassificationType).WithMany(p => p.TaskClassifications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskClassification_TaskClassificationType");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskClassifications)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskClassification_Task");
        });

        modelBuilder.Entity<TaskClassificationType>(entity =>
        {
            entity.HasKey(e => e.TaskClassificationTypeID).HasName("PK__TaskClas__433847A5746221EE");

            entity.Property(e => e.TaskClassificationTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskClassificationTypeArchivedByUsers).HasConstraintName("FK_TaskClassificationType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskClassificationTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskClassificationType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskClassificationTypeModifiedByUsers).HasConstraintName("FK_TaskClassificationType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskClassificationTypes).HasConstraintName("FK_TaskClassificationType_UserArea");
        });

        modelBuilder.Entity<TaskContractorCompany>(entity =>
        {
            entity.HasKey(e => e.TaskContractorCompanyID).HasName("PK__TaskCont__DD01C3AEEA423325");

            entity.HasOne(d => d.ContractorCompany).WithMany(p => p.TaskContractorCompanies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskContractorCompany_ContractorCompany");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskContractorCompanies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskContractorCompany_Task");
        });

        modelBuilder.Entity<TaskEmployee>(entity =>
        {
            entity.HasKey(e => e.TaskEmployeeID).HasName("PK__TaskEmpl__D64FCEBCF284BC9E");

            entity.Property(e => e.CompletedByThisUser).HasDefaultValue(false);
            entity.Property(e => e.NotificationSent).HasDefaultValue(false);
            entity.Property(e => e.TimeSpentMinutes).HasDefaultValue(0);

            entity.HasOne(d => d.Task).WithMany(p => p.TaskEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskEmployee_Task");
        });

        modelBuilder.Entity<TaskEscalationLog>(entity =>
        {
            entity.HasKey(e => e.TaskEscalationLogID).HasName("PK__TaskEsca__17FE40736A79C138");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskEscalationLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskEscalationLog_Task");
        });

        modelBuilder.Entity<TaskNonEmployee>(entity =>
        {
            entity.HasKey(e => e.TaskNonEmployeeID).HasName("PK__TaskNonE__7A10441A6D7C5B9B");

            entity.HasOne(d => d.JobRole).WithMany(p => p.TaskNonEmployees).HasConstraintName("FK_TaskNonEmployee_JobRole");

            entity.HasOne(d => d.Location).WithMany(p => p.TaskNonEmployees).HasConstraintName("FK_TaskNonEmployee_Location");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskNonEmployees).HasConstraintName("FK_TaskNonEmployee_OrgGroup");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskNonEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskNonEmployee_Task");
        });

        modelBuilder.Entity<TaskNote>(entity =>
        {
            entity.HasKey(e => e.TaskNoteID).HasName("PK__TaskNote__63C088217B6F6C27");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskNoteArchivedByUsers).HasConstraintName("FK_TaskNote_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskNoteCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskNote_CreatedByUserID");

            entity.HasOne(d => d.TaskActivity).WithMany(p => p.TaskNotes).HasConstraintName("FK_TaskNote_TaskActivity");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskNote_UserArea");
        });

        modelBuilder.Entity<TaskOrgGroup>(entity =>
        {
            entity.HasKey(e => e.TaskOrgGroupID).HasName("PK__TaskOrgG__268B4296D87E9CD2");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskOrgGroup_OrgGroup");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskOrgGroup_Task");
        });

        modelBuilder.Entity<TaskPriority>(entity =>
        {
            entity.HasKey(e => e.TaskPriorityID).HasName("PK__TaskPrio__BBFB9DEB39EDE9D3");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<TaskReassignmentLog>(entity =>
        {
            entity.HasKey(e => e.TaskReassignmentLogID).HasName("PK__TaskReas__5195B3A6CD149BD6");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskReassignmentLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskReassignmentLog_CreatedByUser");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskReassignmentLogs).HasConstraintName("FK_TaskReassignmentLog_Task");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.TaskReassignmentLogs).HasConstraintName("FK_TaskReassignmentLog_TaskSchedule");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskReassignmentLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskReassignmentLog_UserArea");
        });

        modelBuilder.Entity<TaskSchedule>(entity =>
        {
            entity.HasKey(e => e.TaskScheduleID).HasName("PK__TaskSche__51071B668D295288");

            entity.Property(e => e.IsOneTaskCreatedForMultiple).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskScheduleArchivedByUsers).HasConstraintName("FK_TaskSchedule_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskScheduleCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskSchedule_CreatedBy");

            entity.HasOne(d => d.FrequencyType).WithMany(p => p.TaskSchedules)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskSchedule_FrequencyType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskScheduleModifiedByUsers).HasConstraintName("FK_TaskSchedule_ModifiedBy");

            entity.HasOne(d => d.TaskType).WithMany(p => p.TaskSchedules)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskSchedule_TaskType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskSchedules)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskSchedule_UserArea");
        });

        modelBuilder.Entity<TaskScheduleAssignment>(entity =>
        {
            entity.HasKey(e => e.TaskScheduleAssignmentID).HasName("PK__TaskSche__613162FC3204C00E");

            entity.HasOne(d => d.Employee).WithMany(p => p.TaskScheduleAssignments).HasConstraintName("FK_TaskScheduleAssignment_Employee");

            entity.HasOne(d => d.Location).WithMany(p => p.TaskScheduleAssignments).HasConstraintName("FK_TaskScheduleAssignment_Location");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskScheduleAssignments).HasConstraintName("FK_TaskScheduleAssignment_OrgGroup");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.TaskScheduleAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleAssignment_TaskSchedule");
        });

        modelBuilder.Entity<TaskScheduleEmployee>(entity =>
        {
            entity.HasKey(e => e.TaskScheduleEmployeeID).HasName("PK__TaskSche__F7504638EFF2AB56");

            entity.HasOne(d => d.Employee).WithMany(p => p.TaskScheduleEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleEmployee_Employee");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.TaskScheduleEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleEmployee_TaskSchedule");
        });

        modelBuilder.Entity<TaskScheduleNonEmployee>(entity =>
        {
            entity.HasKey(e => e.TaskScheduleNonEmployeeID).HasName("PK__TaskSche__5791BCE338D212F5");

            entity.HasOne(d => d.JobRole).WithMany(p => p.TaskScheduleNonEmployees).HasConstraintName("FK_TaskScheduleNonEmployee_JobRole");

            entity.HasOne(d => d.Location).WithMany(p => p.TaskScheduleNonEmployees).HasConstraintName("FK_TaskScheduleNonEmployee_Location");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskScheduleNonEmployees).HasConstraintName("FK_TaskScheduleNonEmployee_OrgGroup");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.TaskScheduleNonEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleNonEmployee_TaskSchedule");
        });

        modelBuilder.Entity<TaskScheduleOrgGroup>(entity =>
        {
            entity.HasKey(e => e.TaskScheduleOrgGroupID).HasName("PK__TaskSche__09E08932A1A09B3D");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TaskScheduleOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleOrgGroup_OrgGroup");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.TaskScheduleOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskScheduleOrgGroup_TaskSchedule");
        });

        modelBuilder.Entity<TaskSeverity>(entity =>
        {
            entity.HasKey(e => e.TaskSeverityID).HasName("PK__TaskSeve__5A54E3C860494354");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskSeverities).HasConstraintName("FK_TaskSeverity_UserArea");
        });

        modelBuilder.Entity<TaskStatusType>(entity =>
        {
            entity.HasKey(e => e.TaskStatusTypeID).HasName("PK__TaskStat__5C91B522C81C905E");

            entity.Property(e => e.CreatedByUserID).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskStatusTypeArchivedByUsers).HasConstraintName("FK_TaskStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskStatusTypeModifiedByUsers).HasConstraintName("FK_TaskStatusType_ModifiedBy");
        });

        modelBuilder.Entity<TaskType>(entity =>
        {
            entity.HasKey(e => e.TaskTypeID).HasName("PK__TaskType__66B23E539D92AE87");

            entity.Property(e => e.TaskTypeID).ValueGeneratedNever();
            entity.Property(e => e.CreatedByUserID).HasDefaultValue(1);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TaskTypeArchivedByUsers).HasConstraintName("FK_TaskType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TaskTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TaskTypeModifiedByUsers).HasConstraintName("FK_TaskType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskTypes).HasConstraintName("FK_TaskType_UserArea");
        });

        modelBuilder.Entity<TaskTypeUserArea>(entity =>
        {
            entity.HasKey(e => e.TaskTypeUserAreaID).HasName("PK__TaskType__C69E2CE21B667099");

            entity.HasOne(d => d.TaskType).WithMany(p => p.TaskTypeUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskTypeUserArea_TaskType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TaskTypeUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaskTypeUserArea_UserArea");
        });

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.TenantID).HasName("PK__Tenant__2E9B4781C6FFB1F7");

            entity.Property(e => e.Status).HasDefaultValue("Active");
        });

        modelBuilder.Entity<TenantElementPermission>(entity =>
        {
            entity.HasKey(e => e.TenantElementPermissionID).HasName("PK__TenantEl__BDB468002BF27FE9");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsGranted).HasDefaultValue(true);

            entity.HasOne(d => d.Tenant).WithMany(p => p.TenantElementPermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantElementPermissions_Tenant");

            entity.HasOne(d => d.TenantRole).WithMany(p => p.TenantElementPermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantElementPermissions_TenantRole");
        });

        modelBuilder.Entity<TenantPagePermission>(entity =>
        {
            entity.HasKey(e => e.TenantPagePermissionID).HasName("PK__TenantPa__7E9126C35AF42CD1");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsGranted).HasDefaultValue(true);

            entity.HasOne(d => d.Tenant).WithMany(p => p.TenantPagePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantPagePermissions_Tenant");

            entity.HasOne(d => d.TenantRole).WithMany(p => p.TenantPagePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantPagePermissions_TenantRole");
        });

        modelBuilder.Entity<TenantRole>(entity =>
        {
            entity.HasKey(e => e.TenantRoleID).HasName("PK__TenantRo__CE72083CB4DA7D71");

            entity.Property(e => e.IsCustomRole).HasDefaultValue(true);

            entity.HasOne(d => d.Tenant).WithMany(p => p.TenantRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantRole_Tenant");
        });

        modelBuilder.Entity<TenantRolePermission>(entity =>
        {
            entity.HasKey(e => e.TenantRolePermissionID).HasName("PK__TenantRo__450A7D637A20563F");

            entity.Property(e => e.IsGranted).HasDefaultValue(true);

            entity.HasOne(d => d.Permission).WithMany(p => p.TenantRolePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantRolePermission_SystemPermission");

            entity.HasOne(d => d.Tenant).WithMany(p => p.TenantRolePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantRolePermission_Tenant");
        });

        modelBuilder.Entity<TenantServicePermission>(entity =>
        {
            entity.HasKey(e => e.TenantServicePermissionID).HasName("PK__TenantSe__BEED88E3E14E0F16");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsEnabled).HasDefaultValue(true);

            entity.HasOne(d => d.Tenant).WithMany(p => p.TenantServicePermissions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TenantServicePermission_Tenant");
        });

        modelBuilder.Entity<TextBlock>(entity =>
        {
            entity.HasKey(e => e.TextBlockID).HasName("PK__TextBloc__08827E8EEECEAE63");

            entity.Property(e => e.CanUploadAttachments).HasDefaultValue(true);
            entity.Property(e => e.IsMultiLine).HasDefaultValue(true);
            entity.Property(e => e.Version).HasDefaultValue((byte)1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockArchivedByUsers).HasConstraintName("FK_TextBlock_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlock_CreatedBy");

            entity.HasOne(d => d.ExposureType).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_ExposureType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockModifiedByUsers).HasConstraintName("FK_TextBlock_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_OrgGroup");

            entity.HasOne(d => d.OriginalTextBlock).WithMany(p => p.InverseOriginalTextBlock).HasConstraintName("FK_TextBlock_OriginalTextBlock");

            entity.HasOne(d => d.TemplateTextBlock).WithMany(p => p.InverseTemplateTextBlock).HasConstraintName("FK_TextBlock_TemplateTextBlock");

            entity.HasOne(d => d.TextBlockCategory).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_TextBlockCategory");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_TextBlockCollection");

            entity.HasOne(d => d.TextBlockSection).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_TextBlockSection");

            entity.HasOne(d => d.TextBlockStatusType).WithMany(p => p.TextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlock_TextBlockStatusType");

            entity.HasOne(d => d.TextBlockType).WithMany(p => p.TextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlock_TextBlockType");

            entity.HasOne(d => d.Theme).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_ThemeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_UserArea");

            entity.HasOne(d => d.YesNoNAType).WithMany(p => p.TextBlocks).HasConstraintName("FK_TextBlock_YesNoNAType");
        });

        modelBuilder.Entity<TextBlockApprovalLog>(entity =>
        {
            entity.HasKey(e => e.TextBlockApprovalLogID).HasName("PK__TextBloc__364659A618C29405");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockApprovalLogArchivedByUsers).HasConstraintName("FK_TextBlockApprovalLog_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockApprovalLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockApprovalLog_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockApprovalLogModifiedByUsers).HasConstraintName("FK_TextBlockApprovalLog_ModifiedBy");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockApprovalLog_TextBlock");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TextBlockApprovalLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockApprovalLog_UserArea");
        });

        modelBuilder.Entity<TextBlockAttachment>(entity =>
        {
            entity.HasKey(e => e.TextBlockAttachmentID).HasName("PK__TextBloc__635881BCA90B1D33");

            entity.Property(e => e.IsPolicyLevelAttachment).HasDefaultValue(false);

            entity.HasOne(d => d.Attachment).WithMany(p => p.TextBlockAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockAttachment_Attachment (AttachmentID)");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.TextBlockAttachments).HasConstraintName("FK_TextBlockAttachment_TextBlockCollection");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockAttachments).HasConstraintName("FK_TextBlock_TextBlock");
        });

        modelBuilder.Entity<TextBlockCategory>(entity =>
        {
            entity.HasKey(e => e.TextBlockCategoryID).HasName("PK__TextBloc__D157A5B4876A1CC0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockCategoryArchivedByUsers).HasConstraintName("FK_TextBlockCategory_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockCategoryCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCategory_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockCategoryModifiedByUsers).HasConstraintName("FK_TextBlockCategory_ModifiedBy");

            entity.HasOne(d => d.ParentTextBlockCategory).WithMany(p => p.InverseParentTextBlockCategory).HasConstraintName("FK_TextBlockCategory_TextBlockCategory");

            entity.HasOne(d => d.TextBlockCategoryType).WithMany(p => p.TextBlockCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCategory_TextBlockCategoryType");

            entity.HasOne(d => d.TextBlockType).WithMany(p => p.TextBlockCategories).HasConstraintName("FK_TextBlockCategory_TextBlockType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TextBlockCategories).HasConstraintName("FK_TextBlockCategory_UserArea");
        });

        modelBuilder.Entity<TextBlockCategoryType>(entity =>
        {
            entity.HasKey(e => e.TextBlockCategoryTypeID).HasName("PK__TextBloc__F3684536EC4A7F70");

            entity.Property(e => e.TextBlockCategoryTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<TextBlockCollection>(entity =>
        {
            entity.HasKey(e => e.TextBlockCollectionID).HasName("PK__TextBloc__A3A341D78BE3ADB7");

            entity.Property(e => e.OrderNum).HasDefaultValue(1);
            entity.Property(e => e.Version).HasDefaultValue((byte)1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockCollectionArchivedByUsers).HasConstraintName("FK_TextBlockCollection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockCollectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollection_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.TextBlockCollections).HasConstraintName("FK_TextBlockCollection_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockCollectionModifiedByUsers).HasConstraintName("FK_TextBlockCollection_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TextBlockCollections).HasConstraintName("FK_TextBlockCollection_OrgGroup");

            entity.HasOne(d => d.OriginalTextBlockCollection).WithMany(p => p.InverseOriginalTextBlockCollection).HasConstraintName("FK_TextBlockCollection_OriginalTextBlockCollection");

            entity.HasOne(d => d.TemplateTextBlockCollection).WithMany(p => p.InverseTemplateTextBlockCollection).HasConstraintName("FK_TextBlockCollection_TemplateTextBlockCollection");

            entity.HasOne(d => d.TextBlockCategory).WithMany(p => p.TextBlockCollections).HasConstraintName("FK_TextBlockCollection_TextBlockCategory");

            entity.HasOne(d => d.TextBlockStatusType).WithMany(p => p.TextBlockCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollection_TextBlockStatusType");

            entity.HasOne(d => d.TextBlockType).WithMany(p => p.TextBlockCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollection_TextBlockType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TextBlockCollections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollection_UserArea");
        });

        modelBuilder.Entity<TextBlockCollectionEmployee>(entity =>
        {
            entity.HasKey(e => e.TextBlockCollectionEmployeeID).HasName("PK__TextBloc__E3525FF3E9DF5D14");

            entity.HasOne(d => d.Employee).WithMany(p => p.TextBlockCollectionEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollectionEmployee_Employee");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.TextBlockCollectionEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCollectionEmployee_TextBlockCollection");
        });

        modelBuilder.Entity<TextBlockCourse>(entity =>
        {
            entity.HasKey(e => e.TextBlockCourseID).HasName("PK__TextBloc__4F1F738D65F8719B");

            entity.HasOne(d => d.Course).WithMany(p => p.TextBlockCourses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCourse_Course");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockCourses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCourse_CreatedBy");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockCourses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockCourse_TextBlock");
        });

        modelBuilder.Entity<TextBlockEmployee>(entity =>
        {
            entity.HasKey(e => e.TextBlockEmployeeID).HasName("PK__TextBloc__082FC825EE8E4D37");

            entity.HasOne(d => d.Employee).WithMany(p => p.TextBlockEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockEmployee_Employee");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockEmployee_TextBlock");
        });

        modelBuilder.Entity<TextBlockLocation>(entity =>
        {
            entity.HasKey(e => e.TextBlockLocationID).HasName("PK__TextBloc__378856A8B9B034D0");

            entity.HasOne(d => d.Location).WithMany(p => p.TextBlockLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockLocation_Location");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockLocations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockLocation_TextBlock");
        });

        modelBuilder.Entity<TextBlockOrgGroup>(entity =>
        {
            entity.HasKey(e => e.TextBlockOrgGroupID).HasName("PK__TextBloc__45B40CE0F0DF878F");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.TextBlockOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockOrgGroup_OrgGroup");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockOrgGroups)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockOrgGroup_TextBlock");
        });

        modelBuilder.Entity<TextBlockQuestionnaireSection>(entity =>
        {
            entity.HasKey(e => e.TextBlockQuestionnaireSectionID).HasName("PK__TextBloc__FCB9969209506F91");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockQuestionnaireSectionArchivedByUsers).HasConstraintName("FK_TextBlockQuestionnaireSection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockQuestionnaireSectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockQuestionnaireSection_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockQuestionnaireSectionModifiedByUsers).HasConstraintName("FK_TextBlockQuestionnaireSection_ModifiedBy");

            entity.HasOne(d => d.QuestionnaireResponse).WithMany(p => p.TextBlockQuestionnaireSections).HasConstraintName("FK_TextBlockQuestionnaireSection_QuestionnaireResponse");

            entity.HasOne(d => d.QuestionnaireSection).WithMany(p => p.TextBlockQuestionnaireSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockQuestionnaireSection_QuestionnaireSection");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.TextBlockQuestionnaireSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockQuestionnaireSection_TextBlock");
        });

        modelBuilder.Entity<TextBlockSection>(entity =>
        {
            entity.HasKey(e => e.TextBlockSectionID).HasName("PK__TextBloc__3767A7A2F81DF51F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TextBlockSectionArchivedByUsers).HasConstraintName("FK_TextBlockSection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TextBlockSectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockSection_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TextBlockSectionModifiedByUsers).HasConstraintName("FK_TextBlockSection_ModifiedBy");

            entity.HasOne(d => d.TemplateTextBlockSection).WithMany(p => p.InverseTemplateTextBlockSection).HasConstraintName("FK_TextBlockSection_TemplateTextBlockSection");

            entity.HasOne(d => d.TextBlockCollection).WithMany(p => p.TextBlockSections).HasConstraintName("FK_TextBlockSection_TextBlockCollection");

            entity.HasOne(d => d.TextBlockType).WithMany(p => p.TextBlockSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TextBlockSection_TextBlockType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TextBlockSections).HasConstraintName("FK_TextBlockSection_UserArea");
        });

        modelBuilder.Entity<TextBlockStatusType>(entity =>
        {
            entity.HasKey(e => e.TextBlockStatusTypeID).HasName("PK__TextBloc__0C1F226F1ACB6257");

            entity.Property(e => e.TextBlockStatusTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<TextBlockType>(entity =>
        {
            entity.HasKey(e => e.TextBlockTypeID).HasName("PK__TextBloc__0271555E2B209DB7");

            entity.Property(e => e.TextBlockTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<Theme>(entity =>
        {
            entity.HasKey(e => e.ThemeID).HasName("PK__Theme__FBB3E4B9A652332E");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.ThemeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Theme_ArchivedBy");

            entity.HasOne(d => d.LogoAttachment).WithMany(p => p.Themes).HasConstraintName("FK_Theme_LogoAttachment");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.ThemeModifiedByUsers).HasConstraintName("FK_Theme_LastUpdatedBy");

            entity.HasOne(d => d.OwnerUserArea).WithMany(p => p.Themes).HasConstraintName("FK_Theme_OwnerUserAreaID");
        });

        modelBuilder.Entity<ThemeElement>(entity =>
        {
            entity.HasKey(e => e.ThemeElementID).HasName("PK__ThemeEle__BA93F91E8CBF5F32");
        });

        modelBuilder.Entity<ThemeElementProperty>(entity =>
        {
            entity.HasKey(e => e.ThemeElementPropertyID).HasName("PK__ThemeEle__B6C3FE254D99EDBA");

            entity.HasOne(d => d.ThemeElement).WithMany(p => p.ThemeElementProperties)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ThemeElementProperty_ThemeElement");
        });

        modelBuilder.Entity<ThemeElementPropertyValue>(entity =>
        {
            entity.HasKey(e => e.ThemeElementPropertyValueID).HasName("PK__ThemeEle__9E8AC86EA84E7159");

            entity.HasOne(d => d.ThemeElementProperty).WithMany(p => p.ThemeElementPropertyValues)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ThemeElementPropertyValue_ThemeElementProperty");

            entity.HasOne(d => d.Theme).WithMany(p => p.ThemeElementPropertyValues)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ThemeElementPropertyValue_Theme");
        });

        modelBuilder.Entity<ThemeType>(entity =>
        {
            entity.HasKey(e => e.ThemeTypeID).HasName("PK__ThemeTyp__D48378148FAFE488");

            entity.Property(e => e.ThemeTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<TribunalCase>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseID).HasName("PK__Tribunal__BDD76D69BE5B36CC");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseArchivedByUsers).HasConstraintName("FK_TribunalCase_ArchivedByUser");

            entity.HasOne(d => d.ClaimantEmployee).WithMany(p => p.TribunalCaseClaimantEmployees).HasConstraintName("FK_TribunalCase_ClaimantEmployee");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCase_CreatedByUser");

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.TribunalCaseManagerEmployees).HasConstraintName("FK_TribunalCase_ManagerEmployee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseModifiedByUsers).HasConstraintName("FK_TribunalCase_ModifiedByUser");

            entity.HasOne(d => d.TribunalCaseStatusType).WithMany(p => p.TribunalCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCase_TribunalCaseStatusType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCase_UserArea");
        });

        modelBuilder.Entity<TribunalCaseAttachment>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseAttachmentID).HasName("PK__Tribunal__2874B004079155DF");

            entity.HasOne(d => d.Attachment).WithMany(p => p.TribunalCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachment_Attachment");

            entity.HasOne(d => d.TribunalCaseAttachmentType).WithMany(p => p.TribunalCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachment_TribunalCaseAttachmentType");

            entity.HasOne(d => d.TribunalCaseEventType).WithMany(p => p.TribunalCaseAttachments).HasConstraintName("FK_TribunalCaseAttachment_TribunalCaseEventType");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachment_TribunalCase");

            entity.HasOne(d => d.TribunalCasePersonType).WithMany(p => p.TribunalCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachment_TribunalCasePersonType");

            entity.HasOne(d => d.TribunalCaseSeverityType).WithMany(p => p.TribunalCaseAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachment_TribunalCaseSeverityType");
        });

        modelBuilder.Entity<TribunalCaseAttachmentNote>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseAttachmentNoteID).HasName("PK__Tribunal__F93C45C89E8148CE");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseAttachmentNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentNote_CreatedByUser");

            entity.HasOne(d => d.TribunalCaseAttachment).WithMany(p => p.TribunalCaseAttachmentNotes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentNote_TribunalCaseAttachment");
        });

        modelBuilder.Entity<TribunalCaseAttachmentTagType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseAttachmentTagTypeID).HasName("PK__Tribunal__B13FD67CA640EA63");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseAttachmentTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentTagType_CreatedByUser");

            entity.HasOne(d => d.TagType).WithMany(p => p.TribunalCaseAttachmentTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentTagType_TagType");

            entity.HasOne(d => d.TribunalCaseAttachment).WithMany(p => p.TribunalCaseAttachmentTagTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentTagType_TribunalCaseAttachment");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseAttachmentTagTypes).HasConstraintName("FK_TribunalCaseAttachmentTagType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseAttachmentType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseAttachmentTypeID).HasName("PK__Tribunal__34383EF2E981C9CF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseAttachmentTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseAttachmentType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseAttachmentTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseAttachmentType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseAttachmentTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseAttachmentType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseAttachmentTypes).HasConstraintName("FK_TribunalCaseAttachmentType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseContact>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseContactID).HasName("PK__Tribunal__B271C9F0F13D81C9");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseContactArchivedByUsers).HasConstraintName("FK_TribunalCaseContact_ArchivedByUser");

            entity.HasOne(d => d.Contact).WithMany(p => p.TribunalCaseContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseContact_Contact");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseContactCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseContact_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseContactModifiedByUsers).HasConstraintName("FK_TribunalCaseContact_ModifiedByUser");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseContact_TribunalCase");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseContact_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.TribunalCaseContactUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseContact_User");
        });

        modelBuilder.Entity<TribunalCaseCounsel>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseCounselID).HasName("PK__Tribunal__1EAC3B835EF16E49");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseCounselArchivedByUsers).HasConstraintName("FK_TribunalCaseCounsel_ArchivedByUser");

            entity.HasOne(d => d.Counsel).WithMany(p => p.TribunalCaseCounsels)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseCounsel_Counsel");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseCounselCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseCounsel_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseCounselModifiedByUsers).HasConstraintName("FK_TribunalCaseCounsel_ModifiedByUser");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseCounsels)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseCounsel_TribunalCase");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseCounsels).HasConstraintName("FK_TribunalCaseCounsel_UserArea");
        });

        modelBuilder.Entity<TribunalCaseDistribution>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseDistributionID).HasName("PK__Tribunal__2988ABC7258CD508");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseDistributionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseDistribution_CreatedByUser");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseDistributions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseDistribution_TribunalCase");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseDistributions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseDistribution_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.TribunalCaseDistributionUsers).HasConstraintName("FK_TribunalCaseDistribution_User");
        });

        modelBuilder.Entity<TribunalCaseEvent>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseEventID).HasName("PK__Tribunal__57F033DD489E5693");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseEventArchivedByUsers).HasConstraintName("FK_TribunalCaseEvent_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseEventCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseEvent_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseEventModifiedByUsers).HasConstraintName("FK_TribunalCaseEvent_ModifiedByUser");

            entity.HasOne(d => d.TribunalCaseEventType).WithMany(p => p.TribunalCaseEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseEvent_TribunalCaseEventType");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseEvents)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseEvent_TribunalCase");
        });

        modelBuilder.Entity<TribunalCaseEventType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseEventTypeID).HasName("PK__Tribunal__25072F9E9D901294");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseEventTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseEventType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseEventTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseEventType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseEventTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseEventType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseEventTypes).HasConstraintName("FK_TribunalCaseEventType_UserArea");
        });

        modelBuilder.Entity<TribunalCasePersonType>(entity =>
        {
            entity.HasKey(e => e.TribunalCasePersonTypeID).HasName("PK__Tribunal__FE735254EE5F3095");

            entity.Property(e => e.TribunalCasePersonTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCasePersonTypeArchivedByUsers).HasConstraintName("FK_TribunalCasePersonType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCasePersonTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCasePersonType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCasePersonTypeModifiedByUsers).HasConstraintName("FK_TribunalCasePersonType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCasePersonTypes).HasConstraintName("FK_TribunalCasePersonType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseSeverityType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseSeverityTypeID).HasName("PK__Tribunal__722DCE42B81C2CEB");

            entity.Property(e => e.TribunalCaseSeverityTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseSeverityTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseSeverityType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseSeverityTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseSeverityType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseSeverityTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseSeverityType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseSeverityTypes).HasConstraintName("FK_TribunalCaseSeverityType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseStatusType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseStatusTypeID).HasName("PK__Tribunal__A69DD058E07B6C2A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseStatusTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseStatusType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseStatusTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseStatusType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseStatusTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseStatusType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseStatusTypes).HasConstraintName("FK_TribunalCaseStatusType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseTribunalCaseType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseTribunalCaseTypeID).HasName("PK__Tribunal__BA5F6DB95E049B0F");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseTribunalCaseTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseTribunalCaseType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseTribunalCaseTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseTribunalCaseType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseTribunalCaseTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseTribunalCaseType_ModifiedBy");

            entity.HasOne(d => d.TribunalCase).WithMany(p => p.TribunalCaseTribunalCaseTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseTribunalCaseType_TribunalCase");

            entity.HasOne(d => d.TribunalCaseType).WithMany(p => p.TribunalCaseTribunalCaseTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseTribunalCaseType_TribunalCaseType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseTribunalCaseTypes).HasConstraintName("FK_TribunalCaseTribunalCaseType_UserArea");
        });

        modelBuilder.Entity<TribunalCaseType>(entity =>
        {
            entity.HasKey(e => e.TribunalCaseTypeID).HasName("PK__Tribunal__F822A46EAA218E39");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.TribunalCaseTypeArchivedByUsers).HasConstraintName("FK_TribunalCaseType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.TribunalCaseTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TribunalCaseType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.TribunalCaseTypeModifiedByUsers).HasConstraintName("FK_TribunalCaseType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.TribunalCaseTypes).HasConstraintName("FK_TribunalCaseType_UserArea");
        });

        modelBuilder.Entity<UnarchiveLog>(entity =>
        {
            entity.HasKey(e => e.UnarchiveLogID).HasName("PK__Unarchiv__7F00514A3E17A4D6");
        });

        modelBuilder.Entity<Update>(entity =>
        {
            entity.HasKey(e => e.UpdateID).HasName("PK__Update__7A0CF325DF430612");

            entity.Property(e => e.UpdateTypeID).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UpdateArchivedByUsers).HasConstraintName("FK_Update_ArchivedByUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UpdateCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Update_CreatedByUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UpdateModifiedByUsers).HasConstraintName("FK_Update_ModifiedByUserID");

            entity.HasOne(d => d.UpdateType).WithMany(p => p.Updates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Update_UpdateTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Updates).HasConstraintName("FK_Update_UserAreaID");
        });

        modelBuilder.Entity<UpdateType>(entity =>
        {
            entity.HasKey(e => e.UpdateTypeID).HasName("PK__UpdateTy__C6E97651D2D0B68C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserID).HasName("PK__User__1788CCAC2E97E883");

            entity.HasIndex(e => e.AzureADObjectId, "UQ_User_AzureADObjectId")
                .IsUnique()
                .HasFilter("([AzureADObjectId] IS NOT NULL)");

            entity.HasIndex(e => e.Username, "UQ_User_Username")
                .IsUnique()
                .HasFilter("([Username] IS NOT NULL)");

            entity.Property(e => e.GUID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IsMobileAppUser).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.InverseArchivedByUser).HasConstraintName("FK_User_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.InverseCreatedByUser).HasConstraintName("FK_User_CreatedBy");

            entity.HasOne(d => d.MasterUserArea).WithMany(p => p.Users).HasConstraintName("FK_User_UserArea");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.InverseModifiedByUser).HasConstraintName("FK_User_ModifiedBy");
        });

        modelBuilder.Entity<UserArea>(entity =>
        {
            entity.HasKey(e => e.UserAreaID).HasName("PK__UserArea__F030C707C1BE6B26");

            entity.Property(e => e.GUID).HasDefaultValueSql("(newid())");
            entity.Property(e => e.ThemeTypeID).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaArchivedByUsers).HasConstraintName("FK_UserArea_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserArea_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaModifiedByUsers).HasConstraintName("FK_UserArea_ModifiedBy");

            entity.HasOne(d => d.ThemeType).WithMany(p => p.UserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserArea_ThemeType");
        });

        modelBuilder.Entity<UserAreaAccidentForm>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentFormID).HasName("PK__UserArea__1C45F7143C882162");

            entity.Property(e => e.HasSeverityOptionEnabled).HasDefaultValue(true);
            entity.Property(e => e.IsEnabledForApp).HasDefaultValue(true);
            entity.Property(e => e.IsEnabledForWeb).HasDefaultValue(true);
            entity.Property(e => e.LatestTemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.InvestigationUserAreaAccidentForm).WithMany(p => p.InverseInvestigationUserAreaAccidentForm).HasConstraintName("FK_UserAreaAccidentForm_InvestigationForm");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaAccidentForms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentForm_UserArea");
        });

        modelBuilder.Entity<UserAreaAccidentFormQuestion>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentFormQuestionID).HasName("PK__UserArea__57B7FBE375DA6F57");

            entity.Property(e => e.TemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.UserAreaAccidentForm).WithMany(p => p.UserAreaAccidentFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestion_UserAreaAccidentForm");

            entity.HasOne(d => d.UserAreaAccidentQuestion).WithMany(p => p.UserAreaAccidentFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestion_UserAreaAccidentQuestion");

            entity.HasOne(d => d.UserAreaAccidentSection).WithMany(p => p.UserAreaAccidentFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestion_UserAreaAccidentSection");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaAccidentFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestion_UserArea");
        });

        modelBuilder.Entity<UserAreaAccidentFormQuestionTag>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentFormQuestionTagID).HasName("PK__UserArea__A369B76E116BC4D7");

            entity.HasOne(d => d.UserAreaAccidentFormQuestion).WithMany(p => p.UserAreaAccidentFormQuestionTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestionTag_UserAreaAccidentFormQuestion");

            entity.HasOne(d => d.UserAreaAccidentTag).WithMany(p => p.UserAreaAccidentFormQuestionTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentFormQuestionTag_UserAreaAccidentTag");
        });

        modelBuilder.Entity<UserAreaAccidentQuestion>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentQuestionID).HasName("PK__UserArea__1D6288AC2ACF2C95");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.UserAreaAccidentQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentQuestion_AnswerType");

            entity.HasOne(d => d.OriginalUserAreaAccidentQuestion).WithMany(p => p.InverseOriginalUserAreaAccidentQuestion).HasConstraintName("FK_UserAreaAccidentQuestion_OriginalID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaAccidentQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentQuestion_UserArea");
        });

        modelBuilder.Entity<UserAreaAccidentQuestionTag>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentQuestionTagID).HasName("PK__UserArea__86C6D0BA58FE3A06");

            entity.HasOne(d => d.OriginalUserAreaAccidentQuestion).WithMany(p => p.UserAreaAccidentQuestionTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentQuestionTag_UserAreaAccidentQuestion");

            entity.HasOne(d => d.UserAreaAccidentForm).WithMany(p => p.UserAreaAccidentQuestionTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentQuestionTag_UserAreaAccidentForm");

            entity.HasOne(d => d.UserAreaAccidentTag).WithMany(p => p.UserAreaAccidentQuestionTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentQuestionTag_UserAreaAccidentTag");
        });

        modelBuilder.Entity<UserAreaAccidentSection>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentSectionID).HasName("PK__UserArea__86C3A899F7C0C622");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaAccidentSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentSection_UserArea");
        });

        modelBuilder.Entity<UserAreaAccidentTag>(entity =>
        {
            entity.HasKey(e => e.UserAreaAccidentTagID).HasName("PK__UserArea__CE5706F5DE94D388");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaAccidentTagArchivedByUsers).HasConstraintName("FK_UserAreaAccidentTag_ArchivedByUser");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaAccidentTagCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentTag_CreatedByUser");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaAccidentTagModifiedByUsers).HasConstraintName("FK_UserAreaAccidentTag_ModifiedByUser");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaAccidentTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaAccidentTag_UserArea");
        });

        modelBuilder.Entity<UserAreaActivity>(entity =>
        {
            entity.HasKey(e => e.UserAreaActivityID).HasName("PK__UserArea__D325596AA727DB33");

            entity.HasOne(d => d.MainActivityType).WithMany(p => p.UserAreaActivities).HasConstraintName("FK_UserAreaActivity_MainActivityType");

            entity.HasOne(d => d.MainIndustryType).WithMany(p => p.UserAreaActivities).HasConstraintName("FK_UserAreaActivity_MainIndustryType");

            entity.HasOne(d => d.SubActivityType).WithMany(p => p.UserAreaActivities).HasConstraintName("FK_UserAreaActivity_SubActivityType");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaActivity)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaActivity_UserArea");
        });

        modelBuilder.Entity<UserAreaChecklistSetting>(entity =>
        {
            entity.HasKey(e => e.UserAreaChecklistSettingsID).HasName("PK__UserArea__0F200C79F7658D16");

            entity.Property(e => e.AssessmentTaskDueDateLookAhead).HasDefaultValue(7);
            entity.Property(e => e.MaxCompleteNowChecklist).HasDefaultValue((byte)0);

            entity.HasOne(d => d.ManagerEmployee).WithMany(p => p.UserAreaChecklistSettings).HasConstraintName("FK_UserAreaChecklistSettings_Employee");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaChecklistSetting)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaChecklistSettings_UserArea");
        });

        modelBuilder.Entity<UserAreaConfiguration>(entity =>
        {
            entity.HasKey(e => e.UserAreaConfigurationID).HasName("PK__UserArea__2F0D89E759D4DBBE");

            entity.HasOne(d => d.ConfigurationType).WithMany(p => p.UserAreaConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaConfiguration_ConfigurationType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaConfiguration_UserArea");
        });

        modelBuilder.Entity<UserAreaContact>(entity =>
        {
            entity.HasKey(e => e.UserAreaContactID).HasName("PK__UserArea__35C750A3F6B09532");

            entity.HasOne(d => d.Contact).WithMany(p => p.UserAreaContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaContact_Contact");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaContact_UserArea");
        });

        modelBuilder.Entity<UserAreaContractor>(entity =>
        {
            entity.HasKey(e => e.UserAreaContractorID).HasName("PK__UserArea__BCA371932BA28C99");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaContractorArchivedByUsers).HasConstraintName("FK_UserAreaContractor_ArchivedBy");

            entity.HasOne(d => d.ContractorUserArea).WithMany(p => p.UserAreaContractorContractorUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaContractor_Employee");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaContractorCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaContractor_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaContractorModifiedByUsers).HasConstraintName("FK_UserAreaContractor_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaContractorUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaContractor_UserArea");
        });

        modelBuilder.Entity<UserAreaCostType>(entity =>
        {
            entity.HasKey(e => e.UserAreaCostTypeID).HasName("PK__UserArea__13C56086BCEBC39A");

            entity.HasOne(d => d.CostType).WithMany(p => p.UserAreaCostTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCostType_CostType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaCostTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCostType_UserArea");
        });

        modelBuilder.Entity<UserAreaCredit>(entity =>
        {
            entity.HasKey(e => e.UserAreaCreditID).HasName("PK__UserArea__BE932A08A148F0E4");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaCreditArchivedByUsers).HasConstraintName("FK_UserAreaCredit_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaCreditCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCredit_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaCreditModifiedByUsers).HasConstraintName("FK_UserAreaCredit_ModifiedBy");

            entity.HasOne(d => d.Role).WithMany(p => p.UserAreaCredits).HasConstraintName("FK_UserAreaCredit_Role");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaCredits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCredit_UserAreaID");
        });

        modelBuilder.Entity<UserAreaCreditLog>(entity =>
        {
            entity.HasKey(e => e.UserAreaCreditLogID).HasName("PK__UserArea__FAB9825B45815232");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaCreditLogArchivedByUsers).HasConstraintName("FK_UserAreaCreditLog_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaCreditLogCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCreditLog_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaCreditLogModifiedByUsers).HasConstraintName("FK_UserAreaCreditLog_ModifiedBy");

            entity.HasOne(d => d.Role).WithMany(p => p.UserAreaCreditLogs).HasConstraintName("FK_UserAreaCreditLog_Role");

            entity.HasOne(d => d.UserAreaCredit).WithMany(p => p.UserAreaCreditLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCreditLog_UserAreaCreditID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaCreditLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaCreditLog_UserAreaID");
        });

        modelBuilder.Entity<UserAreaDivision>(entity =>
        {
            entity.HasKey(e => e.UserAreaDivisionID).HasName("PK__UserArea__094212F0307C1420");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaDivisionArchivedByUsers).HasConstraintName("FK_UserAreaDivision_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaDivisionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaDivision_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaDivisionModifiedByUsers).HasConstraintName("FK_UserAreaDivision_ModifiedBy");

            entity.HasOne(d => d.RootOrgGroup).WithMany(p => p.UserAreaDivisions).HasConstraintName("FK_UserAreaDivision_OrgGroup");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaDivisions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaDivision_UserArea");
        });

        modelBuilder.Entity<UserAreaDocRegisterDocType>(entity =>
        {
            entity.HasKey(e => e.UserAreaDocRegisterDocTypeID).HasName("PK__UserArea__8B3E888B00A461B2");

            entity.HasOne(d => d.DocRegisterDocType).WithMany(p => p.UserAreaDocRegisterDocTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaDocRegisterDocType_DocRegisterDocType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaDocRegisterDocTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaDocRegisterDocType_UserArea");
        });

        modelBuilder.Entity<UserAreaEntityCacheConfiguration>(entity =>
        {
            entity.HasKey(e => e.UserAreaEntityCacheConfigurationID).HasName("PK__UserArea__CBA1209008BBFFF0");

            entity.HasOne(d => d.DocumentLinkTableType).WithMany(p => p.UserAreaEntityCacheConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaEntityCacheConfiguration_DocumentLinkTableType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaEntityCacheConfigurations).HasConstraintName("FK_UserAreaEntityCacheConfiguration_UserAreaID");
        });

        modelBuilder.Entity<UserAreaForm>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormID).HasName("PK__UserArea__45122BC40050A963");

            entity.Property(e => e.IsEnabledForApp).HasDefaultValue(true);
            entity.Property(e => e.IsEnabledForWeb).HasDefaultValue(true);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormArchivedByUsers).HasConstraintName("FK_UserAreaForm_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaForm_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormModifiedByUsers).HasConstraintName("FK_UserAreaForm_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaForms).HasConstraintName("FK_UserAreaForm_UserArea");
        });

        modelBuilder.Entity<UserAreaFormQuestion>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormQuestionID).HasName("PK__UserArea__00E1A26BEDB11674");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.UserAreaFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormQuestion_AnswerType");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormQuestionArchivedByUsers).HasConstraintName("FK_UserAreaFormQuestion_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormQuestionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormQuestion_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormQuestionModifiedByUsers).HasConstraintName("FK_UserAreaFormQuestion_ModifiedBy");

            entity.HasOne(d => d.UserAreaFormSection).WithMany(p => p.UserAreaFormQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormQuestion_UserAreaFormSection");
        });

        modelBuilder.Entity<UserAreaFormQuestionAnswer>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormQuestionAnswerID).HasName("PK__UserArea__756DCBDD8AAE5AAE");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormQuestionAnswerArchivedByUsers).HasConstraintName("FK_UserAreaFormQuestionAnswer_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormQuestionAnswerCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormQuestionAnswer_CreatedBy");

            entity.HasOne(d => d.JumpToOriginalUserAreaFormSection).WithMany(p => p.UserAreaFormQuestionAnswers).HasConstraintName("FK_UserAreaFormQuestionAnswer_OriginalUserAreaFormSection");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormQuestionAnswerModifiedByUsers).HasConstraintName("FK_UserAreaFormQuestionAnswer_ModifiedBy");

            entity.HasOne(d => d.UserAreaFormQuestion).WithMany(p => p.UserAreaFormQuestionAnswers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormQuestionAnswer_UserAreaFormQuestion");
        });

        modelBuilder.Entity<UserAreaFormResponse>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormResponseID).HasName("PK__UserArea__AC9AD398732FBDFE");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormResponseArchivedByUsers).HasConstraintName("FK_UserAreaFormResponse_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormResponseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormResponse_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.UserAreaFormResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormResponse_Employee");

            entity.HasOne(d => d.Location).WithMany(p => p.UserAreaFormResponses).HasConstraintName("FK_UserAreaFormResponse_Location");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormResponseModifiedByUsers).HasConstraintName("FK_UserAreaFormResponse_ModifiedBy");

            entity.HasOne(d => d.OrgGroup).WithMany(p => p.UserAreaFormResponses).HasConstraintName("FK_UserAreaFormResponse_OrgGroup");

            entity.HasOne(d => d.UserAreaForm).WithMany(p => p.UserAreaFormResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormResponse_UserAreaForm");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaFormResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormResponse_UserArea");
        });

        modelBuilder.Entity<UserAreaFormSection>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormSectionID).HasName("PK__UserArea__C02C79687233D1CB");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormSectionArchivedByUsers).HasConstraintName("FK_UserAreaFormSection_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormSectionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSection_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormSectionModifiedByUsers).HasConstraintName("FK_UserAreaFormSection_ModifiedBy");

            entity.HasOne(d => d.UserAreaForm).WithMany(p => p.UserAreaFormSections)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSection_UserAreaForm");
        });

        modelBuilder.Entity<UserAreaFormSectionQuestion>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormSectionQuestionID).HasName("PK__UserArea__3AA5B7C761B1E588");

            entity.Property(e => e.TemplateVersion).HasDefaultValue((byte)1);

            entity.HasOne(d => d.UserAreaForm).WithMany(p => p.UserAreaFormSectionQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSectionQuestion_UserAreaForm");

            entity.HasOne(d => d.UserAreaFormQuestion).WithMany(p => p.UserAreaFormSectionQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSectionQuestion_UserAreaFormQuestion");

            entity.HasOne(d => d.UserAreaFormSection).WithMany(p => p.UserAreaFormSectionQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSectionQuestion_UserAreaFormSection");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaFormSectionQuestions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormSectionQuestion_UserArea");
        });

        modelBuilder.Entity<UserAreaFormType>(entity =>
        {
            entity.HasKey(e => e.UserAreaFormTypeID).HasName("PK__UserArea__CE01FFCFBEEBA38D");

            entity.Property(e => e.UserAreaFormTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaFormTypeArchivedByUsers).HasConstraintName("FK_UserAreaFormType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaFormTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaFormType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaFormTypeModifiedByUsers).HasConstraintName("FK_UserAreaFormType_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaFormTypes).HasConstraintName("FK_UserAreaFormType_UserArea");
        });

        modelBuilder.Entity<UserAreaHRCost>(entity =>
        {
            entity.HasKey(e => e.UserAreaHRCostID).HasName("PK__UserArea__788094DC73923B84");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaHRCostCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCost_CreatedBy");

            entity.HasOne(d => d.HRCostBaseRate).WithMany(p => p.UserAreaHRCosts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCost_HRCostBaseRate");

            entity.HasOne(d => d.HRCostUserRate).WithMany(p => p.UserAreaHRCosts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCost_HRCostUserRate");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaHRCostModifiedByUsers).HasConstraintName("FK_UserAreaHRCost_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaHRCost)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCost_UserArea");
        });

        modelBuilder.Entity<UserAreaHRCostLog>(entity =>
        {
            entity.HasKey(e => e.UserAreaHRCostLogID).HasName("PK__UserArea__99F4F3966EB6D9E4");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaHRCostLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCostLog_CreatedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaHRCostLogs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCostLog_UserArea");
        });

        modelBuilder.Entity<UserAreaHRCostTransaction>(entity =>
        {
            entity.HasKey(e => e.UserAreaHRCostTransactionID).HasName("PK__UserArea__8A6502C96EC22C67");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaHRCostTransactionArchivedByUsers).HasConstraintName("FK_UserAreaHRCostTransaction_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaHRCostTransactionCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCostTransaction_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaHRCostTransactionModifiedByUsers).HasConstraintName("FK_UserAreaHRCostTransaction_ModifiedBy");

            entity.HasOne(d => d.UserAreaHRCostLog).WithMany(p => p.UserAreaHRCostTransactions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCostTransaction_UserAreaHRCostLog");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaHRCostTransactions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaHRCostTransaction_UserArea");
        });

        modelBuilder.Entity<UserAreaLanguage>(entity =>
        {
            entity.HasKey(e => e.UserAreaLanguageID).HasName("PK__UserArea__EF1B69945C32EEA4");

            entity.HasOne(d => d.LanguageType).WithMany(p => p.UserAreaLanguages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaLanguage_LanguageType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaLanguages)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaLanguage_UserArea");
        });

        modelBuilder.Entity<UserAreaMonitoringConfiguration>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringConfigurationID).HasName("PK__UserArea__6D9678E20A54CD08");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaMonitoringConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringConfiguration_UserArea");

            entity.HasOne(d => d.UserAreaMonitoringSection).WithMany(p => p.UserAreaMonitoringConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringConfiguration_UserAreaMonitoringSection");
        });

        modelBuilder.Entity<UserAreaMonitoringLevel>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringLevelID).HasName("PK__UserArea__CA3F8E20FDB6B13A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaMonitoringLevelArchivedByUsers).HasConstraintName("FK_UserAreaMonitoringLevel_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaMonitoringLevelCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringLevel_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaMonitoringLevelModifiedByUsers).HasConstraintName("FK_UserAreaMonitoringLevel_ModifiedBy");
        });

        modelBuilder.Entity<UserAreaMonitoringLevelType>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringLevelTypeID).HasName("PK__UserArea__FF816664D3D892C8");

            entity.Property(e => e.UserAreaMonitoringLevelTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<UserAreaMonitoringMailingList>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringMailingListID).HasName("PK__UserArea__4FEB641925AD8066");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaMonitoringMailingListArchivedByUsers).HasConstraintName("FK_UserAreaMonitoringMailingList_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaMonitoringMailingListCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringMailingList_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.UserAreaMonitoringMailingLists).HasConstraintName("FK_UserAreaMonitoringMailingList_Employee");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaMonitoringMailingListModifiedByUsers).HasConstraintName("FK_UserAreaMonitoringMailingList_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaMonitoringMailingLists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringMailingList_UserArea");
        });

        modelBuilder.Entity<UserAreaMonitoringReport>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringReportID).HasName("PK__UserArea__66C68879BB99C517");

            entity.Property(e => e.IsV5GeneratedReport).HasDefaultValue(false);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaMonitoringReportArchivedByUsers).HasConstraintName("FK_UserAreaMonitoringReport_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaMonitoringReportCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_CreatedBy");

            entity.HasOne(d => d.LanguageType).WithMany(p => p.UserAreaMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_LanguageType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaMonitoringReportModifiedByUsers).HasConstraintName("FK_UserAreaMonitoringReport_ModifiedBy");

            entity.HasOne(d => d.MonitoringReportXsltTransformer).WithMany(p => p.UserAreaMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_MonitoringReportXsltTransformer");

            entity.HasOne(d => d.RegionType).WithMany(p => p.UserAreaMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_RegionType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_UserArea");

            entity.HasOne(d => d.UserAreaMonitoringReportType).WithMany(p => p.UserAreaMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReport_UserAreaMonitoringReportType");
        });

        modelBuilder.Entity<UserAreaMonitoringReportComment>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringReportCommentID).HasName("PK__UserArea__E7AF48E19B4BB4DD");

            entity.HasOne(d => d.LanguageType).WithMany(p => p.UserAreaMonitoringReportComments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReportComment_LanguageType");

            entity.HasOne(d => d.RegionType).WithMany(p => p.UserAreaMonitoringReportComments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReportComment_RegionType");

            entity.HasOne(d => d.UserAreaMonitoringReportCommentsCriteria).WithMany(p => p.UserAreaMonitoringReportComments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaMonitoringReportCommentsCriteria_UserAreaMonitoringReportCommentsCriteria");

            entity.HasOne(d => d.UserAreaMonitoringSection).WithMany(p => p.UserAreaMonitoringReportComments).HasConstraintName("FK_UserAreaMonitoringReportComment_UserAreaMonitoringSection");
        });

        modelBuilder.Entity<UserAreaMonitoringReportCommentsCriterion>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringReportCommentsCriteriaID).HasName("PK__UserArea__4ADADC98AF05F513");
        });

        modelBuilder.Entity<UserAreaMonitoringReportType>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringReportTypeID).HasName("PK__UserArea__EDEB94E6A623A647");

            entity.Property(e => e.UserAreaMonitoringReportTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<UserAreaMonitoringSection>(entity =>
        {
            entity.HasKey(e => e.UserAreaMonitoringSectionID).HasName("PK__UserArea__B3A1A246D5F73A36");

            entity.Property(e => e.UserAreaMonitoringSectionID).ValueGeneratedNever();
        });

        modelBuilder.Entity<UserAreaQuestionType>(entity =>
        {
            entity.HasKey(e => e.UserAreaQuestionTypeID).HasName("PK__UserArea__7DAC05A2B0BB9E94");

            entity.Property(e => e.UserAreaQuestionTypeID).ValueGeneratedNever();
            entity.Property(e => e.AccidentFormTypeID).HasDefaultValue(6);

            entity.HasOne(d => d.AccidentFormType).WithMany(p => p.UserAreaQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaQuestionType_AccidentFormTypeID");

            entity.HasOne(d => d.AnswerType).WithMany(p => p.UserAreaQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaQuestionType_AnswerTypeID");

            entity.HasOne(d => d.OptionList).WithMany(p => p.UserAreaQuestionTypes).HasConstraintName("FK_UserAreaQuestionType_OptionListID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaQuestionTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaQuestionType_UserAreaID");
        });

        modelBuilder.Entity<UserAreaRegion>(entity =>
        {
            entity.HasKey(e => e.UserAreaRegionID).HasName("PK__UserArea__0881880ED6C8D2B4");

            entity.HasOne(d => d.RegionType).WithMany(p => p.UserAreaRegions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRegion_RegionType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaRegions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRegion_UserArea");
        });

        modelBuilder.Entity<UserAreaRiskAssessmentSetting>(entity =>
        {
            entity.HasKey(e => e.UserAreaRiskAssessmentSettingsID).HasName("PK__UserArea__785A011F995A734A");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaRiskAssessmentSettingArchivedByUsers).HasConstraintName("FK_UserAreaRiskAssessmentSettings_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaRiskAssessmentSettingCreatedByUsers).HasConstraintName("FK_UserAreaRiskAssessmentSettings_CreatedBy");

            entity.HasOne(d => d.DefaultComplianceScoreType).WithMany(p => p.UserAreaRiskAssessmentSettings).HasConstraintName("FK_UserAreaRiskAssessmentSettings_ComplianceScoreType");

            entity.HasOne(d => d.DefaultRiskMatrixType).WithMany(p => p.UserAreaRiskAssessmentSettings).HasConstraintName("FK_UserAreaRiskAssessmentSettings_RiskMatrixType");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaRiskAssessmentSettingModifiedByUsers).HasConstraintName("FK_UserAreaRiskAssessmentSettings_ModifiedBy");

            entity.HasOne(d => d.MonitorDefaultFrequencyType).WithMany(p => p.UserAreaRiskAssessmentSettingMonitorDefaultFrequencyTypes).HasConstraintName("FK_UserAreaRiskAssessmentSettings_MonitorDefaultFrequencyType");

            entity.HasOne(d => d.ReviewDefaultFrequencyType).WithMany(p => p.UserAreaRiskAssessmentSettingReviewDefaultFrequencyTypes).HasConstraintName("FK_UserAreaRiskAssessmentSettings_ReviewDefaultFrequencyType");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaRiskAssessmentSetting)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRiskAssessmentSettings_UserArea");
        });

        modelBuilder.Entity<UserAreaRiskAssessmentType>(entity =>
        {
            entity.HasKey(e => e.UserAreaRiskAssessmentTypeID).HasName("PK__UserArea__BB0B1F8294A57AF7");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaRiskAssessmentTypeArchivedByUsers).HasConstraintName("FK_UserAreaRiskAssessmentType_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaRiskAssessmentTypeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRiskAssessmentType_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaRiskAssessmentTypeModifiedByUsers).HasConstraintName("FK_UserAreaRiskAssessmentType_ModifiedBy");

            entity.HasOne(d => d.RiskAssessmentType).WithMany(p => p.UserAreaRiskAssessmentTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRiskAssessmentType_RiskAssessmentType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaRiskAssessmentTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaRiskAssessmentType_UserArea");
        });

        modelBuilder.Entity<UserAreaSector>(entity =>
        {
            entity.HasKey(e => e.UserAreaSectorID).HasName("PK__UserArea__C5A2467C846C6B96");

            entity.HasOne(d => d.SectorType).WithMany(p => p.UserAreaSectors)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSector_SectorType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaSectors)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSector_UserArea");
        });

        modelBuilder.Entity<UserAreaSetting>(entity =>
        {
            entity.HasKey(e => e.UserAreaSettingID).HasName("PK__UserArea__856B09BB613D5ADB");

            entity.Property(e => e.IncidentInvestigationDueInDays).HasDefaultValue(7);

            entity.HasOne(d => d.DefaultManagerEmployee).WithMany(p => p.UserAreaSettingDefaultManagerEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSetting_DefaultManagerEmployee");

            entity.HasOne(d => d.DefaultSignOffEmployee).WithMany(p => p.UserAreaSettingDefaultSignOffEmployees).HasConstraintName("FK_UserAreaSetting_DefaultSignOffEmployee");

            entity.HasOne(d => d.IncidentFormAlternativeSourceUserArea).WithMany(p => p.UserAreaSettingIncidentFormAlternativeSourceUserAreas).HasConstraintName("FK_UserAreaSetting_IncidentFormAlternativeSourceUserArea");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaSettingUserArea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSetting_UserArea");
        });

        modelBuilder.Entity<UserAreaSystemProductType>(entity =>
        {
            entity.HasKey(e => e.UserAreaSystemProductTypeID).HasName("PK__UserArea__F7F5836BA48A10BB");

            entity.HasOne(d => d.SystemProductType).WithMany(p => p.UserAreaSystemProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSystemProductType_SystemProductType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaSystemProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaSystemProductType_UserArea");
        });

        modelBuilder.Entity<UserAreaTag>(entity =>
        {
            entity.HasKey(e => e.UserAreaTagID).HasName("PK__UserArea__05CDF05629411C02");

            entity.HasOne(d => d.TagType).WithMany(p => p.UserAreaTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTag_TagType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaTags)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTag_UserArea");
        });

        modelBuilder.Entity<UserAreaTaskSetting>(entity =>
        {
            entity.HasKey(e => e.TaskSettingsID).HasName("PK__UserArea__568F8554EC4FFAC9");

            entity.Property(e => e.AssignerOverDueFrequencyID).HasDefaultValue(1);
            entity.Property(e => e.TaskDueAlertFrequencyID).HasDefaultValue(1);
            entity.Property(e => e.TaskDueAlertPeriod).HasDefaultValue(0);

            entity.HasOne(d => d.AssignerOverDueFrequency).WithMany(p => p.UserAreaTaskSettingAssignerOverDueFrequencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTaskSettings_AssignerOverDueFrequencyID");

            entity.HasOne(d => d.DefaultManagerEmployee).WithMany(p => p.UserAreaTaskSettings).HasConstraintName("FK_UserAreaTaskSettings_ManagerEmployee");

            entity.HasOne(d => d.FurtherActionsDueWithinFrequencyType).WithMany(p => p.UserAreaTaskSettings).HasConstraintName("FK_UserAreaTaskSettings_FrequencyType");

            entity.HasOne(d => d.TaskDueAlertFrequency).WithMany(p => p.UserAreaTaskSettingTaskDueAlertFrequencies)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTaskSettings_TaskDueAlertFrequencyID");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaTaskSetting)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTaskSettings_UserAreaID");
        });

        modelBuilder.Entity<UserAreaTaskType>(entity =>
        {
            entity.HasKey(e => e.UserAreaTaskTypeID).HasName("PK__UserArea__9D83927D942E07E0");

            entity.HasOne(d => d.TaskType).WithMany(p => p.UserAreaTaskTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTaskType_TaskType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaTaskTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTaskType_UserArea");
        });

        modelBuilder.Entity<UserAreaTextBlock>(entity =>
        {
            entity.HasKey(e => e.UserAreaTextBlockID).HasName("PK__UserArea__63D1475624DF4B74");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserAreaTextBlockArchivedByUsers).HasConstraintName("FK_UserAreaTextBlock_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserAreaTextBlockCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextBlock_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserAreaTextBlockModifiedByUsers).HasConstraintName("FK_UserAreaTextBlock_ModifiedBy");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.UserAreaTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextBlock_TextBlock");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextBlock_UserArea");
        });

        modelBuilder.Entity<UserAreaTextBlockSectionOrder>(entity =>
        {
            entity.HasKey(e => e.UserAreaTextBlockSectionOrderID).HasName("PK__UserArea__49F2FA18F7724DEF");

            entity.HasOne(d => d.TextBlockSection).WithMany(p => p.UserAreaTextBlockSectionOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextBlockSectionOrder_TextBlockSection");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaTextBlockSectionOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextBlockSectionOrder_UserArea");
        });

        modelBuilder.Entity<UserAreaTextSetting>(entity =>
        {
            entity.HasKey(e => e.UserAreaTextSettingsID).HasName("PK__UserArea__18D2CFF31619E8C5");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaTextSetting)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTextSettings_UserArea");
        });

        modelBuilder.Entity<UserAreaTrainingSetting>(entity =>
        {
            entity.HasKey(e => e.UserAreaTrainingSettingsID).HasName("PK__UserArea__737DA3B2E3E6DC8B");

            entity.Property(e => e.AssessmentTaskDueDateLookAhead).HasDefaultValue(7);

            entity.HasOne(d => d.TrainingManagerEmployee).WithMany(p => p.UserAreaTrainingSettings).HasConstraintName("FK_UserAreaTrainingSettings_Employee");

            entity.HasOne(d => d.UserArea).WithOne(p => p.UserAreaTrainingSetting)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaTrainingSettings_UserArea");
        });

        modelBuilder.Entity<UserAreaUpdate>(entity =>
        {
            entity.HasKey(e => e.UserAreaUpdateID).HasName("PK__UserArea__2644914D333EC914");

            entity.HasOne(d => d.Update).WithMany(p => p.UserAreaUpdates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaUpdate_Update");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserAreaUpdates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAreaUpdate_UserArea");
        });

        modelBuilder.Entity<UserCaseManagementSetting>(entity =>
        {
            entity.HasKey(e => e.UserCaseManagementSettingID).HasName("PK__UserCase__BCA826FC26405E1D");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserCaseManagementSettingCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCaseManagementSetting_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserCaseManagementSettingModifiedByUsers).HasConstraintName("FK_UserCaseManagementSetting_ModifiedBy");

            entity.HasOne(d => d.User).WithMany(p => p.UserCaseManagementSettingUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCaseManagementSetting_User");
        });

        modelBuilder.Entity<UserConfiguration>(entity =>
        {
            entity.HasKey(e => e.UserConfigurationID).HasName("PK__UserConf__232B488CB1A6DA3C");

            entity.HasOne(d => d.ConfigurationType).WithMany(p => p.UserConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserConfiguration_ConfigurationType");

            entity.HasOne(d => d.User).WithMany(p => p.UserConfigurations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserConfiguration_User");
        });

        modelBuilder.Entity<UserContact>(entity =>
        {
            entity.HasKey(e => e.UserContactID).HasName("PK__UserCont__3911BA45E76F8338");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserContactArchivedByUsers).HasConstraintName("FK_UserContact_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserContactCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserContact_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserContactModifiedByUsers).HasConstraintName("FK_UserContact_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserContacts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserContact_UserAreaID");

            entity.HasOne(d => d.User).WithMany(p => p.UserContactUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserContact_User");
        });

        modelBuilder.Entity<UserDomain>(entity =>
        {
            entity.HasKey(e => e.UserDomainID).HasName("PK__UserDoma__B426F72118D7B82B");

            entity.HasOne(d => d.Domain).WithMany(p => p.UserDomains)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserDomain_AllowedDomain");
        });

        modelBuilder.Entity<UserEmulator>(entity =>
        {
            entity.HasKey(e => e.UserEmulatorID).HasName("PK__UserEmul__A5A73B0D33FA3BA9");

            entity.HasOne(d => d.PermittedUserArea).WithMany(p => p.UserEmulators).HasConstraintName("FK_UserEmulator_UserAreaID");

            entity.HasOne(d => d.User).WithMany(p => p.UserEmulators)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserEmulator_UserID");
        });

        modelBuilder.Entity<UserFavouriteChecklist>(entity =>
        {
            entity.HasKey(e => e.UserFavouriteChecklistID).HasName("PK__UserFavo__7E2387E07289E85D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserFavouriteChecklistArchivedByUsers).HasConstraintName("FK_UserFavouriteChecklist_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserFavouriteChecklistCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteChecklist_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.UserFavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteChecklist_Employee");

            entity.HasOne(d => d.FavouriteChecklist).WithMany(p => p.UserFavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteChecklist_FavouriteChecklist");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserFavouriteChecklistModifiedByUsers).HasConstraintName("FK_UserFavouriteChecklist_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserFavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteChecklist_UserArea");
        });

        modelBuilder.Entity<UserFavouriteRiskAssessment>(entity =>
        {
            entity.HasKey(e => e.UserFavouriteRiskAssessmentID).HasName("PK__UserFavo__32930ACDF5322E2D");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserFavouriteRiskAssessmentArchivedByUsers).HasConstraintName("FK_UserFavouriteRiskAssessment_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserFavouriteRiskAssessmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteRiskAssessment_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.UserFavouriteRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteRiskAssessment_Employee");

            entity.HasOne(d => d.FavouriteRiskAssessment).WithMany(p => p.UserFavouriteRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteRiskAssessment_FavouriteRiskAssessment");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserFavouriteRiskAssessmentModifiedByUsers).HasConstraintName("FK_UserFavouriteRiskAssessment_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserFavouriteRiskAssessments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFavouriteRiskAssessment_UserArea");
        });

        modelBuilder.Entity<UserFilterSetting>(entity =>
        {
            entity.HasKey(e => e.UserFilterSettingID).HasName("PK__UserFilt__0B40610D276130FD");

            entity.Property(e => e.IsDefaultExpanded).HasDefaultValue(false);

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserFilterSettings)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFilterSetting_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserFilterSettings).HasConstraintName("FK_UserFilterSetting_User");
        });

        modelBuilder.Entity<UserPasswordHistory>(entity =>
        {
            entity.HasKey(e => e.UserPasswordHistoryID).HasName("PK__UserPass__73AE3F2558CFE292");

            entity.HasOne(d => d.User).WithMany(p => p.UserPasswordHistories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserPasswordHistory_User");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.UserRoleID).HasName("PK__UserRole__3D978A5501323C3E");

            entity.HasOne(d => d.Role).WithMany(p => p.UserRoles).HasConstraintName("FK_UserRole_RoleID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserRoles).HasConstraintName("FK_UserRole_UserAreaID");

            entity.HasOne(d => d.User).WithMany(p => p.UserRoles).HasConstraintName("FK_UserRole_UserID");
        });

        modelBuilder.Entity<UserSystemProductType>(entity =>
        {
            entity.HasKey(e => e.UserSystemProductTypeID).HasName("PK__UserSyst__6CA9EA4E4FE2C0EF");

            entity.HasOne(d => d.SystemProductType).WithMany(p => p.UserSystemProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSystemProductType_SystemProductType");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserSystemProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSystemProductType_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserSystemProductTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSystemProductType_User");
        });

        modelBuilder.Entity<UserTenant>(entity =>
        {
            entity.HasKey(e => e.UserTenantID).HasName("PK__UserTena__C1A59FF78C4485A9");

            entity.Property(e => e.Status).HasDefaultValue("Active");

            entity.HasOne(d => d.Tenant).WithMany(p => p.UserTenants)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTenant_Tenant");

            entity.HasOne(d => d.User).WithMany(p => p.UserTenants)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTenant_User");
        });

        modelBuilder.Entity<UserTenantRole>(entity =>
        {
            entity.HasKey(e => e.UserTenantRoleID).HasName("PK__UserTena__CF71745DE274354C");

            entity.HasOne(d => d.TenantRole).WithMany(p => p.UserTenantRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTenantRole_TenantRole");

            entity.HasOne(d => d.UserTenant).WithMany(p => p.UserTenantRoles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTenantRole_UserTenant");
        });

        modelBuilder.Entity<UserTextBlock>(entity =>
        {
            entity.HasKey(e => e.UserTextBlockID).HasName("PK__UserText__F4CA95C93078882C");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserTextBlockArchivedByUsers).HasConstraintName("FK_UserTextBlock_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserTextBlockCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTextBlock_CreatedBy");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserTextBlockModifiedByUsers).HasConstraintName("FK_UserTextBlock_ModifiedBy");

            entity.HasOne(d => d.Task).WithMany(p => p.UserTextBlocks).HasConstraintName("FK_UserTextBlock_Task");

            entity.HasOne(d => d.TextBlock).WithMany(p => p.UserTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTextBlock_TextBlock");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserTextBlocks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTextBlock_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserTextBlockUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTextBlock_User");
        });

        modelBuilder.Entity<UserTwoStepAuthToken>(entity =>
        {
            entity.HasKey(e => e.UserTwoStepAuthTokenID).HasName("PK__UserTwoS__FA08C80240E95D88");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserTwoStepAuthTokens)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTwoStepAuthToken_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserTwoStepAuthTokens)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserTwoStepAuthToken_User");
        });

        modelBuilder.Entity<UserUserArea>(entity =>
        {
            entity.HasKey(e => e.UserUserAreaID).HasName("PK__UserUser__2B5A844FD1BBDE43");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserUserArea_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserUserAreas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserUserArea_User");
        });

        modelBuilder.Entity<UserUserAreaDivision>(entity =>
        {
            entity.HasKey(e => e.UserUserAreaDivisionID).HasName("PK__UserUser__A7F32FDA00D7E77E");

            entity.HasOne(d => d.UserAreaDivision).WithMany(p => p.UserUserAreaDivisions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserUserAreaDivision_UserAreaDivision");

            entity.HasOne(d => d.User).WithMany(p => p.UserUserAreaDivisions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserUserAreaDivision_User");
        });

        modelBuilder.Entity<UserWebFavouriteChecklist>(entity =>
        {
            entity.HasKey(e => e.UserWebFavouriteChecklistID).HasName("PK__UserWebF__9601DF0552EFAEEF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.UserWebFavouriteChecklistArchivedByUsers).HasConstraintName("FK_UserWebFavouriteChecklist_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserWebFavouriteChecklistCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserWebFavouriteChecklist_CreatedBy");

            entity.HasOne(d => d.FavouriteChecklist).WithMany(p => p.UserWebFavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserWebFavouriteChecklist_FavouriteChecklist");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.UserWebFavouriteChecklistModifiedByUsers).HasConstraintName("FK_UserWebFavouriteChecklist_ModifiedBy");

            entity.HasOne(d => d.UserArea).WithMany(p => p.UserWebFavouriteChecklists)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserWebFavouriteChecklist_UserArea");

            entity.HasOne(d => d.User).WithMany(p => p.UserWebFavouriteChecklistUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserWebFavouriteChecklist_User");
        });

        modelBuilder.Entity<ValidationType>(entity =>
        {
            entity.HasKey(e => e.ValidationTypeID).HasName("PK__Validati__7313FFDCE727E2EE");

            entity.Property(e => e.ValidationTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<VideoCaption>(entity =>
        {
            entity.HasKey(e => e.VideoCaptionID).HasName("PK__VideoCap__9EAA67DCAAF69ED2");

            entity.HasOne(d => d.Attachment).WithMany(p => p.VideoCaptionAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VideoCaption_AttachmentID");

            entity.HasOne(d => d.CaptionAttachment).WithMany(p => p.VideoCaptionCaptionAttachments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VideoCaption_CaptionAttachmentID");
        });

        modelBuilder.Entity<Walk>(entity =>
        {
            entity.HasKey(e => e.WalkID).HasName("PK__Walk__BD3ECEC3D036A7EC");

            entity.Property(e => e.IsOrdered).HasDefaultValue(true);
            entity.Property(e => e.Version).HasDefaultValue(1);

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkArchivedByUsers).HasConstraintName("FK_Walk_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Walk_CreatedBy");

            entity.HasOne(d => d.DefaultHazardEmployee).WithMany(p => p.Walks).HasConstraintName("FK_Walk_DefaultHazardEmployeeID");

            entity.HasOne(d => d.Location).WithMany(p => p.Walks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Walk_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.WalkModifiedByUsers).HasConstraintName("FK_Walk_ModifiedBy");

            entity.HasOne(d => d.OriginalWalk).WithMany(p => p.InverseOriginalWalk).HasConstraintName("FK_Walk_OriginalWalkID");

            entity.HasOne(d => d.TagType).WithMany(p => p.Walks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Walk_TagTypeID");

            entity.HasOne(d => d.UserArea).WithMany(p => p.Walks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Walk_UserAreaID");

            entity.HasOne(d => d.WalkTemplate).WithMany(p => p.Walks).HasConstraintName("FK_Walk_WalkTemplateID");
        });

        modelBuilder.Entity<WalkAdhocEmployee>(entity =>
        {
            entity.HasKey(e => e.WalkAdhocEmployeeID).HasName("PK__WalkAdho__C2CC5519A9FAB2DF");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkAdhocEmployeeArchivedByUsers).HasConstraintName("FK_WalkAdhocEmployee_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkAdhocEmployeeCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAdhocEmployee_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.WalkAdhocEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAdhocEmployee_EmployeeID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.WalkAdhocEmployeeModifiedByUsers).HasConstraintName("FK_WalkAdhocEmployee_ModifiedBy");

            entity.HasOne(d => d.Walk).WithMany(p => p.WalkAdhocEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAdhocEmployee_WalkID");
        });

        modelBuilder.Entity<WalkAssignment>(entity =>
        {
            entity.HasKey(e => e.WalkAssignmentID).HasName("PK__WalkAssi__A5DB94181F66A607");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkAssignmentArchivedByUsers).HasConstraintName("FK_WalkAssignment_ArchivedBy");

            entity.HasOne(d => d.CheckpointBreachAlertUser).WithMany(p => p.WalkAssignmentCheckpointBreachAlertUsers).HasConstraintName("FK_WalkAssignment_CheckpointBreachAlertUserID");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkAssignmentCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAssignment_CreatedBy");

            entity.HasOne(d => d.DefaultHazardEmployee).WithMany(p => p.WalkAssignmentDefaultHazardEmployees).HasConstraintName("FK_WalkAssignment_DefaultHazardEmployeeID");

            entity.HasOne(d => d.Employee).WithMany(p => p.WalkAssignmentEmployees)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAssignment_EmployeeID");

            entity.HasOne(d => d.LateWalkBreachAlertEmployee).WithMany(p => p.WalkAssignmentLateWalkBreachAlertEmployees).HasConstraintName("FK_WalkAssignment_LateWalkBreachAlertEmployeeID");

            entity.HasOne(d => d.ManagerSignature).WithMany(p => p.WalkAssignmentManagerSignatures).HasConstraintName("FK_WalkAssignment_ManagerSignatureID");

            entity.HasOne(d => d.MissedWalkBreachAlertUser).WithMany(p => p.WalkAssignmentMissedWalkBreachAlertUsers).HasConstraintName("FK_WalkAssignment_MissedWalkBreachAlertUserID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.WalkAssignmentModifiedByUsers).HasConstraintName("FK_WalkAssignment_ModifiedBy");

            entity.HasOne(d => d.SkipCheckpointBreachAlertUser).WithMany(p => p.WalkAssignmentSkipCheckpointBreachAlertUsers).HasConstraintName("FK_WalkAssignment_SkipCheckpointBreachAlertUserID");

            entity.HasOne(d => d.Task).WithMany(p => p.WalkAssignments).HasConstraintName("FK_WalkAssignment_TaskID");

            entity.HasOne(d => d.TaskSchedule).WithMany(p => p.WalkAssignments).HasConstraintName("FK_WalkAssignment_TaskScheduleID");

            entity.HasOne(d => d.Walk).WithMany(p => p.WalkAssignments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkAssignment_WalkID");
        });

        modelBuilder.Entity<WalkCheckpoint>(entity =>
        {
            entity.HasKey(e => e.WalkCheckpointID).HasName("PK__WalkChec__4EEC429E48C1E97C");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkCheckpointArchivedByUsers).HasConstraintName("FK_WalkCheckpoint_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkCheckpointCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkCheckpoint_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.WalkCheckpoints).HasConstraintName("FK_WalkCheckpoint_LocationID");

            entity.HasOne(d => d.ModifiedByUser).WithMany(p => p.WalkCheckpointModifiedByUsers).HasConstraintName("FK_WalkCheckpoint_ModifiedBy");

            entity.HasOne(d => d.Walk).WithMany(p => p.WalkCheckpoints)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkCheckpoint_WalkID");
        });

        modelBuilder.Entity<WalkCheckpointResponse>(entity =>
        {
            entity.HasKey(e => e.WalkCheckpointResponseID).HasName("PK__WalkChec__33E29F561D6A80F0");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkCheckpointResponseArchivedByUsers).HasConstraintName("FK_WalkCheckpointResponse_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkCheckpointResponseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkCheckpointResponse_CreatedBy");

            entity.HasOne(d => d.WalkCheckpoint).WithMany(p => p.WalkCheckpointResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkCheckpointResponse_WalkCheckpointID");

            entity.HasOne(d => d.WalkResponse).WithMany(p => p.WalkCheckpointResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkCheckpointResponse_WalkResponseID");
        });

        modelBuilder.Entity<WalkHazardReport>(entity =>
        {
            entity.HasKey(e => e.WalkHazardReportID).HasName("PK__WalkHaza__0AFEE880EA5FC4FC");

            entity.HasOne(d => d.HazardReport).WithMany(p => p.WalkHazardReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkHazardReport_HazardReportID");

            entity.HasOne(d => d.WalkCheckpoint).WithMany(p => p.WalkHazardReports).HasConstraintName("FK_WalkHazardReport_WalkCheckpointID");

            entity.HasOne(d => d.WalkResponse).WithMany(p => p.WalkHazardReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkHazardReport_WalkResponseID");
        });

        modelBuilder.Entity<WalkHazardReportType>(entity =>
        {
            entity.HasKey(e => e.WalkHazardReportTypeID).HasName("PK__WalkHaza__F112CFCEAC10D78E");

            entity.HasOne(d => d.HazardReportType).WithMany(p => p.WalkHazardReportTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkHazardReportType_HazardReportTypeID");

            entity.HasOne(d => d.Walk).WithMany(p => p.WalkHazardReportTypes).HasConstraintName("FK_WalkHazardReportType_WalkID");

            entity.HasOne(d => d.WalkTemplate).WithMany(p => p.WalkHazardReportTypes).HasConstraintName("FK_WalkHazardReportType_WalkTemplateID");
        });

        modelBuilder.Entity<WalkResponse>(entity =>
        {
            entity.HasKey(e => e.WalkResponseID).HasName("PK__WalkResp__07A723D48AB22434");

            entity.HasOne(d => d.ArchivedByUser).WithMany(p => p.WalkResponseArchivedByUsers).HasConstraintName("FK_WalkResponse_ArchivedBy");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.WalkResponseCreatedByUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkResponse_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.WalkResponses).HasConstraintName("FK_WalkResponse_EmployeeID");

            entity.HasOne(d => d.WalkAssignment).WithMany(p => p.WalkResponses).HasConstraintName("FK_WalkResponse_WalkAssignmentID");

            entity.HasOne(d => d.Walk).WithMany(p => p.WalkResponses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkResponse_WalkID");
        });

        modelBuilder.Entity<WalkTemplate>(entity =>
        {
            entity.HasKey(e => e.WalkTemplateID).HasName("PK__WalkTemp__93477C76D3954CA3");

            entity.HasOne(d => d.TagType).WithMany(p => p.WalkTemplates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WalkTemplate_TagTypeID");
        });

        modelBuilder.Entity<WeekendType>(entity =>
        {
            entity.HasKey(e => e.WeekendTypeID).HasName("PK__WeekendT__3DC3553B9F2842D3");

            entity.Property(e => e.WeekendTypeID).ValueGeneratedNever();

            entity.HasOne(d => d.RegionType).WithMany(p => p.WeekendTypes).HasConstraintName("FK_WeekendType_Region");
        });

        modelBuilder.Entity<WorkInstruction>(entity =>
        {
            entity.HasKey(e => e.WorkInstructionID).HasName("PK__WorkInst__3E466AB6221DAA47");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.InstructionVersion).HasDefaultValue("1.0");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCurrentVersion).HasDefaultValue(true);
            entity.Property(e => e.PersonnelRequired).HasDefaultValue(1);

            entity.HasOne(d => d.ApproverUser).WithMany(p => p.WorkInstructionApproverUsers).HasConstraintName("FK_WorkInstruction_Approver");

            entity.HasOne(d => d.AuthorUser).WithMany(p => p.WorkInstructionAuthorUsers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkInstruction_Author");

            entity.HasOne(d => d.PreviousVersion).WithMany(p => p.InversePreviousVersion).HasConstraintName("FK_WorkInstruction_PreviousVersion");

            entity.HasOne(d => d.PublishedByUser).WithMany(p => p.WorkInstructionPublishedByUsers).HasConstraintName("FK_WorkInstruction_Publisher");

            entity.HasOne(d => d.ReviewerUser).WithMany(p => p.WorkInstructionReviewerUsers).HasConstraintName("FK_WorkInstruction_Reviewer");

            entity.HasOne(d => d.SSOWDocumentType).WithMany(p => p.WorkInstructions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkInstruction_DocumentType");

            entity.HasOne(d => d.SSOWStatusType).WithMany(p => p.WorkInstructions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkInstruction_Status");

            entity.HasOne(d => d.UserArea).WithMany(p => p.WorkInstructions)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkInstruction_UserArea");
        });

        modelBuilder.Entity<WorkProcessType>(entity =>
        {
            entity.HasKey(e => e.WorkProcessTypeID).HasName("PK__WorkProc__BAF55C120BBF80B6");

            entity.Property(e => e.WorkProcessTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<XsltTransformerType>(entity =>
        {
            entity.HasKey(e => e.XsltTransformerTypeID).HasName("PK__XsltTran__E039F6E91490A68B");

            entity.Property(e => e.XsltTransformerTypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<YesNoNAType>(entity =>
        {
            entity.HasKey(e => e.YesNoNATypeID).HasName("PK__YesNoNAT__3378EF9440E2818A");

            entity.Property(e => e.YesNoNATypeID).ValueGeneratedNever();
        });

        modelBuilder.Entity<tblAssessmentDiary>(entity =>
        {
            entity.HasKey(e => e.DiaryId).HasName("PK__tblAsses__267B56F4A4A64905");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.LogType).WithMany(p => p.tblAssessmentDiaries).HasConstraintName("FK__tblAssess__LogTy__3019FEA4");

            entity.HasOne(d => d.Portfolio).WithMany(p => p.tblAssessmentDiaries)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblAssess__Portf__310E22DD");
        });

        modelBuilder.Entity<tblAssessmentDiaryLogType>(entity =>
        {
            entity.HasKey(e => e.LogTypeId).HasName("PK__tblAsses__AE9574945D83C7EF");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<tblElement>(entity =>
        {
            entity.HasKey(e => e.ElementId).HasName("PK__tblEleme__A429721ABBD5EBED");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Unit).WithMany(p => p.tblElements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblElemen__UnitI__35D2D7FA");
        });

        modelBuilder.Entity<tblEvidence>(entity =>
        {
            entity.HasKey(e => e.EvidenceId).HasName("PK__tblEvide__FA39D7AD5E451571");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsDirectObservation).HasDefaultValue(false);
            entity.Property(e => e.IsProductEvidence).HasDefaultValue(false);
            entity.Property(e => e.IsProfessionalDiscussion).HasDefaultValue(false);
            entity.Property(e => e.IsQuestioning).HasDefaultValue(false);
            entity.Property(e => e.IsSimulation).HasDefaultValue(false);
            entity.Property(e => e.IsWitnessTestimony).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.EvidenceType).WithMany(p => p.tblEvidences).HasConstraintName("FK__tblEviden__Evide__32024716");

            entity.HasOne(d => d.Portfolio).WithMany(p => p.tblEvidences)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Portf__32F66B4F");
        });

        modelBuilder.Entity<tblEvidenceKnowledgeRequirement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblEvide__3214EC0746737D3C");

            entity.Property(e => e.IsMet).HasDefaultValue(false);

            entity.HasOne(d => d.Evidence).WithMany(p => p.tblEvidenceKnowledgeRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Evide__2E31B632");

            entity.HasOne(d => d.Knowledge).WithMany(p => p.tblEvidenceKnowledgeRequirements)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Knowl__2F25DA6B");
        });

        modelBuilder.Entity<tblEvidencePerformanceCriterion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblEvide__3214EC07520C7D3E");

            entity.Property(e => e.IsMet).HasDefaultValue(false);

            entity.HasOne(d => d.Criteria).WithMany(p => p.tblEvidencePerformanceCriteria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Crite__2C496DC0");

            entity.HasOne(d => d.Evidence).WithMany(p => p.tblEvidencePerformanceCriteria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Evide__2D3D91F9");
        });

        modelBuilder.Entity<tblEvidenceRange>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblEvide__3214EC072DBC3EC2");

            entity.Property(e => e.IsCovered).HasDefaultValue(false);

            entity.HasOne(d => d.Evidence).WithMany(p => p.tblEvidenceRanges)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Evide__2A61254E");

            entity.HasOne(d => d.Range).WithMany(p => p.tblEvidenceRanges)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblEviden__Range__2B554987");
        });

        modelBuilder.Entity<tblEvidenceType>(entity =>
        {
            entity.HasKey(e => e.EvidenceTypeId).HasName("PK__tblEvide__23E94FDE3947B92D");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<tblKnowledgeRequirement>(entity =>
        {
            entity.HasKey(e => e.KnowledgeId).HasName("PK__tblKnowl__FF28F8496345B77D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Element).WithMany(p => p.tblKnowledgeRequirements).HasConstraintName("FK__tblKnowle__Eleme__33EA8F88");

            entity.HasOne(d => d.Unit).WithMany(p => p.tblKnowledgeRequirements).HasConstraintName("FK__tblKnowle__UnitI__34DEB3C1");
        });

        modelBuilder.Entity<tblMonitoringReport>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PK__tblMonit__D5BD48052711807D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActionPlanComplete).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Portfolio).WithMany(p => p.tblMonitoringReports)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblMonito__Portf__39A368DE");
        });

        modelBuilder.Entity<tblPerformanceCriterion>(entity =>
        {
            entity.HasKey(e => e.CriteriaId).HasName("PK__tblPerfo__FE6ADBCDCB5208F3");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Element).WithMany(p => p.tblPerformanceCriteria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblPerfor__Eleme__36C6FC33");
        });

        modelBuilder.Entity<tblPortfolio>(entity =>
        {
            entity.HasKey(e => e.PortfolioId).HasName("PK__tblPortf__6D3A137D6137F79D");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.ProgressPercentage).HasDefaultValue(0m);
            entity.Property(e => e.UserAreaID).HasDefaultValue(1);

            entity.HasOne(d => d.PortfolioStatus).WithMany(p => p.tblPortfolios).HasConstraintName("FK__tblPortfo__Portf__3A978D17");
        });

        modelBuilder.Entity<tblPortfolioStatus>(entity =>
        {
            entity.HasKey(e => e.PortfolioStatusId).HasName("PK__tblPortf__E4ADE584A84650AE");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
        });

        modelBuilder.Entity<tblQualification>(entity =>
        {
            entity.HasKey(e => e.QualificationId).HasName("PK__tblQuali__C95C12AA2AB32541");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
        });

        modelBuilder.Entity<tblQualificationUnit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblQuali__3214EC073E6FC4A6");

            entity.Property(e => e.IsMandatory).HasDefaultValue(false);

            entity.HasOne(d => d.Qualification).WithMany(p => p.tblQualificationUnits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblQualif__Quali__2878DCDC");

            entity.HasOne(d => d.Unit).WithMany(p => p.tblQualificationUnits)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblQualif__UnitI__296D0115");
        });

        modelBuilder.Entity<tblRange>(entity =>
        {
            entity.HasKey(e => e.RangeId).HasName("PK__tblRange__6899CA14F198BFB8");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");

            entity.HasOne(d => d.Element).WithMany(p => p.tblRanges)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tblRange__Elemen__37BB206C");

            entity.HasOne(d => d.RangeGroup).WithMany(p => p.tblRanges).HasConstraintName("FK__tblRange__RangeG__38AF44A5");
        });

        modelBuilder.Entity<tblRangeGroup>(entity =>
        {
            entity.HasKey(e => e.RangeGroupId).HasName("PK__tblRange__55126F985AFF04F8");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<tblUnit>(entity =>
        {
            entity.HasKey(e => e.UnitId).HasName("PK__tblUnit__44F5ECB54D99BE57");

            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(sysdatetimeoffset())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsCore).HasDefaultValue(false);
            entity.Property(e => e.ModifiedDate).HasDefaultValueSql("(sysdatetimeoffset())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    // IDbContext implementation
    object IDbContext.Set(Type entityType)
    {
        var method = typeof(DbContext).GetMethod(nameof(Set), new Type[0])?.MakeGenericMethod(entityType);
        return method?.Invoke(this, null) ?? throw new InvalidOperationException($"Set method returned null for type {entityType.Name}");
    }

    // Partial method for validation - implemented in ContextExtension.cs
    public partial void ValidateEntitiesBeforeSave();

    // Override SaveChanges to include validation
    public override int SaveChanges()
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChangesAsync(cancellationToken);
    }
}