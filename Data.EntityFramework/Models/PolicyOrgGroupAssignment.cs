using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyOrgGroupAssignment", Schema = "V7")]
[Index("OrgGroupID", Name = "IX_PolicyOrgGroupAssignment_OrgGroupID")]
[Index("PolicyID", "OrgGroupID", "ArchivedDate", Name = "UQ_PolicyOrgGroupAssignment", IsUnique = true)]
public partial class PolicyOrgGroupAssignment
{
    [Key]
    public int PolicyOrgGroupAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int OrgGroupID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    public DateTimeOffset? EffectiveDate { get; set; }

    public DateTimeOffset? DueDate { get; set; }

    public bool? IsMandatory { get; set; }

    public string? AssignmentNotes { get; set; }

    public string? SpecialInstructions { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("PolicyOrgGroupAssignments")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyOrgGroupAssignments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyOrgGroupAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
