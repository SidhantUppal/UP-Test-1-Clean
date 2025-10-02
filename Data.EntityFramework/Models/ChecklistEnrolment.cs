using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistEnrolment", Schema = "V7")]
[Index("ArchivedDate", Name = "IX_ChecklistEnrolment_ArchivedDate")]
[Index("ChecklistAssignmentID", "CompletionDate", "ArchivedDate", Name = "IX_ChecklistEnrolment_ChecklistAssignmentID_CompletedDate_ArchivedDate")]
public partial class ChecklistEnrolment
{
    [Key]
    public int ChecklistEnrolmentID { get; set; }

    public int ChecklistAssignmentID { get; set; }

    public DateTimeOffset? IsLiveDate { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    public bool? Result { get; set; }

    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsLocked { get; set; }

    public bool IsCompliant { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ChecklistEnrolmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistAssignmentID")]
    [InverseProperty("ChecklistEnrolments")]
    public virtual ChecklistAssignment ChecklistAssignment { get; set; } = null!;

    [InverseProperty("ChecklistEnrolment")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogs { get; set; } = new List<ContractorCompanyApprovalLog>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistEnrolmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistEnrolmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("ChecklistEnrolment")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ChecklistEnrolments")]
    public virtual UserArea? UserArea { get; set; }
}
