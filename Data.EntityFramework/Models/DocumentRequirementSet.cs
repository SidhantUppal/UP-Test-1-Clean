using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRequirementSet", Schema = "V7")]
public partial class DocumentRequirementSet
{
    [Key]
    public int RequirementSetID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string SetName { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [StringLength(100)]
    public string? ProcessType { get; set; }

    public bool IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentRequirementSetArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentRequirementSetCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("RequirementSet")]
    public virtual ICollection<DocumentRequirement> DocumentRequirements { get; set; } = new List<DocumentRequirement>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentRequirementSetModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentRequirementSets")]
    public virtual UserArea UserArea { get; set; } = null!;
}
