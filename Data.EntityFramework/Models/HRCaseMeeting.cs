using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseMeeting", Schema = "V7")]
public partial class HRCaseMeeting
{
    [Key]
    public int HRCaseMeetingID { get; set; }

    public int HRCaseID { get; set; }

    public int HRMeetingTypeID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public DateTimeOffset MeetingDate { get; set; }

    public short? Status { get; set; }

    [StringLength(255)]
    public string? Location { get; set; }

    public bool IsFirstInstance { get; set; }

    public bool IsComplete { get; set; }

    public bool IsAdjourned { get; set; }

    public bool IsEditEnabled { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public string? EmployeeSignature { get; set; }

    public DateTimeOffset? EmployeeSignDate { get; set; }

    public string? ManagerSignature { get; set; }

    public DateTimeOffset? ManagerSignDate { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    public bool? HasProvidedSelfAssessment { get; set; }

    public int? SelfAssessmentQuestionnaireResponseID { get; set; }

    public int? SelfAssessmentAttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HRCaseMeetingArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCaseMeetingCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual HRCase HRCase { get; set; } = null!;

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseEvent> HRCaseEvents { get; set; } = new List<HRCaseEvent>();

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseMeetingAttendee> HRCaseMeetingAttendees { get; set; } = new List<HRCaseMeetingAttendee>();

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual HRCaseStatusType? HRCaseStatusType { get; set; }

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseTask> HRCaseTasks { get; set; } = new List<HRCaseTask>();

    [InverseProperty("HRCaseMeeting")]
    public virtual ICollection<HRCaseTextBlockCollection> HRCaseTextBlockCollections { get; set; } = new List<HRCaseTextBlockCollection>();

    [ForeignKey("HRMeetingTypeID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual HRMeetingType HRMeetingType { get; set; } = null!;

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HRCaseMeetingModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SelfAssessmentAttachmentID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual Attachment? SelfAssessmentAttachment { get; set; }

    [ForeignKey("SelfAssessmentQuestionnaireResponseID")]
    [InverseProperty("HRCaseMeetings")]
    public virtual QuestionnaireResponse? SelfAssessmentQuestionnaireResponse { get; set; }
}
