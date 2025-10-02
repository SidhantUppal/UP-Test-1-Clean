using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InductionAllocation", Schema = "V7")]
public partial class InductionAllocation
{
    [Key]
    public int InductionAllocationID { get; set; }

    public int InductionBundleID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public bool? RenewalEnabled { get; set; }

    public DateTimeOffset SendDate { get; set; }

    public DateTimeOffset DueDate { get; set; }

    public Guid InvitationGUID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InductionAllocationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InductionAllocationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("InductionAllocations")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("InductionBundleID")]
    [InverseProperty("InductionAllocations")]
    public virtual InductionBundle InductionBundle { get; set; } = null!;

    [InverseProperty("InductionAllocation")]
    public virtual ICollection<InductionEnrolment> InductionEnrolments { get; set; } = new List<InductionEnrolment>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InductionAllocationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("InductionAllocations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
