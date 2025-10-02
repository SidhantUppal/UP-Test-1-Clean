using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyLocationAssignment", Schema = "V7")]
[Index("LocationID", Name = "IX_PolicyLocationAssignment_LocationID")]
[Index("PolicyID", "LocationID", "ArchivedDate", Name = "UQ_PolicyLocationAssignment", IsUnique = true)]
public partial class PolicyLocationAssignment
{
    [Key]
    public int PolicyLocationAssignmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int LocationID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    public DateTimeOffset? EffectiveDate { get; set; }

    public string? LocationSpecificNotes { get; set; }

    public string? LocalVariations { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("PolicyLocationAssignments")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyLocationAssignments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyLocationAssignments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
