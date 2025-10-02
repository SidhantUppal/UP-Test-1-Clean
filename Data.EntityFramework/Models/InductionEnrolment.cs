using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InductionEnrolment", Schema = "V7")]
public partial class InductionEnrolment
{
    [Key]
    public int InductionEnrolmentID { get; set; }

    public int InductionAllocationID { get; set; }

    public int InductionBundleItemID { get; set; }

    public int UserAreaID { get; set; }

    public bool? IsPassed { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    [StringLength(100)]
    public string? CompletedByFullName { get; set; }

    public string? CompletedBySignature { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InductionEnrolmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InductionEnrolmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("InductionEnrolment")]
    public virtual ICollection<DocRegisterTask> DocRegisterTasks { get; set; } = new List<DocRegisterTask>();

    [ForeignKey("InductionAllocationID")]
    [InverseProperty("InductionEnrolments")]
    public virtual InductionAllocation InductionAllocation { get; set; } = null!;

    [ForeignKey("InductionBundleItemID")]
    [InverseProperty("InductionEnrolments")]
    public virtual InductionBundleItem InductionBundleItem { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InductionEnrolmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("InductionEnrolment")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("InductionEnrolments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
