using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Attachment", Schema = "V7")]
public partial class Attachment
{
    [Key]
    public int AttachmentID { get; set; }

    [StringLength(250)]
    public string? AttachmentGuidName { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string AttachmentType { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSizeBytes { get; set; }

    [StringLength(100)]
    public string ContentType { get; set; } = null!;

    public bool IsPublic { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("Attachment")]
    public virtual ICollection<AbsenceAttachment> AbsenceAttachments { get; set; } = new List<AbsenceAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AttachmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("SitePlanAttachment")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlans { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("ParentAttachment")]
    public virtual ICollection<AttachmentChild> AttachmentChildren { get; set; } = new List<AttachmentChild>();

    [InverseProperty("Attachment")]
    public virtual ICollection<AttachmentLocation> AttachmentLocations { get; set; } = new List<AttachmentLocation>();

    [InverseProperty("Attachment")]
    public virtual ICollection<AttachmentUserArea> AttachmentUserAreas { get; set; } = new List<AttachmentUserArea>();

    [InverseProperty("CompletedBySignatureAttachment")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("Attachment")]
    public virtual ICollection<CaseAttachment> CaseAttachments { get; set; } = new List<CaseAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<ContactAttachment> ContactAttachments { get; set; } = new List<ContactAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<ContractorCompanyAttachment> ContractorCompanyAttachments { get; set; } = new List<ContractorCompanyAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPs { get; set; } = new List<ContractorCompanySSIP>();

    [InverseProperty("Attachment")]
    public virtual ICollection<ContractorCompetencyAttachment> ContractorCompetencyAttachments { get; set; } = new List<ContractorCompetencyAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<CourseAttachment> CourseAttachments { get; set; } = new List<CourseAttachment>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AttachmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Attachment")]
    public virtual ICollection<EmployeeAttachment> EmployeeAttachments { get; set; } = new List<EmployeeAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<EmployeeQualification> EmployeeQualifications { get; set; } = new List<EmployeeQualification>();

    [InverseProperty("ProfileAttachment")]
    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    [InverseProperty("Attachment")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("SelfAssessmentAttachment")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetings { get; set; } = new List<HRCaseMeeting>();

    [InverseProperty("Attachment")]
    public virtual ICollection<HazardReportAttachment> HazardReportAttachments { get; set; } = new List<HazardReportAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<LegalRegisterAttachment1> LegalRegisterAttachment1s { get; set; } = new List<LegalRegisterAttachment1>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AttachmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Attachment")]
    public virtual ICollection<PolicyAttachment> PolicyAttachments { get; set; } = new List<PolicyAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<PrintedHeader> PrintedHeaders { get; set; } = new List<PrintedHeader>();

    [InverseProperty("DocumentAttachment")]
    public virtual ICollection<ProcessedDocument> ProcessedDocuments { get; set; } = new List<ProcessedDocument>();

    [InverseProperty("Attachment")]
    public virtual ICollection<QuestionResponse> QuestionResponses { get; set; } = new List<QuestionResponse>();

    [InverseProperty("Attachment")]
    public virtual ICollection<QuestionnaireResponseAttachment> QuestionnaireResponseAttachments { get; set; } = new List<QuestionnaireResponseAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("Attachment")]
    public virtual ICollection<RecruitmentVacancyAttachment> RecruitmentVacancyAttachments { get; set; } = new List<RecruitmentVacancyAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<RiskAssessmentAttachment> RiskAssessmentAttachments { get; set; } = new List<RiskAssessmentAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<SSOWAttachment> SSOWAttachments { get; set; } = new List<SSOWAttachment>();

    [InverseProperty("PermitAttachment")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("Attachment")]
    public virtual ICollection<TaskAttachment> TaskAttachments { get; set; } = new List<TaskAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<TextBlockAttachment> TextBlockAttachments { get; set; } = new List<TextBlockAttachment>();

    [InverseProperty("LogoAttachment")]
    public virtual ICollection<Theme> Themes { get; set; } = new List<Theme>();

    [InverseProperty("Attachment")]
    public virtual ICollection<TribunalCaseAttachment> TribunalCaseAttachments { get; set; } = new List<TribunalCaseAttachment>();

    [InverseProperty("Attachment")]
    public virtual ICollection<VideoCaption> VideoCaptionAttachments { get; set; } = new List<VideoCaption>();

    [InverseProperty("CaptionAttachment")]
    public virtual ICollection<VideoCaption> VideoCaptionCaptionAttachments { get; set; } = new List<VideoCaption>();
}
