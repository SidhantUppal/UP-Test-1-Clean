using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Policy", Schema = "V7")]
[Index("EffectiveDate", Name = "IX_Policy_EffectiveDate")]
[Index("ExpiryDate", Name = "IX_Policy_ExpiryDate")]
[Index("NextReviewDate", Name = "IX_Policy_NextReviewDate")]
[Index("PolicyNumber", Name = "IX_Policy_PolicyNumber")]
[Index("PolicyOwnerUserID", Name = "IX_Policy_PolicyOwner")]
[Index("PolicyStatusTypeID", Name = "IX_Policy_Status")]
[Index("UserAreaID", Name = "IX_Policy_UserAreaID")]
public partial class Policy
{
    [Key]
    public int PolicyID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyTypeID { get; set; }

    public int? PolicyCategoryID { get; set; }

    public int PolicyStatusTypeID { get; set; }

    [StringLength(50)]
    public string PolicyNumber { get; set; } = null!;

    [StringLength(255)]
    public string PolicyTitle { get; set; } = null!;

    [StringLength(20)]
    public string? PolicyVersion { get; set; }

    public int? PreviousVersionID { get; set; }

    public bool? IsCurrentVersion { get; set; }

    public string? PolicySummary { get; set; }

    public string PolicyContent { get; set; } = null!;

    public string? Purpose { get; set; }

    public string? Scope { get; set; }

    public string? Applicability { get; set; }

    public string? RegulatoryRequirements { get; set; }

    public string? LegalReferences { get; set; }

    public string? ComplianceNotes { get; set; }

    public int PolicyOwnerUserID { get; set; }

    public int AuthorUserID { get; set; }

    [StringLength(255)]
    public string? DepartmentResponsible { get; set; }

    public int? ReviewerUserID { get; set; }

    public int? ApproverUserID { get; set; }

    public DateTimeOffset? ReviewDate { get; set; }

    public DateTimeOffset? ApprovalDate { get; set; }

    public DateTimeOffset? NextReviewDate { get; set; }

    public int? ReviewFrequencyMonths { get; set; }

    public DateTimeOffset? PublishedDate { get; set; }

    public int? PublishedByUserID { get; set; }

    public DateTimeOffset? EffectiveDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public bool? RequiresTraining { get; set; }

    public bool? RequiresAcknowledgment { get; set; }

    public int? TrainingCourseID { get; set; }

    public string? AcknowledgmentText { get; set; }

    public string? RelatedPolicies { get; set; }

    [StringLength(500)]
    public string? Keywords { get; set; }

    public string? AdditionalNotes { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ApproverUserID")]
    [InverseProperty("PolicyApproverUsers")]
    public virtual User? ApproverUser { get; set; }

    [ForeignKey("AuthorUserID")]
    [InverseProperty("PolicyAuthorUsers")]
    public virtual User AuthorUser { get; set; } = null!;

    [InverseProperty("PreviousVersion")]
    public virtual ICollection<Policy> InversePreviousVersion { get; set; } = new List<Policy>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyAcknowledgment> PolicyAcknowledgments { get; set; } = new List<PolicyAcknowledgment>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyApprovalLog> PolicyApprovalLogs { get; set; } = new List<PolicyApprovalLog>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyAttachment> PolicyAttachments { get; set; } = new List<PolicyAttachment>();

    [ForeignKey("PolicyCategoryID")]
    [InverseProperty("Policies")]
    public virtual PolicyCategory? PolicyCategory { get; set; }

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyCompliance> PolicyCompliances { get; set; } = new List<PolicyCompliance>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyExternalLink> PolicyExternalLinks { get; set; } = new List<PolicyExternalLink>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyLocationAssignment> PolicyLocationAssignments { get; set; } = new List<PolicyLocationAssignment>();

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyOrgGroupAssignment> PolicyOrgGroupAssignments { get; set; } = new List<PolicyOrgGroupAssignment>();

    [ForeignKey("PolicyOwnerUserID")]
    [InverseProperty("PolicyPolicyOwnerUsers")]
    public virtual User PolicyOwnerUser { get; set; } = null!;

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyReview> PolicyReviews { get; set; } = new List<PolicyReview>();

    [ForeignKey("PolicyStatusTypeID")]
    [InverseProperty("Policies")]
    public virtual PolicyStatusType PolicyStatusType { get; set; } = null!;

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyTagAssignment> PolicyTagAssignments { get; set; } = new List<PolicyTagAssignment>();

    [ForeignKey("PolicyTypeID")]
    [InverseProperty("Policies")]
    public virtual PolicyType PolicyType { get; set; } = null!;

    [InverseProperty("Policy")]
    public virtual ICollection<PolicyUserAssignment> PolicyUserAssignments { get; set; } = new List<PolicyUserAssignment>();

    [ForeignKey("PreviousVersionID")]
    [InverseProperty("InversePreviousVersion")]
    public virtual Policy? PreviousVersion { get; set; }

    [ForeignKey("PublishedByUserID")]
    [InverseProperty("PolicyPublishedByUsers")]
    public virtual User? PublishedByUser { get; set; }

    [ForeignKey("ReviewerUserID")]
    [InverseProperty("PolicyReviewerUsers")]
    public virtual User? ReviewerUser { get; set; }

    [ForeignKey("TrainingCourseID")]
    [InverseProperty("Policies")]
    public virtual Course? TrainingCourse { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Policies")]
    public virtual UserArea UserArea { get; set; } = null!;
}
