using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentBundle", Schema = "V7")]
public partial class DocumentBundle
{
    [Key]
    public int BundleID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string BundleName { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [StringLength(50)]
    public string BundleType { get; set; } = null!;

    public bool RequiresSequentialSigning { get; set; }

    public bool AllowBulkSign { get; set; }

    public int? ValidityDays { get; set; }

    public bool IsActive { get; set; }

    public string? Tags { get; set; }

    public string? Metadata { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentBundleArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentBundleCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Bundle")]
    public virtual ICollection<DocumentBundleAssignment> DocumentBundleAssignments { get; set; } = new List<DocumentBundleAssignment>();

    [InverseProperty("Bundle")]
    public virtual ICollection<DocumentBundleItem> DocumentBundleItems { get; set; } = new List<DocumentBundleItem>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentBundleModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentBundles")]
    public virtual UserArea UserArea { get; set; } = null!;
}
