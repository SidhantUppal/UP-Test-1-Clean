using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyTagAssignment", Schema = "V7")]
[Index("PolicyID", Name = "IX_PolicyTagAssignment_PolicyID")]
[Index("PolicyTagID", Name = "IX_PolicyTagAssignment_TagID")]
[Index("PolicyID", "PolicyTagID", Name = "UQ_PolicyTagAssignment", IsUnique = true)]
public partial class PolicyTagAssignment
{
    [Key]
    public int PolicyTagAssignmentID { get; set; }

    public int PolicyID { get; set; }

    public int PolicyTagID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyTagAssignments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("PolicyTagID")]
    [InverseProperty("PolicyTagAssignments")]
    public virtual PolicyTag PolicyTag { get; set; } = null!;
}
