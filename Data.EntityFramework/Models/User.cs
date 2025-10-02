using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("User", Schema = "V7")]
[Index("Email", Name = "IX_User_Email")]
[Index("GUID", Name = "IX_V7User_Guid")]
public partial class User
{
    [Key]
    public int UserID { get; set; }

    public Guid GUID { get; set; }

    public int? MasterUserAreaID { get; set; }

    [StringLength(255)]
    public string FullName { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    public bool IsMobileAppUser { get; set; }

    public bool HasReadDisclaimer { get; set; }

    public bool IsLocked { get; set; }

    [StringLength(255)]
    public string? LockedMessage { get; set; }

    public DateTimeOffset? LastLoginDate { get; set; }

    [StringLength(255)]
    public string? AzureADObjectId { get; set; }

    [StringLength(100)]
    public string? Username { get; set; }

    [StringLength(512)]
    public string? PasswordHash { get; set; }

    [StringLength(256)]
    public string? PasswordSalt { get; set; }

    public int FailedLoginAttempts { get; set; }

    public DateTimeOffset? LastPasswordChange { get; set; }

    public bool EmailVerified { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public DateTimeOffset? LastLoginAt { get; set; }

    [StringLength(45)]
    public string? IPAddress { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceApprovalType> AbsenceApprovalTypeArchivedByUsers { get; set; } = new List<AbsenceApprovalType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceApprovalType> AbsenceApprovalTypeCreatedByUsers { get; set; } = new List<AbsenceApprovalType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceApprovalType> AbsenceApprovalTypeModifiedByUsers { get; set; } = new List<AbsenceApprovalType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Absence> AbsenceArchivedByUsers { get; set; } = new List<Absence>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceAttachment> AbsenceAttachmentArchivedByUsers { get; set; } = new List<AbsenceAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceAttachment> AbsenceAttachmentCreatedByUsers { get; set; } = new List<AbsenceAttachment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceAttachment> AbsenceAttachmentModifiedByUsers { get; set; } = new List<AbsenceAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Absence> AbsenceCreatedByUsers { get; set; } = new List<Absence>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceDurationType> AbsenceDurationTypeArchivedByUsers { get; set; } = new List<AbsenceDurationType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceDurationType> AbsenceDurationTypeCreatedByUsers { get; set; } = new List<AbsenceDurationType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceDurationType> AbsenceDurationTypeModifiedByUsers { get; set; } = new List<AbsenceDurationType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Absence> AbsenceModifiedByUsers { get; set; } = new List<Absence>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsencePeriod> AbsencePeriodArchivedByUsers { get; set; } = new List<AbsencePeriod>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsencePeriod> AbsencePeriodCreatedByUsers { get; set; } = new List<AbsencePeriod>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsencePeriod> AbsencePeriodModifiedByUsers { get; set; } = new List<AbsencePeriod>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceReasonType> AbsenceReasonTypeArchivedByUsers { get; set; } = new List<AbsenceReasonType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceReasonType> AbsenceReasonTypeCreatedByUsers { get; set; } = new List<AbsenceReasonType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceReasonType> AbsenceReasonTypeModifiedByUsers { get; set; } = new List<AbsenceReasonType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceRequirement> AbsenceRequirementArchivedByUsers { get; set; } = new List<AbsenceRequirement>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceRequirement> AbsenceRequirementCreatedByUsers { get; set; } = new List<AbsenceRequirement>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceRequirement> AbsenceRequirementModifiedByUsers { get; set; } = new List<AbsenceRequirement>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceSetting> AbsenceSettingArchivedByUsers { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceSetting> AbsenceSettingCreatedByUsers { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceSetting> AbsenceSettingModifiedByUsers { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AbsenceType> AbsenceTypeArchivedByUsers { get; set; } = new List<AbsenceType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AbsenceType> AbsenceTypeCreatedByUsers { get; set; } = new List<AbsenceType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AbsenceType> AbsenceTypeModifiedByUsers { get; set; } = new List<AbsenceType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCase> AccidentCaseArchivedByUsers { get; set; } = new List<AccidentCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseAssociation> AccidentCaseAssociationArchivedByUsers { get; set; } = new List<AccidentCaseAssociation>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseAssociation> AccidentCaseAssociationCreatedByUsers { get; set; } = new List<AccidentCaseAssociation>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseAssociation> AccidentCaseAssociationModifiedByUsers { get; set; } = new List<AccidentCaseAssociation>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCase> AccidentCaseCreatedByUsers { get; set; } = new List<AccidentCase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseExport> AccidentCaseExports { get; set; } = new List<AccidentCaseExport>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldDatumArchivedByUsers { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldDatumCreatedByUsers { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldDatumModifiedByUsers { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCase> AccidentCaseModifiedByUsers { get; set; } = new List<AccidentCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseNote> AccidentCaseNoteArchivedByUsers { get; set; } = new List<AccidentCaseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseNote> AccidentCaseNoteCreatedByUsers { get; set; } = new List<AccidentCaseNote>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseNote> AccidentCaseNoteModifiedByUsers { get; set; } = new List<AccidentCaseNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonDatumArchivedByUsers { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonDatumCreatedByUsers { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonDatumModifiedByUsers { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORDatumArchivedByUsers { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORDatumCreatedByUsers { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORDatumModifiedByUsers { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeDatumArchivedByUsers { get; set; } = new List<AccidentCaseUserAreaQuestionTypeDatum>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeDatumCreatedByUsers { get; set; } = new List<AccidentCaseUserAreaQuestionTypeDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeDatumModifiedByUsers { get; set; } = new List<AccidentCaseUserAreaQuestionTypeDatum>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUserArchivedByUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUserCreatedByUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUserModifiedByUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("User")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUserUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentForm> AccidentFormArchivedByUsers { get; set; } = new List<AccidentForm>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentForm> AccidentFormCreatedByUsers { get; set; } = new List<AccidentForm>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentForm> AccidentFormModifiedByUsers { get; set; } = new List<AccidentForm>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentFormType> AccidentFormTypeArchivedByUsers { get; set; } = new List<AccidentFormType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentFormType> AccidentFormTypeCreatedByUsers { get; set; } = new List<AccidentFormType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentFormType> AccidentFormTypeModifiedByUsers { get; set; } = new List<AccidentFormType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AccidentPerson> AccidentPersonArchivedByUsers { get; set; } = new List<AccidentPerson>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AccidentPerson> AccidentPersonCreatedByUsers { get; set; } = new List<AccidentPerson>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AccidentPerson> AccidentPersonModifiedByUsers { get; set; } = new List<AccidentPerson>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ActionPlan> ActionPlanArchivedByUsers { get; set; } = new List<ActionPlan>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ActionPlan> ActionPlanCreatedByUsers { get; set; } = new List<ActionPlan>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ActionPlanItem> ActionPlanItemArchivedByUsers { get; set; } = new List<ActionPlanItem>();

    [InverseProperty("CompletedByUser")]
    public virtual ICollection<ActionPlanItem> ActionPlanItemCompletedByUsers { get; set; } = new List<ActionPlanItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ActionPlanItem> ActionPlanItemCreatedByUsers { get; set; } = new List<ActionPlanItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ActionPlanItem> ActionPlanItemModifiedByUsers { get; set; } = new List<ActionPlanItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ActionPlan> ActionPlanModifiedByUsers { get; set; } = new List<ActionPlan>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ActionType> ActionTypeArchivedByUsers { get; set; } = new List<ActionType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ActionType> ActionTypeCreatedByUsers { get; set; } = new List<ActionType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ActionType> ActionTypeModifiedByUsers { get; set; } = new List<ActionType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Address> AddressArchivedByUsers { get; set; } = new List<Address>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Address> AddressCreatedByUsers { get; set; } = new List<Address>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Address> AddressModifiedByUsers { get; set; } = new List<Address>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AffectedItem> AffectedItemArchivedByUsers { get; set; } = new List<AffectedItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AffectedItem> AffectedItemCreatedByUsers { get; set; } = new List<AffectedItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AffectedItem> AffectedItemModifiedByUsers { get; set; } = new List<AffectedItem>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AffectedItemType> AffectedItemTypeArchivedByUsers { get; set; } = new List<AffectedItemType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AffectedItemType> AffectedItemTypeCreatedByUsers { get; set; } = new List<AffectedItemType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AffectedItemType> AffectedItemTypeModifiedByUsers { get; set; } = new List<AffectedItemType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Alert> AlertArchivedByUsers { get; set; } = new List<Alert>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Alert> AlertCreatedByUsers { get; set; } = new List<Alert>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Alert> AlertModifiedByUsers { get; set; } = new List<Alert>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AlertType> AlertTypeArchivedByUsers { get; set; } = new List<AlertType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AlertType> AlertTypeCreatedByUsers { get; set; } = new List<AlertType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployeeArchivedByUsers { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployeeCreatedByUsers { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployeeModifiedByUsers { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AlertType> AlertTypeModifiedByUsers { get; set; } = new List<AlertType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AllowedDomain> AllowedDomainArchivedByUsers { get; set; } = new List<AllowedDomain>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AllowedDomain> AllowedDomainCreatedByUsers { get; set; } = new List<AllowedDomain>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AllowedDomain> AllowedDomainModifiedByUsers { get; set; } = new List<AllowedDomain>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnonymousAccidentForm> AnonymousAccidentFormArchivedByUsers { get; set; } = new List<AnonymousAccidentForm>();

    [InverseProperty("ProcessedByUser")]
    public virtual ICollection<AnonymousAccidentForm> AnonymousAccidentFormProcessedByUsers { get; set; } = new List<AnonymousAccidentForm>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnswerGridAnswer> AnswerGridAnswerArchivedByUsers { get; set; } = new List<AnswerGridAnswer>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AnswerGridAnswer> AnswerGridAnswerCreatedByUsers { get; set; } = new List<AnswerGridAnswer>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItemArchivedByUsers { get; set; } = new List<AnswerGridAnswerItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItemCreatedByUsers { get; set; } = new List<AnswerGridAnswerItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AnswerGridAnswerItem> AnswerGridAnswerItemModifiedByUsers { get; set; } = new List<AnswerGridAnswerItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AnswerGridAnswer> AnswerGridAnswerModifiedByUsers { get; set; } = new List<AnswerGridAnswer>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnswerGrid> AnswerGridArchivedByUsers { get; set; } = new List<AnswerGrid>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AnswerGrid> AnswerGridCreatedByUsers { get; set; } = new List<AnswerGrid>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AnswerGrid> AnswerGridModifiedByUsers { get; set; } = new List<AnswerGrid>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnswerGridQuestion> AnswerGridQuestionArchivedByUsers { get; set; } = new List<AnswerGridQuestion>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AnswerGridQuestion> AnswerGridQuestionCreatedByUsers { get; set; } = new List<AnswerGridQuestion>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AnswerGridQuestion> AnswerGridQuestionModifiedByUsers { get; set; } = new List<AnswerGridQuestion>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AnswerType> AnswerTypeArchivedByUsers { get; set; } = new List<AnswerType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AnswerType> AnswerTypeCreatedByUsers { get; set; } = new List<AnswerType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AnswerType> AnswerTypeModifiedByUsers { get; set; } = new List<AnswerType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ApiKey> ApiKeyArchivedByUsers { get; set; } = new List<ApiKey>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ApiKey> ApiKeyCreatedByUsers { get; set; } = new List<ApiKey>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ApiKey> ApiKeyModifiedByUsers { get; set; } = new List<ApiKey>();

    [InverseProperty("User")]
    public virtual ICollection<ApiKey> ApiKeyUsers { get; set; } = new List<ApiKey>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InverseArchivedByUser")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlanArchivedByUsers { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlanCreatedByUsers { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlanModifiedByUsers { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AssetDSEEmployee> AssetDSEEmployeeArchivedByUsers { get; set; } = new List<AssetDSEEmployee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AssetDSEEmployee> AssetDSEEmployeeCreatedByUsers { get; set; } = new List<AssetDSEEmployee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AssetDSEEmployee> AssetDSEEmployeeModifiedByUsers { get; set; } = new List<AssetDSEEmployee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailureArchivedByUsers { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailureCreatedByUsers { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailureModifiedByUsers { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailureArchivedByUsers { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailureCreatedByUsers { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailureModifiedByUsers { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AssetStatusChangeType> AssetStatusChangeTypeArchivedByUsers { get; set; } = new List<AssetStatusChangeType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AssetStatusChangeType> AssetStatusChangeTypeCreatedByUsers { get; set; } = new List<AssetStatusChangeType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AssetStatusChangeType> AssetStatusChangeTypeModifiedByUsers { get; set; } = new List<AssetStatusChangeType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AssetStatusType> AssetStatusTypeArchivedByUsers { get; set; } = new List<AssetStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AssetStatusType> AssetStatusTypeCreatedByUsers { get; set; } = new List<AssetStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AssetStatusType> AssetStatusTypeModifiedByUsers { get; set; } = new List<AssetStatusType>();

    [InverseProperty("PerformedByUser")]
    public virtual ICollection<AssignmentHistory> AssignmentHistories { get; set; } = new List<AssignmentHistory>();

    [InverseProperty("SignerUser")]
    public virtual ICollection<AssignmentSignature> AssignmentSignatures { get; set; } = new List<AssignmentSignature>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Attachment> AttachmentArchivedByUsers { get; set; } = new List<Attachment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<AttachmentBackup> AttachmentBackupArchivedByUsers { get; set; } = new List<AttachmentBackup>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<AttachmentBackup> AttachmentBackupCreatedByUsers { get; set; } = new List<AttachmentBackup>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<AttachmentBackup> AttachmentBackupModifiedByUsers { get; set; } = new List<AttachmentBackup>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Attachment> AttachmentCreatedByUsers { get; set; } = new List<Attachment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Attachment> AttachmentModifiedByUsers { get; set; } = new List<Attachment>();

    [InverseProperty("User")]
    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BCARMClient> BCARMClientArchivedByUsers { get; set; } = new List<BCARMClient>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BCARMClient> BCARMClientCreatedByUsers { get; set; } = new List<BCARMClient>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BCARMClient> BCARMClientModifiedByUsers { get; set; } = new List<BCARMClient>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BCARMError> BCARMErrorArchivedByUsers { get; set; } = new List<BCARMError>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BCARMError> BCARMErrorCreatedByUsers { get; set; } = new List<BCARMError>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BCARMError> BCARMErrorModifiedByUsers { get; set; } = new List<BCARMError>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BSSTask> BSSTaskArchivedByUsers { get; set; } = new List<BSSTask>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BSSTask> BSSTaskCreatedByUsers { get; set; } = new List<BSSTask>();

    [InverseProperty("InProgressByUser")]
    public virtual ICollection<BSSTask> BSSTaskInProgressByUsers { get; set; } = new List<BSSTask>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BSSTask> BSSTaskModifiedByUsers { get; set; } = new List<BSSTask>();

    [InverseProperty("ReturnedToPoolByUser")]
    public virtual ICollection<BSSTask> BSSTaskReturnedToPoolByUsers { get; set; } = new List<BSSTask>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BankHolidayType> BankHolidayTypeArchivedByUsers { get; set; } = new List<BankHolidayType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BankHolidayType> BankHolidayTypeCreatedByUsers { get; set; } = new List<BankHolidayType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BankHolidayType> BankHolidayTypeModifiedByUsers { get; set; } = new List<BankHolidayType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BodyPart> BodyPartArchivedByUsers { get; set; } = new List<BodyPart>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BodyPart> BodyPartCreatedByUsers { get; set; } = new List<BodyPart>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BodyPart> BodyPartModifiedByUsers { get; set; } = new List<BodyPart>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BouncePattern> BouncePatternArchivedByUsers { get; set; } = new List<BouncePattern>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BouncePattern> BouncePatternCreatedByUsers { get; set; } = new List<BouncePattern>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BouncePattern> BouncePatternModifiedByUsers { get; set; } = new List<BouncePattern>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<BounceStatus> BounceStatusArchivedByUsers { get; set; } = new List<BounceStatus>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<BounceStatus> BounceStatusCreatedByUsers { get; set; } = new List<BounceStatus>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<BounceStatus> BounceStatusModifiedByUsers { get; set; } = new List<BounceStatus>();

    [InverseProperty("ResolvedByUser")]
    public virtual ICollection<BounceStatus> BounceStatusResolvedByUsers { get; set; } = new List<BounceStatus>();

    [InverseProperty("User")]
    public virtual ICollection<BounceStatus> BounceStatusUsers { get; set; } = new List<BounceStatus>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Case> CaseArchivedByUsers { get; set; } = new List<Case>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CaseAssignableUser> CaseAssignableUserArchivedByUsers { get; set; } = new List<CaseAssignableUser>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseAssignableUser> CaseAssignableUserCreatedByUsers { get; set; } = new List<CaseAssignableUser>();

    [InverseProperty("User")]
    public virtual ICollection<CaseAssignableUser> CaseAssignableUserUsers { get; set; } = new List<CaseAssignableUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CaseAttachment> CaseAttachmentArchivedByUsers { get; set; } = new List<CaseAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseAttachment> CaseAttachmentCreatedByUsers { get; set; } = new List<CaseAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Case> CaseCreatedByUsers { get; set; } = new List<Case>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseEmailNotification> CaseEmailNotifications { get; set; } = new List<CaseEmailNotification>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseLog> CaseLogs { get; set; } = new List<CaseLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Case> CaseModifiedByUsers { get; set; } = new List<Case>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CaseNote> CaseNoteArchivedByUsers { get; set; } = new List<CaseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseNote> CaseNoteCreatedByUsers { get; set; } = new List<CaseNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CaseType> CaseTypeArchivedByUsers { get; set; } = new List<CaseType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CaseType> CaseTypeCreatedByUsers { get; set; } = new List<CaseType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CaseType> CaseTypeModifiedByUsers { get; set; } = new List<CaseType>();

    [InverseProperty("User")]
    public virtual ICollection<CaseUser> CaseUsers { get; set; } = new List<CaseUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Category> CategoryArchivedByUsers { get; set; } = new List<Category>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Category> CategoryCreatedByUsers { get; set; } = new List<Category>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Category> CategoryModifiedByUsers { get; set; } = new List<Category>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Checklist> ChecklistArchivedByUsers { get; set; } = new List<Checklist>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignmentArchivedByUsers { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignmentCreatedByUsers { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignmentModifiedByUsers { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Checklist> ChecklistCreatedByUsers { get; set; } = new List<Checklist>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ChecklistEnrolment> ChecklistEnrolmentArchivedByUsers { get; set; } = new List<ChecklistEnrolment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ChecklistEnrolment> ChecklistEnrolmentCreatedByUsers { get; set; } = new List<ChecklistEnrolment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ChecklistEnrolment> ChecklistEnrolmentModifiedByUsers { get; set; } = new List<ChecklistEnrolment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Checklist> ChecklistModifiedByUsers { get; set; } = new List<Checklist>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplateArchivedByUsers { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplateCreatedByUsers { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplateModifiedByUsers { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("User")]
    public virtual ICollection<ChecklistViewResponseUser> ChecklistViewResponseUsers { get; set; } = new List<ChecklistViewResponseUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Company> CompanyArchivedByUsers { get; set; } = new List<Company>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Company> CompanyCreatedByUsers { get; set; } = new List<Company>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Company> CompanyModifiedByUsers { get; set; } = new List<Company>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Competency> CompetencyArchivedByUsers { get; set; } = new List<Competency>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Competency> CompetencyCreatedByUsers { get; set; } = new List<Competency>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Competency> CompetencyModifiedByUsers { get; set; } = new List<Competency>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ConformityType> ConformityTypeArchivedByUsers { get; set; } = new List<ConformityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ConformityType> ConformityTypeCreatedByUsers { get; set; } = new List<ConformityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ConformityType> ConformityTypeModifiedByUsers { get; set; } = new List<ConformityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Contact> ContactArchivedByUsers { get; set; } = new List<Contact>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContactContactType> ContactContactTypeArchivedByUsers { get; set; } = new List<ContactContactType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContactContactType> ContactContactTypeCreatedByUsers { get; set; } = new List<ContactContactType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContactContactType> ContactContactTypeModifiedByUsers { get; set; } = new List<ContactContactType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Contact> ContactCreatedByUsers { get; set; } = new List<Contact>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Contact> ContactModifiedByUsers { get; set; } = new List<Contact>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContactType> ContactTypeArchivedByUsers { get; set; } = new List<ContactType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContactType> ContactTypeCreatedByUsers { get; set; } = new List<ContactType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContactType> ContactTypeModifiedByUsers { get; set; } = new List<ContactType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContextHelpText> ContextHelpTextArchivedByUsers { get; set; } = new List<ContextHelpText>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContextHelpText> ContextHelpTextCreatedByUsers { get; set; } = new List<ContextHelpText>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContextHelpText> ContextHelpTextModifiedByUsers { get; set; } = new List<ContextHelpText>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContextHelpTextStory> ContextHelpTextStoryArchivedByUsers { get; set; } = new List<ContextHelpTextStory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContextHelpTextStory> ContextHelpTextStoryCreatedByUsers { get; set; } = new List<ContextHelpTextStory>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContextHelpTextStory> ContextHelpTextStoryModifiedByUsers { get; set; } = new List<ContextHelpTextStory>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Contractor> ContractorArchivedByUsers { get; set; } = new List<Contractor>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogArchivedByUsers { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogCreatedByUsers { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogModifiedByUsers { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorCompany> ContractorCompanyArchivedByUsers { get; set; } = new List<ContractorCompany>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorCompany> ContractorCompanyCreatedByUsers { get; set; } = new List<ContractorCompany>();

    [InverseProperty("LoggedByUser")]
    public virtual ICollection<ContractorCompanyLog> ContractorCompanyLogs { get; set; } = new List<ContractorCompanyLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorCompany> ContractorCompanyModifiedByUsers { get; set; } = new List<ContractorCompany>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPArchivedByUsers { get; set; } = new List<ContractorCompanySSIP>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPCreatedByUsers { get; set; } = new List<ContractorCompanySSIP>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPModifiedByUsers { get; set; } = new List<ContractorCompanySSIP>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencyArchivedByUsers { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencyCreatedByUsers { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencyModifiedByUsers { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorCompetencyNote> ContractorCompetencyNoteArchivedByUsers { get; set; } = new List<ContractorCompetencyNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorCompetencyNote> ContractorCompetencyNoteCreatedByUsers { get; set; } = new List<ContractorCompetencyNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Contractor> ContractorCreatedByUsers { get; set; } = new List<Contractor>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Contractor> ContractorModifiedByUsers { get; set; } = new List<Contractor>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorRegister> ContractorRegisterArchivedByUsers { get; set; } = new List<ContractorRegister>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorRegister> ContractorRegisterCreatedByUsers { get; set; } = new List<ContractorRegister>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorRegister> ContractorRegisterModifiedByUsers { get; set; } = new List<ContractorRegister>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccessArchivedByUsers { get; set; } = new List<ContractorSiteAccess>();

    [InverseProperty("LinkedByUser")]
    public virtual ICollection<ContractorSiteAccessAttachment> ContractorSiteAccessAttachments { get; set; } = new List<ContractorSiteAccessAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccessCreatedByUsers { get; set; } = new List<ContractorSiteAccess>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccessModifiedByUsers { get; set; } = new List<ContractorSiteAccess>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnelArchivedByUsers { get; set; } = new List<ContractorSiteAccessPersonnel>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnelCreatedByUsers { get; set; } = new List<ContractorSiteAccessPersonnel>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnelModifiedByUsers { get; set; } = new List<ContractorSiteAccessPersonnel>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirementArchivedByUsers { get; set; } = new List<ContractorSiteAccessRequirement>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirementCreatedByUsers { get; set; } = new List<ContractorSiteAccessRequirement>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirementModifiedByUsers { get; set; } = new List<ContractorSiteAccessRequirement>();

    [InverseProperty("LoggedInUser")]
    public virtual ICollection<ContractorSiteAccessSignOff> ContractorSiteAccessSignOffs { get; set; } = new List<ContractorSiteAccessSignOff>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorSiteAccessStatus> ContractorSiteAccessStatusArchivedByUsers { get; set; } = new List<ContractorSiteAccessStatus>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorSiteAccessStatus> ContractorSiteAccessStatusCreatedByUsers { get; set; } = new List<ContractorSiteAccessStatus>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorSiteAccessStatus> ContractorSiteAccessStatusModifiedByUsers { get; set; } = new List<ContractorSiteAccessStatus>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ContractorType> ContractorTypeArchivedByUsers { get; set; } = new List<ContractorType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ContractorType> ContractorTypeCreatedByUsers { get; set; } = new List<ContractorType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ContractorType> ContractorTypeModifiedByUsers { get; set; } = new List<ContractorType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CostSheet> CostSheetArchivedByUsers { get; set; } = new List<CostSheet>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CostSheetCostType> CostSheetCostTypeArchivedByUsers { get; set; } = new List<CostSheetCostType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CostSheetCostType> CostSheetCostTypeCreatedByUsers { get; set; } = new List<CostSheetCostType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CostSheetCostType> CostSheetCostTypeModifiedByUsers { get; set; } = new List<CostSheetCostType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CostSheet> CostSheetCreatedByUsers { get; set; } = new List<CostSheet>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CostSheet> CostSheetModifiedByUsers { get; set; } = new List<CostSheet>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CostType> CostTypeArchivedByUsers { get; set; } = new List<CostType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CostType> CostTypeCreatedByUsers { get; set; } = new List<CostType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CostType> CostTypeModifiedByUsers { get; set; } = new List<CostType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CostUnitType> CostUnitTypeArchivedByUsers { get; set; } = new List<CostUnitType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CostUnitType> CostUnitTypeCreatedByUsers { get; set; } = new List<CostUnitType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CostUnitType> CostUnitTypeModifiedByUsers { get; set; } = new List<CostUnitType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Counsel> CounselArchivedByUsers { get; set; } = new List<Counsel>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CounselChamber> CounselChamberArchivedByUsers { get; set; } = new List<CounselChamber>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CounselChamber> CounselChamberCreatedByUsers { get; set; } = new List<CounselChamber>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CounselChamber> CounselChamberModifiedByUsers { get; set; } = new List<CounselChamber>();

    [InverseProperty("CounselUser")]
    public virtual ICollection<Counsel> CounselCounselUsers { get; set; } = new List<Counsel>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Counsel> CounselCreatedByUsers { get; set; } = new List<Counsel>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Counsel> CounselModifiedByUsers { get; set; } = new List<Counsel>();

    [InverseProperty("AssignedByUser")]
    public virtual ICollection<CourseAssignment> CourseAssignmentAssignedByUsers { get; set; } = new List<CourseAssignment>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<CourseAssignment> CourseAssignmentAssignedToUsers { get; set; } = new List<CourseAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilterArchivedByUsers { get; set; } = new List<CourseBundleFilter>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilterCreatedByUsers { get; set; } = new List<CourseBundleFilter>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilterModifiedByUsers { get; set; } = new List<CourseBundleFilter>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CourseEnrollment> CourseEnrollmentArchivedByUsers { get; set; } = new List<CourseEnrollment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CourseEnrollment> CourseEnrollmentCreatedByUsers { get; set; } = new List<CourseEnrollment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CourseEnrollment> CourseEnrollmentModifiedByUsers { get; set; } = new List<CourseEnrollment>();

    [InverseProperty("SignedByUser")]
    public virtual ICollection<CourseEnrolmentSignature> CourseEnrolmentSignatures { get; set; } = new List<CourseEnrolmentSignature>();

    [InverseProperty("User")]
    public virtual ICollection<CourseEnrolment> CourseEnrolments { get; set; } = new List<CourseEnrolment>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InverseCreatedByUser")]
    public virtual User? CreatedByUser { get; set; }

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CurrencyType> CurrencyTypeArchivedByUsers { get; set; } = new List<CurrencyType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CurrencyType> CurrencyTypeCreatedByUsers { get; set; } = new List<CurrencyType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CurrencyType> CurrencyTypeModifiedByUsers { get; set; } = new List<CurrencyType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<CustomPermission> CustomPermissionArchivedByUsers { get; set; } = new List<CustomPermission>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<CustomPermission> CustomPermissionCreatedByUsers { get; set; } = new List<CustomPermission>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<CustomPermission> CustomPermissionModifiedByUsers { get; set; } = new List<CustomPermission>();

    [InverseProperty("User")]
    public virtual ICollection<CustomPermission> CustomPermissionUsers { get; set; } = new List<CustomPermission>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Customer> CustomerArchivedByUsers { get; set; } = new List<Customer>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Customer> CustomerCreatedByUsers { get; set; } = new List<Customer>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Customer> CustomerModifiedByUsers { get; set; } = new List<Customer>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DSECase> DSECaseArchivedByUsers { get; set; } = new List<DSECase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DSECase> DSECaseCreatedByUsers { get; set; } = new List<DSECase>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DSECase> DSECaseModifiedByUsers { get; set; } = new List<DSECase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DSECaseNote> DSECaseNoteArchivedByUsers { get; set; } = new List<DSECaseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DSECaseNote> DSECaseNoteCreatedByUsers { get; set; } = new List<DSECaseNote>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DSECaseNote> DSECaseNoteModifiedByUsers { get; set; } = new List<DSECaseNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DSEEmployeeRelocation> DSEEmployeeRelocationArchivedByUsers { get; set; } = new List<DSEEmployeeRelocation>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DSEEmployeeRelocation> DSEEmployeeRelocationCreatedByUsers { get; set; } = new List<DSEEmployeeRelocation>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DSEEmployeeRelocation> DSEEmployeeRelocationModifiedByUsers { get; set; } = new List<DSEEmployeeRelocation>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DangerType> DangerTypeArchivedByUsers { get; set; } = new List<DangerType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DangerType> DangerTypeCreatedByUsers { get; set; } = new List<DangerType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DangerType> DangerTypeModifiedByUsers { get; set; } = new List<DangerType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DangerousOccurrenceCategoryType> DangerousOccurrenceCategoryTypeArchivedByUsers { get; set; } = new List<DangerousOccurrenceCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DangerousOccurrenceCategoryType> DangerousOccurrenceCategoryTypeCreatedByUsers { get; set; } = new List<DangerousOccurrenceCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DangerousOccurrenceCategoryType> DangerousOccurrenceCategoryTypeModifiedByUsers { get; set; } = new List<DangerousOccurrenceCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DangerousOccurrenceType> DangerousOccurrenceTypeArchivedByUsers { get; set; } = new List<DangerousOccurrenceType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DangerousOccurrenceType> DangerousOccurrenceTypeCreatedByUsers { get; set; } = new List<DangerousOccurrenceType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DangerousOccurrenceType> DangerousOccurrenceTypeModifiedByUsers { get; set; } = new List<DangerousOccurrenceType>();

    [InverseProperty("User")]
    public virtual ICollection<DashboardUserShortcutSlot> DashboardUserShortcutSlots { get; set; } = new List<DashboardUserShortcutSlot>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DataActivityLog> DataActivityLogArchivedByUsers { get; set; } = new List<DataActivityLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DataActivityLog> DataActivityLogCreatedByUsers { get; set; } = new List<DataActivityLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DataActivityLog> DataActivityLogModifiedByUsers { get; set; } = new List<DataActivityLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DataStructure> DataStructureArchivedByUsers { get; set; } = new List<DataStructure>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DataStructure> DataStructureCreatedByUsers { get; set; } = new List<DataStructure>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DataStructure> DataStructureModifiedByUsers { get; set; } = new List<DataStructure>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DefaultDashboard> DefaultDashboardArchivedByUsers { get; set; } = new List<DefaultDashboard>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DefaultDashboard> DefaultDashboardCreatedByUsers { get; set; } = new List<DefaultDashboard>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DefaultDashboard> DefaultDashboardModifiedByUsers { get; set; } = new List<DefaultDashboard>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DefaultDashboardUser> DefaultDashboardUserCreatedByUsers { get; set; } = new List<DefaultDashboardUser>();

    [InverseProperty("User")]
    public virtual ICollection<DefaultDashboardUser> DefaultDashboardUserUsers { get; set; } = new List<DefaultDashboardUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocPack> DocPackArchivedByUsers { get; set; } = new List<DocPack>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocPack> DocPackCreatedByUsers { get; set; } = new List<DocPack>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocPackItem> DocPackItemArchivedByUsers { get; set; } = new List<DocPackItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocPackItem> DocPackItemCreatedByUsers { get; set; } = new List<DocPackItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocPackItem> DocPackItemModifiedByUsers { get; set; } = new List<DocPackItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocPack> DocPackModifiedByUsers { get; set; } = new List<DocPack>();

    [InverseProperty("User")]
    public virtual ICollection<DocPackViewerUser> DocPackViewerUsers { get; set; } = new List<DocPackViewerUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Document> DocumentArchivedByUsers { get; set; } = new List<Document>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentAssignment> DocumentAssignmentArchivedByUsers { get; set; } = new List<DocumentAssignment>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<DocumentAssignment> DocumentAssignmentAssignedToUsers { get; set; } = new List<DocumentAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentAssignment> DocumentAssignmentCreatedByUsers { get; set; } = new List<DocumentAssignment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentAssignment> DocumentAssignmentModifiedByUsers { get; set; } = new List<DocumentAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentBundle> DocumentBundleArchivedByUsers { get; set; } = new List<DocumentBundle>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignmentArchivedByUsers { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignmentAssignedToUsers { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignmentCreatedByUsers { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignmentModifiedByUsers { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentBundle> DocumentBundleCreatedByUsers { get; set; } = new List<DocumentBundle>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentBundle> DocumentBundleModifiedByUsers { get; set; } = new List<DocumentBundle>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Document> DocumentCreatedByUsers { get; set; } = new List<Document>();

    [InverseProperty("User")]
    public virtual ICollection<DocumentEditLockUser> DocumentEditLockUsers { get; set; } = new List<DocumentEditLockUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentFolder> DocumentFolderArchivedByUsers { get; set; } = new List<DocumentFolder>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentFolder> DocumentFolderCreatedByUsers { get; set; } = new List<DocumentFolder>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentFolder> DocumentFolderModifiedByUsers { get; set; } = new List<DocumentFolder>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentLink> DocumentLinks { get; set; } = new List<DocumentLink>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Document> DocumentModifiedByUsers { get; set; } = new List<Document>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentRegister> DocumentRegisterArchivedByUsers { get; set; } = new List<DocumentRegister>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentRegister> DocumentRegisterCreatedByUsers { get; set; } = new List<DocumentRegister>();

    [InverseProperty("ReviewedByUser")]
    public virtual ICollection<DocumentRequirementFulfillment> DocumentRequirementFulfillmentReviewedByUsers { get; set; } = new List<DocumentRequirementFulfillment>();

    [InverseProperty("SubmittedByUser")]
    public virtual ICollection<DocumentRequirementFulfillment> DocumentRequirementFulfillmentSubmittedByUsers { get; set; } = new List<DocumentRequirementFulfillment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentRequirementSet> DocumentRequirementSetArchivedByUsers { get; set; } = new List<DocumentRequirementSet>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentRequirementSet> DocumentRequirementSetCreatedByUsers { get; set; } = new List<DocumentRequirementSet>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentRequirementSet> DocumentRequirementSetModifiedByUsers { get; set; } = new List<DocumentRequirementSet>();

    [InverseProperty("SignerUser")]
    public virtual ICollection<DocumentSignature> DocumentSignatures { get; set; } = new List<DocumentSignature>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentTemplate> DocumentTemplateArchivedByUsers { get; set; } = new List<DocumentTemplate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentTemplate> DocumentTemplateCreatedByUsers { get; set; } = new List<DocumentTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentTemplate> DocumentTemplateModifiedByUsers { get; set; } = new List<DocumentTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<DocumentTemplateTag> DocumentTemplateTagArchivedByUsers { get; set; } = new List<DocumentTemplateTag>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<DocumentTemplateTag> DocumentTemplateTagCreatedByUsers { get; set; } = new List<DocumentTemplateTag>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<DocumentTemplateTag> DocumentTemplateTagModifiedByUsers { get; set; } = new List<DocumentTemplateTag>();

    [InverseProperty("UsedByUser")]
    public virtual ICollection<DocumentTemplateUsage> DocumentTemplateUsages { get; set; } = new List<DocumentTemplateUsage>();

    [InverseProperty("User")]
    public virtual ICollection<DocumentViewLog> DocumentViewLogs { get; set; } = new List<DocumentViewLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeArchivedByUsers { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeCreatedByUsers { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployeeModifiedByUsers { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EWMGEscalationPeriod> EWMGEscalationPeriodArchivedByUsers { get; set; } = new List<EWMGEscalationPeriod>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EWMGEscalationPeriod> EWMGEscalationPeriodCreatedByUsers { get; set; } = new List<EWMGEscalationPeriod>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EWMGEscalationPeriod> EWMGEscalationPeriodModifiedByUsers { get; set; } = new List<EWMGEscalationPeriod>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmailMessage> EmailMessageArchivedByUsers { get; set; } = new List<EmailMessage>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmailMessage> EmailMessageCreatedByUsers { get; set; } = new List<EmailMessage>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmailMessage> EmailMessageModifiedByUsers { get; set; } = new List<EmailMessage>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmailServiceConfiguration> EmailServiceConfigurationArchivedByUsers { get; set; } = new List<EmailServiceConfiguration>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmailServiceConfiguration> EmailServiceConfigurationCreatedByUsers { get; set; } = new List<EmailServiceConfiguration>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmailServiceConfiguration> EmailServiceConfigurationModifiedByUsers { get; set; } = new List<EmailServiceConfiguration>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmailTemplate> EmailTemplateArchivedByUsers { get; set; } = new List<EmailTemplate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmailTemplate> EmailTemplateCreatedByUsers { get; set; } = new List<EmailTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmailTemplate> EmailTemplateModifiedByUsers { get; set; } = new List<EmailTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeAbsenceConfig> EmployeeAbsenceConfigArchivedByUsers { get; set; } = new List<EmployeeAbsenceConfig>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeAbsenceConfig> EmployeeAbsenceConfigCreatedByUsers { get; set; } = new List<EmployeeAbsenceConfig>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeAbsenceConfig> EmployeeAbsenceConfigModifiedByUsers { get; set; } = new List<EmployeeAbsenceConfig>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Employee> EmployeeArchivedByUsers { get; set; } = new List<Employee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeCase> EmployeeCaseArchivedByUsers { get; set; } = new List<EmployeeCase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeCase> EmployeeCaseCreatedByUsers { get; set; } = new List<EmployeeCase>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeCase> EmployeeCaseModifiedByUsers { get; set; } = new List<EmployeeCase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeCaseNote> EmployeeCaseNotes { get; set; } = new List<EmployeeCaseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Employee> EmployeeCreatedByUsers { get; set; } = new List<Employee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeEntitlementLog> EmployeeEntitlementLogArchivedByUsers { get; set; } = new List<EmployeeEntitlementLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeEntitlementLog> EmployeeEntitlementLogCreatedByUsers { get; set; } = new List<EmployeeEntitlementLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeEntitlementLog> EmployeeEntitlementLogModifiedByUsers { get; set; } = new List<EmployeeEntitlementLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalkArchivedByUsers { get; set; } = new List<EmployeeFavouriteWalk>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalkCreatedByUsers { get; set; } = new List<EmployeeFavouriteWalk>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalkModifiedByUsers { get; set; } = new List<EmployeeFavouriteWalk>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeFolder> EmployeeFolderArchivedByUsers { get; set; } = new List<EmployeeFolder>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeFolder> EmployeeFolderCreatedByUsers { get; set; } = new List<EmployeeFolder>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeFolder> EmployeeFolderModifiedByUsers { get; set; } = new List<EmployeeFolder>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Employee> EmployeeModifiedByUsers { get; set; } = new List<Employee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeePPE> EmployeePPEArchivedByUsers { get; set; } = new List<EmployeePPE>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeePPE> EmployeePPECreatedByUsers { get; set; } = new List<EmployeePPE>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeePPE> EmployeePPEModifiedByUsers { get; set; } = new List<EmployeePPE>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeQualification> EmployeeQualificationArchivedByUsers { get; set; } = new List<EmployeeQualification>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeQualification> EmployeeQualificationCreatedByUsers { get; set; } = new List<EmployeeQualification>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeQualification> EmployeeQualificationModifiedByUsers { get; set; } = new List<EmployeeQualification>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeSicknessStatusType> EmployeeSicknessStatusTypes { get; set; } = new List<EmployeeSicknessStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlockArchivedByUsers { get; set; } = new List<EmployeeTextBlock>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlockCreatedByUsers { get; set; } = new List<EmployeeTextBlock>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeTextBlock> EmployeeTextBlockModifiedByUsers { get; set; } = new List<EmployeeTextBlock>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeTimePad> EmployeeTimePads { get; set; } = new List<EmployeeTimePad>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmployeeType> EmployeeTypeArchivedByUsers { get; set; } = new List<EmployeeType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmployeeType> EmployeeTypeCreatedByUsers { get; set; } = new List<EmployeeType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmployeeType> EmployeeTypeModifiedByUsers { get; set; } = new List<EmployeeType>();

    [InverseProperty("User")]
    public virtual ICollection<Employee> EmployeeUsers { get; set; } = new List<Employee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EmploymentStatusType> EmploymentStatusTypeArchivedByUsers { get; set; } = new List<EmploymentStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EmploymentStatusType> EmploymentStatusTypeCreatedByUsers { get; set; } = new List<EmploymentStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EmploymentStatusType> EmploymentStatusTypeModifiedByUsers { get; set; } = new List<EmploymentStatusType>();

    [InverseProperty("ProcessedByUser")]
    public virtual ICollection<Enquiry> EnquiryProcessedByUsers { get; set; } = new List<Enquiry>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<EnquiryType> EnquiryTypeArchivedByUsers { get; set; } = new List<EnquiryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<EnquiryType> EnquiryTypeCreatedByUsers { get; set; } = new List<EnquiryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<EnquiryType> EnquiryTypeModifiedByUsers { get; set; } = new List<EnquiryType>();

    [InverseProperty("User")]
    public virtual ICollection<Enquiry> EnquiryUsers { get; set; } = new List<Enquiry>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Event> EventArchivedByUsers { get; set; } = new List<Event>();

    [InverseProperty("User")]
    public virtual ICollection<EventAudience> EventAudiences { get; set; } = new List<EventAudience>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Event> EventCreatedByUsers { get; set; } = new List<Event>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Event> EventModifiedByUsers { get; set; } = new List<Event>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ExposureType> ExposureTypeArchivedByUsers { get; set; } = new List<ExposureType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ExposureType> ExposureTypeCreatedByUsers { get; set; } = new List<ExposureType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ExposureType> ExposureTypeModifiedByUsers { get; set; } = new List<ExposureType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainingArchivedByUsers { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainingCreatedByUsers { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainingModifiedByUsers { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ExternalLink> ExternalLinkArchivedByUsers { get; set; } = new List<ExternalLink>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ExternalLink> ExternalLinkCreatedByUsers { get; set; } = new List<ExternalLink>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ExternalLink> ExternalLinkModifiedByUsers { get; set; } = new List<ExternalLink>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Favourite> FavouriteArchivedByUsers { get; set; } = new List<Favourite>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<FavouriteChecklist> FavouriteChecklistArchivedByUsers { get; set; } = new List<FavouriteChecklist>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<FavouriteChecklist> FavouriteChecklistCreatedByUsers { get; set; } = new List<FavouriteChecklist>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<FavouriteChecklist> FavouriteChecklistModifiedByUsers { get; set; } = new List<FavouriteChecklist>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Favourite> FavouriteCreatedByUsers { get; set; } = new List<Favourite>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Favourite> FavouriteModifiedByUsers { get; set; } = new List<Favourite>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<FavouriteRiskAssessment> FavouriteRiskAssessmentArchivedByUsers { get; set; } = new List<FavouriteRiskAssessment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<FavouriteRiskAssessment> FavouriteRiskAssessmentCreatedByUsers { get; set; } = new List<FavouriteRiskAssessment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<FavouriteRiskAssessment> FavouriteRiskAssessmentModifiedByUsers { get; set; } = new List<FavouriteRiskAssessment>();

    [InverseProperty("User")]
    public virtual ICollection<Favourite> FavouriteUsers { get; set; } = new List<Favourite>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<FavouriteWalk> FavouriteWalkArchivedByUsers { get; set; } = new List<FavouriteWalk>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<FavouriteWalk> FavouriteWalkCreatedByUsers { get; set; } = new List<FavouriteWalk>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<FavouriteWalk> FavouriteWalkModifiedByUsers { get; set; } = new List<FavouriteWalk>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Folder> FolderArchivedByUsers { get; set; } = new List<Folder>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Folder> FolderCreatedByUsers { get; set; } = new List<Folder>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Folder> FolderModifiedByUsers { get; set; } = new List<Folder>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<GenderType> GenderTypeArchivedByUsers { get; set; } = new List<GenderType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<GenderType> GenderTypeCreatedByUsers { get; set; } = new List<GenderType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<GenderType> GenderTypeModifiedByUsers { get; set; } = new List<GenderType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<GeographicalAreaType> GeographicalAreaTypeArchivedByUsers { get; set; } = new List<GeographicalAreaType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<GeographicalAreaType> GeographicalAreaTypeCreatedByUsers { get; set; } = new List<GeographicalAreaType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<GeographicalAreaType> GeographicalAreaTypeModifiedByUsers { get; set; } = new List<GeographicalAreaType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HAVSRegisterEntry> HAVSRegisterEntryArchivedByUsers { get; set; } = new List<HAVSRegisterEntry>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HAVSRegisterEntry> HAVSRegisterEntryCreatedByUsers { get; set; } = new List<HAVSRegisterEntry>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HAVSRegisterEntry> HAVSRegisterEntryModifiedByUsers { get; set; } = new List<HAVSRegisterEntry>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HAVSRegisterEntryTool> HAVSRegisterEntryToolArchivedByUsers { get; set; } = new List<HAVSRegisterEntryTool>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HAVSRegisterEntryTool> HAVSRegisterEntryToolCreatedByUsers { get; set; } = new List<HAVSRegisterEntryTool>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HAVSRegisterEntryTool> HAVSRegisterEntryToolModifiedByUsers { get; set; } = new List<HAVSRegisterEntryTool>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HAVSTool> HAVSToolArchivedByUsers { get; set; } = new List<HAVSTool>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HAVSTool> HAVSToolCreatedByUsers { get; set; } = new List<HAVSTool>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HAVSTool> HAVSToolModifiedByUsers { get; set; } = new List<HAVSTool>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisorArchivedByUsers { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisorCreatedByUsers { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseAdvisor> HRCaseAdvisorModifiedByUsers { get; set; } = new List<HRCaseAdvisor>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCase> HRCaseArchivedByUsers { get; set; } = new List<HRCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachmentArchivedByUsers { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachmentCreatedByUsers { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachmentModifiedByUsers { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseAttachmentNote> HRCaseAttachmentNotes { get; set; } = new List<HRCaseAttachmentNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseAttachmentType> HRCaseAttachmentTypeArchivedByUsers { get; set; } = new List<HRCaseAttachmentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseAttachmentType> HRCaseAttachmentTypeCreatedByUsers { get; set; } = new List<HRCaseAttachmentType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseAttachmentType> HRCaseAttachmentTypeModifiedByUsers { get; set; } = new List<HRCaseAttachmentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCase> HRCaseCreatedByUsers { get; set; } = new List<HRCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseEmail> HRCaseEmailArchivedByUsers { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseEmail> HRCaseEmailCreatedByUsers { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseEmail> HRCaseEmailModifiedByUsers { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseEvent> HRCaseEventArchivedByUsers { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseEvent> HRCaseEventCreatedByUsers { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseEvent> HRCaseEventModifiedByUsers { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("HRCaseAdvisorUser")]
    public virtual ICollection<HRCase> HRCaseHRCaseAdvisorUsers { get; set; } = new List<HRCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetingArchivedByUsers { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseMeetingAttendee> HRCaseMeetingAttendeeArchivedByUsers { get; set; } = new List<HRCaseMeetingAttendee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseMeetingAttendee> HRCaseMeetingAttendeeCreatedByUsers { get; set; } = new List<HRCaseMeetingAttendee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseMeetingAttendee> HRCaseMeetingAttendeeModifiedByUsers { get; set; } = new List<HRCaseMeetingAttendee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetingCreatedByUsers { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetingModifiedByUsers { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCase> HRCaseModifiedByUsers { get; set; } = new List<HRCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseNote> HRCaseNoteArchivedByUsers { get; set; } = new List<HRCaseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseNote> HRCaseNoteCreatedByUsers { get; set; } = new List<HRCaseNote>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseNote> HRCaseNoteModifiedByUsers { get; set; } = new List<HRCaseNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseOutcomeType> HRCaseOutcomeTypeArchivedByUsers { get; set; } = new List<HRCaseOutcomeType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseOutcomeType> HRCaseOutcomeTypeCreatedByUsers { get; set; } = new List<HRCaseOutcomeType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseOutcomeType> HRCaseOutcomeTypeModifiedByUsers { get; set; } = new List<HRCaseOutcomeType>();

    [InverseProperty("EmulatingUser")]
    public virtual ICollection<HRCasePing> HRCasePingEmulatingUsers { get; set; } = new List<HRCasePing>();

    [InverseProperty("User")]
    public virtual ICollection<HRCasePing> HRCasePingUsers { get; set; } = new List<HRCasePing>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseStatusType> HRCaseStatusTypeArchivedByUsers { get; set; } = new List<HRCaseStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseStatusType> HRCaseStatusTypeCreatedByUsers { get; set; } = new List<HRCaseStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseStatusType> HRCaseStatusTypeModifiedByUsers { get; set; } = new List<HRCaseStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCaseTemplateCategory> HRCaseTemplateCategoryArchivedByUsers { get; set; } = new List<HRCaseTemplateCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCaseTemplateCategory> HRCaseTemplateCategoryCreatedByUsers { get; set; } = new List<HRCaseTemplateCategory>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCaseTemplateCategory> HRCaseTemplateCategoryModifiedByUsers { get; set; } = new List<HRCaseTemplateCategory>();

    [InverseProperty("EmulatingUser")]
    public virtual ICollection<HRCaseTimePad> HRCaseTimePadEmulatingUsers { get; set; } = new List<HRCaseTimePad>();

    [InverseProperty("User")]
    public virtual ICollection<HRCaseTimePad> HRCaseTimePadUsers { get; set; } = new List<HRCaseTimePad>();

    [InverseProperty("User")]
    public virtual ICollection<HRCaseViewerUser> HRCaseViewerUsers { get; set; } = new List<HRCaseViewerUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRCategory> HRCategoryArchivedByUsers { get; set; } = new List<HRCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCategory> HRCategoryCreatedByUsers { get; set; } = new List<HRCategory>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRCategory> HRCategoryModifiedByUsers { get; set; } = new List<HRCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCostBaseRate> HRCostBaseRates { get; set; } = new List<HRCostBaseRate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRCostUserRate> HRCostUserRates { get; set; } = new List<HRCostUserRate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRMeetingType> HRMeetingTypeArchivedByUsers { get; set; } = new List<HRMeetingType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRMeetingType> HRMeetingTypeCreatedByUsers { get; set; } = new List<HRMeetingType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRMeetingType> HRMeetingTypeModifiedByUsers { get; set; } = new List<HRMeetingType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRTemplate> HRTemplateArchivedByUsers { get; set; } = new List<HRTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HRTemplateCategory> HRTemplateCategories { get; set; } = new List<HRTemplateCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HRTemplate> HRTemplateCreatedByUsers { get; set; } = new List<HRTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HRTemplate> HRTemplateModifiedByUsers { get; set; } = new List<HRTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HazardCategoryType> HazardCategoryTypeArchivedByUsers { get; set; } = new List<HazardCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HazardCategoryType> HazardCategoryTypeCreatedByUsers { get; set; } = new List<HazardCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HazardCategoryType> HazardCategoryTypeModifiedByUsers { get; set; } = new List<HazardCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HazardReport> HazardReportArchivedByUsers { get; set; } = new List<HazardReport>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HazardReport> HazardReportCreatedByUsers { get; set; } = new List<HazardReport>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HazardReport> HazardReportModifiedByUsers { get; set; } = new List<HazardReport>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<HazardSeverityType> HazardSeverityTypeArchivedByUsers { get; set; } = new List<HazardSeverityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<HazardSeverityType> HazardSeverityTypeCreatedByUsers { get; set; } = new List<HazardSeverityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<HazardSeverityType> HazardSeverityTypeModifiedByUsers { get; set; } = new List<HazardSeverityType>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<Hazard> Hazards { get; set; } = new List<Hazard>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Import> ImportArchivedByUsers { get; set; } = new List<Import>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Import> ImportCreatedByUsers { get; set; } = new List<Import>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Import> ImportModifiedByUsers { get; set; } = new List<Import>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentCategoryType> IncidentCategoryTypeArchivedByUsers { get; set; } = new List<IncidentCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentCategoryType> IncidentCategoryTypeCreatedByUsers { get; set; } = new List<IncidentCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentCategoryType> IncidentCategoryTypeModifiedByUsers { get; set; } = new List<IncidentCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentKind> IncidentKindArchivedByUsers { get; set; } = new List<IncidentKind>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentKind> IncidentKindCreatedByUsers { get; set; } = new List<IncidentKind>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentKind> IncidentKindModifiedByUsers { get; set; } = new List<IncidentKind>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentPriorityType> IncidentPriorityTypeArchivedByUsers { get; set; } = new List<IncidentPriorityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentPriorityType> IncidentPriorityTypeCreatedByUsers { get; set; } = new List<IncidentPriorityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentPriorityType> IncidentPriorityTypeModifiedByUsers { get; set; } = new List<IncidentPriorityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentSeverityType> IncidentSeverityTypeArchivedByUsers { get; set; } = new List<IncidentSeverityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentSeverityType> IncidentSeverityTypeCreatedByUsers { get; set; } = new List<IncidentSeverityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentSeverityType> IncidentSeverityTypeModifiedByUsers { get; set; } = new List<IncidentSeverityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentStatusType> IncidentStatusTypeArchivedByUsers { get; set; } = new List<IncidentStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentStatusType> IncidentStatusTypeCreatedByUsers { get; set; } = new List<IncidentStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentStatusType> IncidentStatusTypeModifiedByUsers { get; set; } = new List<IncidentStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<IncidentType> IncidentTypeArchivedByUsers { get; set; } = new List<IncidentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<IncidentType> IncidentTypeCreatedByUsers { get; set; } = new List<IncidentType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<IncidentType> IncidentTypeModifiedByUsers { get; set; } = new List<IncidentType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<InductionAllocation> InductionAllocationArchivedByUsers { get; set; } = new List<InductionAllocation>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<InductionAllocation> InductionAllocationCreatedByUsers { get; set; } = new List<InductionAllocation>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<InductionAllocation> InductionAllocationModifiedByUsers { get; set; } = new List<InductionAllocation>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<InductionBundle> InductionBundleArchivedByUsers { get; set; } = new List<InductionBundle>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<InductionBundle> InductionBundleCreatedByUsers { get; set; } = new List<InductionBundle>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<InductionBundleItem> InductionBundleItemArchivedByUsers { get; set; } = new List<InductionBundleItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<InductionBundleItem> InductionBundleItemCreatedByUsers { get; set; } = new List<InductionBundleItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<InductionBundleItem> InductionBundleItemModifiedByUsers { get; set; } = new List<InductionBundleItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<InductionBundle> InductionBundleModifiedByUsers { get; set; } = new List<InductionBundle>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<InductionEnrolment> InductionEnrolmentArchivedByUsers { get; set; } = new List<InductionEnrolment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<InductionEnrolment> InductionEnrolmentCreatedByUsers { get; set; } = new List<InductionEnrolment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<InductionEnrolment> InductionEnrolmentModifiedByUsers { get; set; } = new List<InductionEnrolment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<InjuryType> InjuryTypeArchivedByUsers { get; set; } = new List<InjuryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<InjuryType> InjuryTypeCreatedByUsers { get; set; } = new List<InjuryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<InjuryType> InjuryTypeModifiedByUsers { get; set; } = new List<InjuryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<User> InverseArchivedByUser { get; set; } = new List<User>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<User> InverseCreatedByUser { get; set; } = new List<User>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<User> InverseModifiedByUser { get; set; } = new List<User>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<JobExecution> JobExecutionArchivedByUsers { get; set; } = new List<JobExecution>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<JobExecution> JobExecutionCreatedByUsers { get; set; } = new List<JobExecution>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<JobExecution> JobExecutionModifiedByUsers { get; set; } = new List<JobExecution>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<JobRole> JobRoleArchivedByUsers { get; set; } = new List<JobRole>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<JobRole> JobRoleCreatedByUsers { get; set; } = new List<JobRole>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<JobRole> JobRoleModifiedByUsers { get; set; } = new List<JobRole>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<JobTemplate> JobTemplateArchivedByUsers { get; set; } = new List<JobTemplate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<JobTemplate> JobTemplateCreatedByUsers { get; set; } = new List<JobTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<JobTemplate> JobTemplateModifiedByUsers { get; set; } = new List<JobTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Lead> LeadArchivedByUsers { get; set; } = new List<Lead>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Lead> LeadCreatedByUsers { get; set; } = new List<Lead>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Lead> LeadModifiedByUsers { get; set; } = new List<Lead>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<LegalRegister1> LegalRegister1ArchivedByUsers { get; set; } = new List<LegalRegister1>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<LegalRegister1> LegalRegister1CreatedByUsers { get; set; } = new List<LegalRegister1>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<LegalRegister1> LegalRegister1ModifiedByUsers { get; set; } = new List<LegalRegister1>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<LegalRegisterAttachment1> LegalRegisterAttachment1ArchivedByUsers { get; set; } = new List<LegalRegisterAttachment1>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<LegalRegisterAttachment1> LegalRegisterAttachment1CreatedByUsers { get; set; } = new List<LegalRegisterAttachment1>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<LegalRegisterAttachment1> LegalRegisterAttachment1ModifiedByUsers { get; set; } = new List<LegalRegisterAttachment1>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<LegalRegisterLinkedRecord> LegalRegisterLinkedRecordArchivedByUsers { get; set; } = new List<LegalRegisterLinkedRecord>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<LegalRegisterLinkedRecord> LegalRegisterLinkedRecordCreatedByUsers { get; set; } = new List<LegalRegisterLinkedRecord>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<LegalRegisterLinkedRecord> LegalRegisterLinkedRecordModifiedByUsers { get; set; } = new List<LegalRegisterLinkedRecord>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Location> LocationArchivedByUsers { get; set; } = new List<Location>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Location> LocationCreatedByUsers { get; set; } = new List<Location>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Location> LocationModifiedByUsers { get; set; } = new List<Location>();

    [InverseProperty("User")]
    public virtual ICollection<LogUserLogin> LogUserLogins { get; set; } = new List<LogUserLogin>();

    [InverseProperty("User")]
    public virtual ICollection<LoginAction> LoginActions { get; set; } = new List<LoginAction>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<MainActivityType> MainActivityTypeArchivedByUsers { get; set; } = new List<MainActivityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<MainActivityType> MainActivityTypeCreatedByUsers { get; set; } = new List<MainActivityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<MainActivityType> MainActivityTypeModifiedByUsers { get; set; } = new List<MainActivityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<MainFactorType> MainFactorTypeArchivedByUsers { get; set; } = new List<MainFactorType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<MainFactorType> MainFactorTypeCreatedByUsers { get; set; } = new List<MainFactorType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<MainFactorType> MainFactorTypeModifiedByUsers { get; set; } = new List<MainFactorType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<MainIndustryType> MainIndustryTypeArchivedByUsers { get; set; } = new List<MainIndustryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<MainIndustryType> MainIndustryTypeCreatedByUsers { get; set; } = new List<MainIndustryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<MainIndustryType> MainIndustryTypeModifiedByUsers { get; set; } = new List<MainIndustryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ManagerType> ManagerTypeArchivedByUsers { get; set; } = new List<ManagerType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ManagerType> ManagerTypeCreatedByUsers { get; set; } = new List<ManagerType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ManagerType> ManagerTypeModifiedByUsers { get; set; } = new List<ManagerType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<MaritalStatusType> MaritalStatusTypeArchivedByUsers { get; set; } = new List<MaritalStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<MaritalStatusType> MaritalStatusTypeCreatedByUsers { get; set; } = new List<MaritalStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<MaritalStatusType> MaritalStatusTypeModifiedByUsers { get; set; } = new List<MaritalStatusType>();

    [ForeignKey("MasterUserAreaID")]
    [InverseProperty("Users")]
    public virtual UserArea? MasterUserArea { get; set; }

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<MobileProperty> MobilePropertyArchivedByUsers { get; set; } = new List<MobileProperty>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<MobileProperty> MobilePropertyCreatedByUsers { get; set; } = new List<MobileProperty>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<MobileProperty> MobilePropertyModifiedByUsers { get; set; } = new List<MobileProperty>();

    [InverseProperty("User")]
    public virtual ICollection<MobileProperty> MobilePropertyUsers { get; set; } = new List<MobileProperty>();

    [InverseProperty("User")]
    public virtual ICollection<MobileSubmissionDataLog> MobileSubmissionDataLogs { get; set; } = new List<MobileSubmissionDataLog>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InverseModifiedByUser")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ModuleType> ModuleTypes { get; set; } = new List<ModuleType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<NonWorkingDay> NonWorkingDayArchivedByUsers { get; set; } = new List<NonWorkingDay>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<NonWorkingDay> NonWorkingDayCreatedByUsers { get; set; } = new List<NonWorkingDay>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<NonWorkingDay> NonWorkingDayModifiedByUsers { get; set; } = new List<NonWorkingDay>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<NotWorkingCategoryType> NotWorkingCategoryTypeArchivedByUsers { get; set; } = new List<NotWorkingCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<NotWorkingCategoryType> NotWorkingCategoryTypeCreatedByUsers { get; set; } = new List<NotWorkingCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<NotWorkingCategoryType> NotWorkingCategoryTypeModifiedByUsers { get; set; } = new List<NotWorkingCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Note> NoteArchivedByUsers { get; set; } = new List<Note>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Note> NoteCreatedByUsers { get; set; } = new List<Note>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Note> NoteModifiedByUsers { get; set; } = new List<Note>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<OccupationalDiseaseType> OccupationalDiseaseTypeArchivedByUsers { get; set; } = new List<OccupationalDiseaseType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<OccupationalDiseaseType> OccupationalDiseaseTypeCreatedByUsers { get; set; } = new List<OccupationalDiseaseType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<OccupationalDiseaseType> OccupationalDiseaseTypeModifiedByUsers { get; set; } = new List<OccupationalDiseaseType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<OptionList> OptionListArchivedByUsers { get; set; } = new List<OptionList>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<OptionList> OptionListCreatedByUsers { get; set; } = new List<OptionList>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<OptionListItem> OptionListItemArchivedByUsers { get; set; } = new List<OptionListItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<OptionListItem> OptionListItemCreatedByUsers { get; set; } = new List<OptionListItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<OptionListItem> OptionListItemModifiedByUsers { get; set; } = new List<OptionListItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<OptionList> OptionListModifiedByUsers { get; set; } = new List<OptionList>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<OrgGroup> OrgGroupArchivedByUsers { get; set; } = new List<OrgGroup>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<OrgGroupCategory> OrgGroupCategoryArchivedByUsers { get; set; } = new List<OrgGroupCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<OrgGroupCategory> OrgGroupCategoryCreatedByUsers { get; set; } = new List<OrgGroupCategory>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<OrgGroupCategory> OrgGroupCategoryModifiedByUsers { get; set; } = new List<OrgGroupCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<OrgGroup> OrgGroupCreatedByUsers { get; set; } = new List<OrgGroup>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<OrgGroup> OrgGroupModifiedByUsers { get; set; } = new List<OrgGroup>();

    [InverseProperty("User")]
    public virtual ICollection<OrgGroupUser> OrgGroupUsers { get; set; } = new List<OrgGroupUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PPEType> PPETypeArchivedByUsers { get; set; } = new List<PPEType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PPEType> PPETypeCreatedByUsers { get; set; } = new List<PPEType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PPEType> PPETypeModifiedByUsers { get; set; } = new List<PPEType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PersonTitleType> PersonTitleTypeArchivedByUsers { get; set; } = new List<PersonTitleType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PersonTitleType> PersonTitleTypeCreatedByUsers { get; set; } = new List<PersonTitleType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PersonTitleType> PersonTitleTypeModifiedByUsers { get; set; } = new List<PersonTitleType>();

    [InverseProperty("User")]
    public virtual ICollection<PersonsInCharge> PersonsInCharges { get; set; } = new List<PersonsInCharge>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PlanCollection> PlanCollectionArchivedByUsers { get; set; } = new List<PlanCollection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PlanCollection> PlanCollectionCreatedByUsers { get; set; } = new List<PlanCollection>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItemArchivedByUsers { get; set; } = new List<PlanCollectionItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItemCreatedByUsers { get; set; } = new List<PlanCollectionItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItemModifiedByUsers { get; set; } = new List<PlanCollectionItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PlanCollection> PlanCollectionModifiedByUsers { get; set; } = new List<PlanCollection>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PlanCollectionType> PlanCollectionTypeArchivedByUsers { get; set; } = new List<PlanCollectionType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PlanCollectionType> PlanCollectionTypeCreatedByUsers { get; set; } = new List<PlanCollectionType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PlanCollectionType> PlanCollectionTypeModifiedByUsers { get; set; } = new List<PlanCollectionType>();

    [InverseProperty("User")]
    public virtual ICollection<PolicyAcknowledgment> PolicyAcknowledgments { get; set; } = new List<PolicyAcknowledgment>();

    [InverseProperty("ApproverUser")]
    public virtual ICollection<PolicyApprovalLog> PolicyApprovalLogs { get; set; } = new List<PolicyApprovalLog>();

    [InverseProperty("ApproverUser")]
    public virtual ICollection<Policy> PolicyApproverUsers { get; set; } = new List<Policy>();

    [InverseProperty("AuthorUser")]
    public virtual ICollection<Policy> PolicyAuthorUsers { get; set; } = new List<Policy>();

    [InverseProperty("ExemptionApprovedByNavigation")]
    public virtual ICollection<PolicyCompliance> PolicyComplianceExemptionApprovedByNavigations { get; set; } = new List<PolicyCompliance>();

    [InverseProperty("User")]
    public virtual ICollection<PolicyCompliance> PolicyComplianceUsers { get; set; } = new List<PolicyCompliance>();

    [InverseProperty("PolicyOwnerUser")]
    public virtual ICollection<Policy> PolicyPolicyOwnerUsers { get; set; } = new List<Policy>();

    [InverseProperty("PublishedByUser")]
    public virtual ICollection<Policy> PolicyPublishedByUsers { get; set; } = new List<Policy>();

    [InverseProperty("ReviewerUser")]
    public virtual ICollection<Policy> PolicyReviewerUsers { get; set; } = new List<Policy>();

    [InverseProperty("ReviewerUser")]
    public virtual ICollection<PolicyReview> PolicyReviews { get; set; } = new List<PolicyReview>();

    [InverseProperty("AssignedByUser")]
    public virtual ICollection<PolicyUserAssignment> PolicyUserAssignmentAssignedByUsers { get; set; } = new List<PolicyUserAssignment>();

    [InverseProperty("AssignedToUser")]
    public virtual ICollection<PolicyUserAssignment> PolicyUserAssignmentAssignedToUsers { get; set; } = new List<PolicyUserAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<PrintedHeader> PrintedHeaderArchivedByUsers { get; set; } = new List<PrintedHeader>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<PrintedHeader> PrintedHeaderCreatedByUsers { get; set; } = new List<PrintedHeader>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<PrintedHeader> PrintedHeaderModifiedByUsers { get; set; } = new List<PrintedHeader>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Process> ProcessArchivedByUsers { get; set; } = new List<Process>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Process> ProcessCreatedByUsers { get; set; } = new List<Process>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ProcessExecution> ProcessExecutionCreatedByUsers { get; set; } = new List<ProcessExecution>();

    [InverseProperty("StartedByUser")]
    public virtual ICollection<ProcessExecution> ProcessExecutionStartedByUsers { get; set; } = new List<ProcessExecution>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Process> ProcessModifiedByUsers { get; set; } = new List<Process>();

    [InverseProperty("CompletedByUser")]
    public virtual ICollection<ProcessStepExecution> ProcessStepExecutions { get; set; } = new List<ProcessStepExecution>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ProcessStep> ProcessSteps { get; set; } = new List<ProcessStep>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ProcessedDocument> ProcessedDocumentArchivedByUsers { get; set; } = new List<ProcessedDocument>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ProcessedDocument> ProcessedDocumentCreatedByUsers { get; set; } = new List<ProcessedDocument>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ProcessedDocument> ProcessedDocumentModifiedByUsers { get; set; } = new List<ProcessedDocument>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<QuestionAnswer> QuestionAnswerArchivedByUsers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<QuestionAnswer> QuestionAnswerCreatedByUsers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<QuestionAnswer> QuestionAnswerModifiedByUsers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Question> QuestionArchivedByUsers { get; set; } = new List<Question>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Question> QuestionCreatedByUsers { get; set; } = new List<Question>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Question> QuestionModifiedByUsers { get; set; } = new List<Question>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<QuestionResponse> QuestionResponseArchivedByUsers { get; set; } = new List<QuestionResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<QuestionResponse> QuestionResponseCreatedByUsers { get; set; } = new List<QuestionResponse>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<QuestionResponse> QuestionResponseModifiedByUsers { get; set; } = new List<QuestionResponse>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Questionnaire> QuestionnaireArchivedByUsers { get; set; } = new List<Questionnaire>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Questionnaire> QuestionnaireCreatedByUsers { get; set; } = new List<Questionnaire>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Questionnaire> QuestionnaireModifiedByUsers { get; set; } = new List<Questionnaire>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponseArchivedByUsers { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponseCreatedByUsers { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponseModifiedByUsers { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<QuestionnaireResponseNote> QuestionnaireResponseNoteArchivedByUsers { get; set; } = new List<QuestionnaireResponseNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<QuestionnaireResponseNote> QuestionnaireResponseNoteCreatedByUsers { get; set; } = new List<QuestionnaireResponseNote>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSectionArchivedByUsers { get; set; } = new List<QuestionnaireSection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSectionCreatedByUsers { get; set; } = new List<QuestionnaireSection>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<QuestionnaireSection> QuestionnaireSectionModifiedByUsers { get; set; } = new List<QuestionnaireSection>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RIDDORSubmission> RIDDORSubmissionArchivedByUsers { get; set; } = new List<RIDDORSubmission>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RIDDORSubmission> RIDDORSubmissionCreatedByUsers { get; set; } = new List<RIDDORSubmission>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RIDDORSubmission> RIDDORSubmissionModifiedByUsers { get; set; } = new List<RIDDORSubmission>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RecruitmentType> RecruitmentTypeArchivedByUsers { get; set; } = new List<RecruitmentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RecruitmentType> RecruitmentTypeCreatedByUsers { get; set; } = new List<RecruitmentType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RecruitmentType> RecruitmentTypeModifiedByUsers { get; set; } = new List<RecruitmentType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RecruitmentVacancy> RecruitmentVacancyArchivedByUsers { get; set; } = new List<RecruitmentVacancy>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RecruitmentVacancy> RecruitmentVacancyCreatedByUsers { get; set; } = new List<RecruitmentVacancy>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RecruitmentVacancyInterview> RecruitmentVacancyInterviewArchivedByUsers { get; set; } = new List<RecruitmentVacancyInterview>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RecruitmentVacancyInterview> RecruitmentVacancyInterviewCreatedByUsers { get; set; } = new List<RecruitmentVacancyInterview>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RecruitmentVacancyInterview> RecruitmentVacancyInterviewModifiedByUsers { get; set; } = new List<RecruitmentVacancyInterview>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RecruitmentVacancy> RecruitmentVacancyModifiedByUsers { get; set; } = new List<RecruitmentVacancy>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RefreshToken> RefreshTokenCreatedByUsers { get; set; } = new List<RefreshToken>();

    [InverseProperty("User")]
    public virtual ICollection<RefreshToken> RefreshTokenUsers { get; set; } = new List<RefreshToken>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RequirementType> RequirementTypeArchivedByUsers { get; set; } = new List<RequirementType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RequirementType> RequirementTypeCreatedByUsers { get; set; } = new List<RequirementType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RequirementType> RequirementTypeModifiedByUsers { get; set; } = new List<RequirementType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Resource> ResourceArchivedByUsers { get; set; } = new List<Resource>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Resource> ResourceCreatedByUsers { get; set; } = new List<Resource>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ResourceCreditLimit> ResourceCreditLimitArchivedByUsers { get; set; } = new List<ResourceCreditLimit>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ResourceCreditLimit> ResourceCreditLimitCreatedByUsers { get; set; } = new List<ResourceCreditLimit>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ResourceCreditLimit> ResourceCreditLimitModifiedByUsers { get; set; } = new List<ResourceCreditLimit>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Resource> ResourceModifiedByUsers { get; set; } = new List<Resource>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItemArchivedByUsers { get; set; } = new List<RiskAssessmentAffectedItem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItemCreatedByUsers { get; set; } = new List<RiskAssessmentAffectedItem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItemModifiedByUsers { get; set; } = new List<RiskAssessmentAffectedItem>();

    [InverseProperty("ApproverUser")]
    public virtual ICollection<RiskAssessmentApprovalLog> RiskAssessmentApprovalLogs { get; set; } = new List<RiskAssessmentApprovalLog>();

    [InverseProperty("ApprovedByUser")]
    public virtual ICollection<RiskAssessment> RiskAssessmentApprovedByUsers { get; set; } = new List<RiskAssessment>();

    [InverseProperty("AssessedByUser")]
    public virtual ICollection<RiskAssessment> RiskAssessmentAssessedByUsers { get; set; } = new List<RiskAssessment>();

    [InverseProperty("ResponsiblePerson")]
    public virtual ICollection<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; } = new List<RiskAssessmentControlMeasure>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskAssessmentConversion> RiskAssessmentConversionArchivedByUsers { get; set; } = new List<RiskAssessmentConversion>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskAssessmentConversion> RiskAssessmentConversionCreatedByUsers { get; set; } = new List<RiskAssessmentConversion>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypeArchivedByUsers { get; set; } = new List<RiskAssessmentFieldType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypeCreatedByUsers { get; set; } = new List<RiskAssessmentFieldType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypeModifiedByUsers { get; set; } = new List<RiskAssessmentFieldType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypeArchivedByUsers { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypeCreatedByUsers { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypeModifiedByUsers { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventArchivedByUsers { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventCreatedByUsers { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventModifiedByUsers { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("ReviewedByUser")]
    public virtual ICollection<RiskAssessment> RiskAssessmentReviewedByUsers { get; set; } = new List<RiskAssessment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RiskSafetyPhrase> RiskSafetyPhraseArchivedByUsers { get; set; } = new List<RiskSafetyPhrase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RiskSafetyPhrase> RiskSafetyPhraseCreatedByUsers { get; set; } = new List<RiskSafetyPhrase>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RiskSafetyPhrase> RiskSafetyPhraseModifiedByUsers { get; set; } = new List<RiskSafetyPhrase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Role> RoleArchivedByUsers { get; set; } = new List<Role>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Role> RoleCreatedByUsers { get; set; } = new List<Role>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Role> RoleModifiedByUsers { get; set; } = new List<Role>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RootCauseCategoryType> RootCauseCategoryTypeArchivedByUsers { get; set; } = new List<RootCauseCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RootCauseCategoryType> RootCauseCategoryTypeCreatedByUsers { get; set; } = new List<RootCauseCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RootCauseCategoryType> RootCauseCategoryTypeModifiedByUsers { get; set; } = new List<RootCauseCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<RootCauseType> RootCauseTypeArchivedByUsers { get; set; } = new List<RootCauseType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<RootCauseType> RootCauseTypeCreatedByUsers { get; set; } = new List<RootCauseType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<RootCauseType> RootCauseTypeModifiedByUsers { get; set; } = new List<RootCauseType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SCORMPackage> SCORMPackageArchivedByUsers { get; set; } = new List<SCORMPackage>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SCORMPackage> SCORMPackageCreatedByUsers { get; set; } = new List<SCORMPackage>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SCORMPackage> SCORMPackageModifiedByUsers { get; set; } = new List<SCORMPackage>();

    [InverseProperty("ApproverUser")]
    public virtual ICollection<SSOWApprovalLog> SSOWApprovalLogs { get; set; } = new List<SSOWApprovalLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorkArchivedByUsers { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorkCreatedByUsers { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("LoggedByUser")]
    public virtual ICollection<SafeSystemOfWorkLog> SafeSystemOfWorkLogs { get; set; } = new List<SafeSystemOfWorkLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorkModifiedByUsers { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplateArchivedByUsers { get; set; } = new List<SafeSystemOfWorkTemplate>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplateCreatedByUsers { get; set; } = new List<SafeSystemOfWorkTemplate>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplateModifiedByUsers { get; set; } = new List<SafeSystemOfWorkTemplate>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SafeSystemOfWorkType> SafeSystemOfWorkTypeArchivedByUsers { get; set; } = new List<SafeSystemOfWorkType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SafeSystemOfWorkType> SafeSystemOfWorkTypeCreatedByUsers { get; set; } = new List<SafeSystemOfWorkType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SafeSystemOfWorkType> SafeSystemOfWorkTypeModifiedByUsers { get; set; } = new List<SafeSystemOfWorkType>();

    [InverseProperty("AuthorUser")]
    public virtual ICollection<SafeWorkingProcedure> SafeWorkingProcedures { get; set; } = new List<SafeWorkingProcedure>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ScheduledEvent> ScheduledEvents { get; set; } = new List<ScheduledEvent>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ScheduledJob> ScheduledJobArchivedByUsers { get; set; } = new List<ScheduledJob>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ScheduledJob> ScheduledJobCreatedByUsers { get; set; } = new List<ScheduledJob>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ScheduledJob> ScheduledJobModifiedByUsers { get; set; } = new List<ScheduledJob>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SectorType> SectorTypeArchivedByUsers { get; set; } = new List<SectorType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SectorType> SectorTypeCreatedByUsers { get; set; } = new List<SectorType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SectorType> SectorTypeModifiedByUsers { get; set; } = new List<SectorType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SeverityOfInjuryType> SeverityOfInjuryTypeArchivedByUsers { get; set; } = new List<SeverityOfInjuryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SeverityOfInjuryType> SeverityOfInjuryTypeCreatedByUsers { get; set; } = new List<SeverityOfInjuryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SeverityOfInjuryType> SeverityOfInjuryTypeModifiedByUsers { get; set; } = new List<SeverityOfInjuryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SeverityType> SeverityTypeArchivedByUsers { get; set; } = new List<SeverityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SeverityType> SeverityTypeCreatedByUsers { get; set; } = new List<SeverityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SeverityType> SeverityTypeModifiedByUsers { get; set; } = new List<SeverityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ShortcutSystem> ShortcutSystemArchivedByUsers { get; set; } = new List<ShortcutSystem>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ShortcutSystem> ShortcutSystemCreatedByUsers { get; set; } = new List<ShortcutSystem>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ShortcutSystem> ShortcutSystemModifiedByUsers { get; set; } = new List<ShortcutSystem>();

    [InverseProperty("User")]
    public virtual ICollection<ShortcutSystemUser> ShortcutSystemUsers { get; set; } = new List<ShortcutSystemUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<ShortcutUserFavourite> ShortcutUserFavouriteArchivedByUsers { get; set; } = new List<ShortcutUserFavourite>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<ShortcutUserFavourite> ShortcutUserFavouriteCreatedByUsers { get; set; } = new List<ShortcutUserFavourite>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<ShortcutUserFavourite> ShortcutUserFavouriteModifiedByUsers { get; set; } = new List<ShortcutUserFavourite>();

    [InverseProperty("User")]
    public virtual ICollection<ShortcutUserFavourite> ShortcutUserFavouriteUsers { get; set; } = new List<ShortcutUserFavourite>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SicknessStatusType> SicknessStatusTypeArchivedByUsers { get; set; } = new List<SicknessStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SicknessStatusType> SicknessStatusTypeCreatedByUsers { get; set; } = new List<SicknessStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SicknessStatusType> SicknessStatusTypeModifiedByUsers { get; set; } = new List<SicknessStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<SourceStaticDatum> SourceStaticDatumArchivedByUsers { get; set; } = new List<SourceStaticDatum>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<SourceStaticDatum> SourceStaticDatumCreatedByUsers { get; set; } = new List<SourceStaticDatum>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<SourceStaticDatum> SourceStaticDatumModifiedByUsers { get; set; } = new List<SourceStaticDatum>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Supplier> SupplierArchivedByUsers { get; set; } = new List<Supplier>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Supplier> SupplierCreatedByUsers { get; set; } = new List<Supplier>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Supplier> SupplierModifiedByUsers { get; set; } = new List<Supplier>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TagType> TagTypeArchivedByUsers { get; set; } = new List<TagType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TagType> TagTypeCreatedByUsers { get; set; } = new List<TagType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TagType> TagTypeModifiedByUsers { get; set; } = new List<TagType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskActivity> TaskActivityArchivedByUsers { get; set; } = new List<TaskActivity>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskActivity> TaskActivityCreatedByUsers { get; set; } = new List<TaskActivity>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskActivity> TaskActivityModifiedByUsers { get; set; } = new List<TaskActivity>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskAssignableUser> TaskAssignableUserArchivedByUsers { get; set; } = new List<TaskAssignableUser>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskAssignableUser> TaskAssignableUserCreatedByUsers { get; set; } = new List<TaskAssignableUser>();

    [InverseProperty("User")]
    public virtual ICollection<TaskAssignableUser> TaskAssignableUserUsers { get; set; } = new List<TaskAssignableUser>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskAssignment> TaskAssignmentArchivedByUsers { get; set; } = new List<TaskAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskAssignment> TaskAssignmentCreatedByUsers { get; set; } = new List<TaskAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskAssignmentLog> TaskAssignmentLogArchivedByUsers { get; set; } = new List<TaskAssignmentLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskAssignmentLog> TaskAssignmentLogCreatedByUsers { get; set; } = new List<TaskAssignmentLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskAssignment> TaskAssignmentModifiedByUsers { get; set; } = new List<TaskAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskAttachment> TaskAttachmentArchivedByUsers { get; set; } = new List<TaskAttachment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskAttachment> TaskAttachmentCreatedByUsers { get; set; } = new List<TaskAttachment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskCategoryType> TaskCategoryTypeArchivedByUsers { get; set; } = new List<TaskCategoryType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskCategoryType> TaskCategoryTypeCreatedByUsers { get; set; } = new List<TaskCategoryType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskCategoryType> TaskCategoryTypeModifiedByUsers { get; set; } = new List<TaskCategoryType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskClassificationType> TaskClassificationTypeArchivedByUsers { get; set; } = new List<TaskClassificationType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskClassificationType> TaskClassificationTypeCreatedByUsers { get; set; } = new List<TaskClassificationType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskClassificationType> TaskClassificationTypeModifiedByUsers { get; set; } = new List<TaskClassificationType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskNote> TaskNoteArchivedByUsers { get; set; } = new List<TaskNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskNote> TaskNoteCreatedByUsers { get; set; } = new List<TaskNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskReassignmentLog> TaskReassignmentLogs { get; set; } = new List<TaskReassignmentLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskSchedule> TaskScheduleArchivedByUsers { get; set; } = new List<TaskSchedule>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskSchedule> TaskScheduleCreatedByUsers { get; set; } = new List<TaskSchedule>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskSchedule> TaskScheduleModifiedByUsers { get; set; } = new List<TaskSchedule>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskStatusType> TaskStatusTypeArchivedByUsers { get; set; } = new List<TaskStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskStatusType> TaskStatusTypeCreatedByUsers { get; set; } = new List<TaskStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskStatusType> TaskStatusTypeModifiedByUsers { get; set; } = new List<TaskStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TaskType> TaskTypeArchivedByUsers { get; set; } = new List<TaskType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TaskType> TaskTypeCreatedByUsers { get; set; } = new List<TaskType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TaskType> TaskTypeModifiedByUsers { get; set; } = new List<TaskType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlockApprovalLog> TextBlockApprovalLogArchivedByUsers { get; set; } = new List<TextBlockApprovalLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockApprovalLog> TextBlockApprovalLogCreatedByUsers { get; set; } = new List<TextBlockApprovalLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlockApprovalLog> TextBlockApprovalLogModifiedByUsers { get; set; } = new List<TextBlockApprovalLog>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlock> TextBlockArchivedByUsers { get; set; } = new List<TextBlock>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlockCategory> TextBlockCategoryArchivedByUsers { get; set; } = new List<TextBlockCategory>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockCategory> TextBlockCategoryCreatedByUsers { get; set; } = new List<TextBlockCategory>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlockCategory> TextBlockCategoryModifiedByUsers { get; set; } = new List<TextBlockCategory>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlockCollection> TextBlockCollectionArchivedByUsers { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockCollection> TextBlockCollectionCreatedByUsers { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlockCollection> TextBlockCollectionModifiedByUsers { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockCourse> TextBlockCourses { get; set; } = new List<TextBlockCourse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlock> TextBlockCreatedByUsers { get; set; } = new List<TextBlock>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlock> TextBlockModifiedByUsers { get; set; } = new List<TextBlock>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSectionArchivedByUsers { get; set; } = new List<TextBlockQuestionnaireSection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSectionCreatedByUsers { get; set; } = new List<TextBlockQuestionnaireSection>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSectionModifiedByUsers { get; set; } = new List<TextBlockQuestionnaireSection>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TextBlockSection> TextBlockSectionArchivedByUsers { get; set; } = new List<TextBlockSection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TextBlockSection> TextBlockSectionCreatedByUsers { get; set; } = new List<TextBlockSection>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TextBlockSection> TextBlockSectionModifiedByUsers { get; set; } = new List<TextBlockSection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Theme> ThemeCreatedByUsers { get; set; } = new List<Theme>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Theme> ThemeModifiedByUsers { get; set; } = new List<Theme>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCase> TribunalCaseArchivedByUsers { get; set; } = new List<TribunalCase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseAttachmentNote> TribunalCaseAttachmentNotes { get; set; } = new List<TribunalCaseAttachmentNote>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseAttachmentTagType> TribunalCaseAttachmentTagTypes { get; set; } = new List<TribunalCaseAttachmentTagType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseAttachmentType> TribunalCaseAttachmentTypeArchivedByUsers { get; set; } = new List<TribunalCaseAttachmentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseAttachmentType> TribunalCaseAttachmentTypeCreatedByUsers { get; set; } = new List<TribunalCaseAttachmentType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseAttachmentType> TribunalCaseAttachmentTypeModifiedByUsers { get; set; } = new List<TribunalCaseAttachmentType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContactArchivedByUsers { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContactCreatedByUsers { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContactModifiedByUsers { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("User")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContactUsers { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounselArchivedByUsers { get; set; } = new List<TribunalCaseCounsel>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounselCreatedByUsers { get; set; } = new List<TribunalCaseCounsel>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounselModifiedByUsers { get; set; } = new List<TribunalCaseCounsel>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCase> TribunalCaseCreatedByUsers { get; set; } = new List<TribunalCase>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseDistribution> TribunalCaseDistributionCreatedByUsers { get; set; } = new List<TribunalCaseDistribution>();

    [InverseProperty("User")]
    public virtual ICollection<TribunalCaseDistribution> TribunalCaseDistributionUsers { get; set; } = new List<TribunalCaseDistribution>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseEvent> TribunalCaseEventArchivedByUsers { get; set; } = new List<TribunalCaseEvent>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseEvent> TribunalCaseEventCreatedByUsers { get; set; } = new List<TribunalCaseEvent>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseEvent> TribunalCaseEventModifiedByUsers { get; set; } = new List<TribunalCaseEvent>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseEventType> TribunalCaseEventTypeArchivedByUsers { get; set; } = new List<TribunalCaseEventType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseEventType> TribunalCaseEventTypeCreatedByUsers { get; set; } = new List<TribunalCaseEventType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseEventType> TribunalCaseEventTypeModifiedByUsers { get; set; } = new List<TribunalCaseEventType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCase> TribunalCaseModifiedByUsers { get; set; } = new List<TribunalCase>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCasePersonType> TribunalCasePersonTypeArchivedByUsers { get; set; } = new List<TribunalCasePersonType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCasePersonType> TribunalCasePersonTypeCreatedByUsers { get; set; } = new List<TribunalCasePersonType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCasePersonType> TribunalCasePersonTypeModifiedByUsers { get; set; } = new List<TribunalCasePersonType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseSeverityType> TribunalCaseSeverityTypeArchivedByUsers { get; set; } = new List<TribunalCaseSeverityType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseSeverityType> TribunalCaseSeverityTypeCreatedByUsers { get; set; } = new List<TribunalCaseSeverityType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseSeverityType> TribunalCaseSeverityTypeModifiedByUsers { get; set; } = new List<TribunalCaseSeverityType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseStatusType> TribunalCaseStatusTypeArchivedByUsers { get; set; } = new List<TribunalCaseStatusType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseStatusType> TribunalCaseStatusTypeCreatedByUsers { get; set; } = new List<TribunalCaseStatusType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseStatusType> TribunalCaseStatusTypeModifiedByUsers { get; set; } = new List<TribunalCaseStatusType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypeArchivedByUsers { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypeCreatedByUsers { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypeModifiedByUsers { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<TribunalCaseType> TribunalCaseTypeArchivedByUsers { get; set; } = new List<TribunalCaseType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<TribunalCaseType> TribunalCaseTypeCreatedByUsers { get; set; } = new List<TribunalCaseType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<TribunalCaseType> TribunalCaseTypeModifiedByUsers { get; set; } = new List<TribunalCaseType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Update> UpdateArchivedByUsers { get; set; } = new List<Update>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Update> UpdateCreatedByUsers { get; set; } = new List<Update>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Update> UpdateModifiedByUsers { get; set; } = new List<Update>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaAccidentTag> UserAreaAccidentTagArchivedByUsers { get; set; } = new List<UserAreaAccidentTag>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaAccidentTag> UserAreaAccidentTagCreatedByUsers { get; set; } = new List<UserAreaAccidentTag>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaAccidentTag> UserAreaAccidentTagModifiedByUsers { get; set; } = new List<UserAreaAccidentTag>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserArea> UserAreaArchivedByUsers { get; set; } = new List<UserArea>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaContractor> UserAreaContractorArchivedByUsers { get; set; } = new List<UserAreaContractor>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaContractor> UserAreaContractorCreatedByUsers { get; set; } = new List<UserAreaContractor>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaContractor> UserAreaContractorModifiedByUsers { get; set; } = new List<UserAreaContractor>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserArea> UserAreaCreatedByUsers { get; set; } = new List<UserArea>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaCredit> UserAreaCreditArchivedByUsers { get; set; } = new List<UserAreaCredit>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaCredit> UserAreaCreditCreatedByUsers { get; set; } = new List<UserAreaCredit>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogArchivedByUsers { get; set; } = new List<UserAreaCreditLog>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogCreatedByUsers { get; set; } = new List<UserAreaCreditLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaCreditLog> UserAreaCreditLogModifiedByUsers { get; set; } = new List<UserAreaCreditLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaCredit> UserAreaCreditModifiedByUsers { get; set; } = new List<UserAreaCredit>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaDivision> UserAreaDivisionArchivedByUsers { get; set; } = new List<UserAreaDivision>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaDivision> UserAreaDivisionCreatedByUsers { get; set; } = new List<UserAreaDivision>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaDivision> UserAreaDivisionModifiedByUsers { get; set; } = new List<UserAreaDivision>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaForm> UserAreaFormArchivedByUsers { get; set; } = new List<UserAreaForm>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaForm> UserAreaFormCreatedByUsers { get; set; } = new List<UserAreaForm>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaForm> UserAreaFormModifiedByUsers { get; set; } = new List<UserAreaForm>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswerArchivedByUsers { get; set; } = new List<UserAreaFormQuestionAnswer>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswerCreatedByUsers { get; set; } = new List<UserAreaFormQuestionAnswer>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaFormQuestionAnswer> UserAreaFormQuestionAnswerModifiedByUsers { get; set; } = new List<UserAreaFormQuestionAnswer>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaFormQuestion> UserAreaFormQuestionArchivedByUsers { get; set; } = new List<UserAreaFormQuestion>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaFormQuestion> UserAreaFormQuestionCreatedByUsers { get; set; } = new List<UserAreaFormQuestion>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaFormQuestion> UserAreaFormQuestionModifiedByUsers { get; set; } = new List<UserAreaFormQuestion>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponseArchivedByUsers { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponseCreatedByUsers { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponseModifiedByUsers { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaFormSection> UserAreaFormSectionArchivedByUsers { get; set; } = new List<UserAreaFormSection>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaFormSection> UserAreaFormSectionCreatedByUsers { get; set; } = new List<UserAreaFormSection>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaFormSection> UserAreaFormSectionModifiedByUsers { get; set; } = new List<UserAreaFormSection>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaFormType> UserAreaFormTypeArchivedByUsers { get; set; } = new List<UserAreaFormType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaFormType> UserAreaFormTypeCreatedByUsers { get; set; } = new List<UserAreaFormType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaFormType> UserAreaFormTypeModifiedByUsers { get; set; } = new List<UserAreaFormType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaHRCost> UserAreaHRCostCreatedByUsers { get; set; } = new List<UserAreaHRCost>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaHRCostLog> UserAreaHRCostLogs { get; set; } = new List<UserAreaHRCostLog>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaHRCost> UserAreaHRCostModifiedByUsers { get; set; } = new List<UserAreaHRCost>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaHRCostTransaction> UserAreaHRCostTransactionArchivedByUsers { get; set; } = new List<UserAreaHRCostTransaction>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaHRCostTransaction> UserAreaHRCostTransactionCreatedByUsers { get; set; } = new List<UserAreaHRCostTransaction>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaHRCostTransaction> UserAreaHRCostTransactionModifiedByUsers { get; set; } = new List<UserAreaHRCostTransaction>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserArea> UserAreaModifiedByUsers { get; set; } = new List<UserArea>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaMonitoringLevel> UserAreaMonitoringLevelArchivedByUsers { get; set; } = new List<UserAreaMonitoringLevel>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaMonitoringLevel> UserAreaMonitoringLevelCreatedByUsers { get; set; } = new List<UserAreaMonitoringLevel>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaMonitoringLevel> UserAreaMonitoringLevelModifiedByUsers { get; set; } = new List<UserAreaMonitoringLevel>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaMonitoringMailingList> UserAreaMonitoringMailingListArchivedByUsers { get; set; } = new List<UserAreaMonitoringMailingList>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaMonitoringMailingList> UserAreaMonitoringMailingListCreatedByUsers { get; set; } = new List<UserAreaMonitoringMailingList>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaMonitoringMailingList> UserAreaMonitoringMailingListModifiedByUsers { get; set; } = new List<UserAreaMonitoringMailingList>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReportArchivedByUsers { get; set; } = new List<UserAreaMonitoringReport>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReportCreatedByUsers { get; set; } = new List<UserAreaMonitoringReport>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReportModifiedByUsers { get; set; } = new List<UserAreaMonitoringReport>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettingArchivedByUsers { get; set; } = new List<UserAreaRiskAssessmentSetting>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettingCreatedByUsers { get; set; } = new List<UserAreaRiskAssessmentSetting>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettingModifiedByUsers { get; set; } = new List<UserAreaRiskAssessmentSetting>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypeArchivedByUsers { get; set; } = new List<UserAreaRiskAssessmentType>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypeCreatedByUsers { get; set; } = new List<UserAreaRiskAssessmentType>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypeModifiedByUsers { get; set; } = new List<UserAreaRiskAssessmentType>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserAreaTextBlock> UserAreaTextBlockArchivedByUsers { get; set; } = new List<UserAreaTextBlock>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserAreaTextBlock> UserAreaTextBlockCreatedByUsers { get; set; } = new List<UserAreaTextBlock>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserAreaTextBlock> UserAreaTextBlockModifiedByUsers { get; set; } = new List<UserAreaTextBlock>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserCaseManagementSetting> UserCaseManagementSettingCreatedByUsers { get; set; } = new List<UserCaseManagementSetting>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserCaseManagementSetting> UserCaseManagementSettingModifiedByUsers { get; set; } = new List<UserCaseManagementSetting>();

    [InverseProperty("User")]
    public virtual ICollection<UserCaseManagementSetting> UserCaseManagementSettingUsers { get; set; } = new List<UserCaseManagementSetting>();

    [InverseProperty("User")]
    public virtual ICollection<UserConfiguration> UserConfigurations { get; set; } = new List<UserConfiguration>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserContact> UserContactArchivedByUsers { get; set; } = new List<UserContact>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserContact> UserContactCreatedByUsers { get; set; } = new List<UserContact>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserContact> UserContactModifiedByUsers { get; set; } = new List<UserContact>();

    [InverseProperty("User")]
    public virtual ICollection<UserContact> UserContactUsers { get; set; } = new List<UserContact>();

    [InverseProperty("User")]
    public virtual ICollection<UserEmulator> UserEmulators { get; set; } = new List<UserEmulator>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklistArchivedByUsers { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklistCreatedByUsers { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklistModifiedByUsers { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessmentArchivedByUsers { get; set; } = new List<UserFavouriteRiskAssessment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessmentCreatedByUsers { get; set; } = new List<UserFavouriteRiskAssessment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessmentModifiedByUsers { get; set; } = new List<UserFavouriteRiskAssessment>();

    [InverseProperty("User")]
    public virtual ICollection<UserFilterSetting> UserFilterSettings { get; set; } = new List<UserFilterSetting>();

    [InverseProperty("User")]
    public virtual ICollection<UserPasswordHistory> UserPasswordHistories { get; set; } = new List<UserPasswordHistory>();

    [InverseProperty("User")]
    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    [InverseProperty("User")]
    public virtual ICollection<UserSystemProductType> UserSystemProductTypes { get; set; } = new List<UserSystemProductType>();

    [InverseProperty("User")]
    public virtual ICollection<UserTenant> UserTenants { get; set; } = new List<UserTenant>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserTextBlock> UserTextBlockArchivedByUsers { get; set; } = new List<UserTextBlock>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserTextBlock> UserTextBlockCreatedByUsers { get; set; } = new List<UserTextBlock>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserTextBlock> UserTextBlockModifiedByUsers { get; set; } = new List<UserTextBlock>();

    [InverseProperty("User")]
    public virtual ICollection<UserTextBlock> UserTextBlockUsers { get; set; } = new List<UserTextBlock>();

    [InverseProperty("User")]
    public virtual ICollection<UserTwoStepAuthToken> UserTwoStepAuthTokens { get; set; } = new List<UserTwoStepAuthToken>();

    [InverseProperty("User")]
    public virtual ICollection<UserUserAreaDivision> UserUserAreaDivisions { get; set; } = new List<UserUserAreaDivision>();

    [InverseProperty("User")]
    public virtual ICollection<UserUserArea> UserUserAreas { get; set; } = new List<UserUserArea>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklistArchivedByUsers { get; set; } = new List<UserWebFavouriteChecklist>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklistCreatedByUsers { get; set; } = new List<UserWebFavouriteChecklist>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklistModifiedByUsers { get; set; } = new List<UserWebFavouriteChecklist>();

    [InverseProperty("User")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklistUsers { get; set; } = new List<UserWebFavouriteChecklist>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<WalkAdhocEmployee> WalkAdhocEmployeeArchivedByUsers { get; set; } = new List<WalkAdhocEmployee>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<WalkAdhocEmployee> WalkAdhocEmployeeCreatedByUsers { get; set; } = new List<WalkAdhocEmployee>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<WalkAdhocEmployee> WalkAdhocEmployeeModifiedByUsers { get; set; } = new List<WalkAdhocEmployee>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<Walk> WalkArchivedByUsers { get; set; } = new List<Walk>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentArchivedByUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentCreatedByUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<WalkAssignment> WalkAssignmentModifiedByUsers { get; set; } = new List<WalkAssignment>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<WalkCheckpoint> WalkCheckpointArchivedByUsers { get; set; } = new List<WalkCheckpoint>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<WalkCheckpoint> WalkCheckpointCreatedByUsers { get; set; } = new List<WalkCheckpoint>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<WalkCheckpoint> WalkCheckpointModifiedByUsers { get; set; } = new List<WalkCheckpoint>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<WalkCheckpointResponse> WalkCheckpointResponseArchivedByUsers { get; set; } = new List<WalkCheckpointResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<WalkCheckpointResponse> WalkCheckpointResponseCreatedByUsers { get; set; } = new List<WalkCheckpointResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<Walk> WalkCreatedByUsers { get; set; } = new List<Walk>();

    [InverseProperty("ModifiedByUser")]
    public virtual ICollection<Walk> WalkModifiedByUsers { get; set; } = new List<Walk>();

    [InverseProperty("ArchivedByUser")]
    public virtual ICollection<WalkResponse> WalkResponseArchivedByUsers { get; set; } = new List<WalkResponse>();

    [InverseProperty("CreatedByUser")]
    public virtual ICollection<WalkResponse> WalkResponseCreatedByUsers { get; set; } = new List<WalkResponse>();

    [InverseProperty("ApproverUser")]
    public virtual ICollection<WorkInstruction> WorkInstructionApproverUsers { get; set; } = new List<WorkInstruction>();

    [InverseProperty("AuthorUser")]
    public virtual ICollection<WorkInstruction> WorkInstructionAuthorUsers { get; set; } = new List<WorkInstruction>();

    [InverseProperty("PublishedByUser")]
    public virtual ICollection<WorkInstruction> WorkInstructionPublishedByUsers { get; set; } = new List<WorkInstruction>();

    [InverseProperty("ReviewerUser")]
    public virtual ICollection<WorkInstruction> WorkInstructionReviewerUsers { get; set; } = new List<WorkInstruction>();
}
