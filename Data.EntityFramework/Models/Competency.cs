using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Competency", Schema = "V7")]
public partial class Competency
{
    [Key]
    public int CompetencyID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? CategoryID { get; set; }

    public bool IsGlobal { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CompetencyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CategoryID")]
    [InverseProperty("Competencies")]
    public virtual Category? Category { get; set; }

    [InverseProperty("Competency")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencies { get; set; } = new List<ContractorCompetency>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CompetencyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CompetencyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Competency")]
    public virtual ICollection<SafeSystemOfWorkCompetency> SafeSystemOfWorkCompetencies { get; set; } = new List<SafeSystemOfWorkCompetency>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Competencies")]
    public virtual UserArea? UserArea { get; set; }
}
