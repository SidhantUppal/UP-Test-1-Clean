using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWRiskCategory", Schema = "V7")]
public partial class SSOWRiskCategory
{
    [Key]
    public int SSOWRiskCategoryID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [StringLength(500)]
    public string? CategoryDescription { get; set; }

    [StringLength(50)]
    public string? RiskLevel { get; set; }

    [StringLength(7)]
    public string? ColorCode { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("SSOWRiskCategory")]
    public virtual ICollection<SafeWorkingProcedure> SafeWorkingProcedures { get; set; } = new List<SafeWorkingProcedure>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("SSOWRiskCategories")]
    public virtual UserArea UserArea { get; set; } = null!;
}
