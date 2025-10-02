using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyCategory", Schema = "V7")]
public partial class PolicyCategory
{
    [Key]
    public int PolicyCategoryID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [StringLength(500)]
    public string? CategoryDescription { get; set; }

    public int? ParentCategoryID { get; set; }

    public int? DisplayOrder { get; set; }

    [StringLength(7)]
    public string? ColorCode { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ParentCategory")]
    public virtual ICollection<PolicyCategory> InverseParentCategory { get; set; } = new List<PolicyCategory>();

    [ForeignKey("ParentCategoryID")]
    [InverseProperty("InverseParentCategory")]
    public virtual PolicyCategory? ParentCategory { get; set; }

    [InverseProperty("PolicyCategory")]
    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyCategories")]
    public virtual UserArea UserArea { get; set; } = null!;
}
