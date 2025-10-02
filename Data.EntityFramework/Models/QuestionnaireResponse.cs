using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireResponse", Schema = "V7")]
[Index("ArchivedDate", "IsFinished", "UserAreaID", Name = "IX_QuestionnaireResponse_Complex")]
[Index("QuestionnaireID", "ChecklistEnrolmentID", "UserAreaID", "ArchivedDate", "CourseEnrolmentID", Name = "IX_QuestionnaireResponse_QuestionnaireID_ChecklistEnrolmentID_UserAreaID_ArchivedDate_CourseEnrolmentID")]
[Index("QuestionnaireID", "UserAreaID", "ArchivedDate", Name = "IX_QuestionnaireResponse_QuestionnaireID_UserAreaID_ArchivedDate_includes")]
public partial class QuestionnaireResponse
{
    [Key]
    public int QuestionnaireResponseID { get; set; }

    public int? OriginalQuestionnaireResponseID { get; set; }

    public int QuestionnaireID { get; set; }

    public bool IsFinished { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    public int? CurrentQuestionnaireSectionID { get; set; }

    public int? TotalScore { get; set; }

    public int? MaxScore { get; set; }

    public int? CourseEnrollmentID { get; set; }

    public int? ChecklistEnrolmentID { get; set; }

    public int? AccidentCaseID { get; set; }

    public int? AccidentFormTypeID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool HasFailedCriticalQuestion { get; set; }

    public int MajorNonConformityCount { get; set; }

    public int MinorNonConformityCount { get; set; }

    public int CompliantCount { get; set; }

    public int? CourseEnrolmentID { get; set; }

    public bool IsSignOff { get; set; }

    public int? OrgGroupID { get; set; }

    public bool IsSignedOff { get; set; }

    [StringLength(2)]
    [Unicode(false)]
    public string? CompletedTimeframe { get; set; }

    public bool IsAnonymousSubmission { get; set; }

    public bool IsApprovedSubmission { get; set; }

    [StringLength(255)]
    public string? ManagerEmployeeEmail { get; set; }

    [StringLength(20)]
    public string? PortalAccessToken { get; set; }

    public int? InductionEnrolmentID { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual AccidentCase? AccidentCase { get; set; }

    [ForeignKey("AccidentFormTypeID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual AccidentFormType? AccidentFormType { get; set; }

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionnaireResponseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistEnrolmentID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual ChecklistEnrolment? ChecklistEnrolment { get; set; }

    [InverseProperty("CompletedQuestionnaireResponse")]
    public virtual ICollection<ContractorCompany> ContractorCompanies { get; set; } = new List<ContractorCompany>();

    [ForeignKey("CourseEnrollmentID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual CourseEnrollment? CourseEnrollment { get; set; }

    [ForeignKey("CourseEnrolmentID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual CourseEnrolment? CourseEnrolment { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionnaireResponseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual Employee? Employee { get; set; }

    [InverseProperty("SelfAssessmentQuestionnaireResponse")]
    public virtual ICollection<HRCaseMeeting> HRCaseMeetings { get; set; } = new List<HRCaseMeeting>();

    [ForeignKey("InductionEnrolmentID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual InductionEnrolment? InductionEnrolment { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual Location? Location { get; set; }

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("QuestionnaireResponseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<QuestionResponse> QuestionResponses { get; set; } = new List<QuestionResponse>();

    [ForeignKey("QuestionnaireID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual Questionnaire Questionnaire { get; set; } = null!;

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<QuestionnaireResponseAttachment> QuestionnaireResponseAttachments { get; set; } = new List<QuestionnaireResponseAttachment>();

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<QuestionnaireResponseNote> QuestionnaireResponseNotes { get; set; } = new List<QuestionnaireResponseNote>();

    [InverseProperty("PrimaryQuestionnaireResponse")]
    public virtual ICollection<QuestionnaireResponseSignOff> QuestionnaireResponseSignOffPrimaryQuestionnaireResponses { get; set; } = new List<QuestionnaireResponseSignOff>();

    [InverseProperty("SignOffQuestionnaireResponse")]
    public virtual ICollection<QuestionnaireResponseSignOff> QuestionnaireResponseSignOffSignOffQuestionnaireResponses { get; set; } = new List<QuestionnaireResponseSignOff>();

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<QuestionnaireResponseXML> QuestionnaireResponseXMLs { get; set; } = new List<QuestionnaireResponseXML>();

    [InverseProperty("QuestionnaireResponse")]
    public virtual ICollection<TextBlockQuestionnaireSection> TextBlockQuestionnaireSections { get; set; } = new List<TextBlockQuestionnaireSection>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("QuestionnaireResponses")]
    public virtual UserArea UserArea { get; set; } = null!;
}
