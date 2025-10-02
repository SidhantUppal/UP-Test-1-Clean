using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InductionBundleItem", Schema = "V7")]
public partial class InductionBundleItem
{
    [Key]
    public int InductionBundleItemID { get; set; }

    public int InductionBundleID { get; set; }

    public int ElementTypeID { get; set; }

    public int? ElementID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    [StringLength(255)]
    public string? DocumentTitle { get; set; }

    public string? DocumentURL { get; set; }

    public int? AttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InductionBundleItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InductionBundleItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("InductionBundleItems")]
    public virtual DocumentLinkTableType? DocumentLinkTableType { get; set; }

    [ForeignKey("InductionBundleID")]
    [InverseProperty("InductionBundleItems")]
    public virtual InductionBundle InductionBundle { get; set; } = null!;

    [InverseProperty("InductionBundleItem")]
    public virtual ICollection<InductionEnrolment> InductionEnrolments { get; set; } = new List<InductionEnrolment>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InductionBundleItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
