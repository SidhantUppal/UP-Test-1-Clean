using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyTag", Schema = "V7")]
public partial class PolicyTag
{
    [Key]
    public int PolicyTagID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string TagName { get; set; } = null!;

    [StringLength(500)]
    public string? TagDescription { get; set; }

    [StringLength(7)]
    public string? TagColor { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("PolicyTag")]
    public virtual ICollection<PolicyTagAssignment> PolicyTagAssignments { get; set; } = new List<PolicyTagAssignment>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyTags")]
    public virtual UserArea UserArea { get; set; } = null!;
}
