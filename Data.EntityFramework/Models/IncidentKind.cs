using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentKind", Schema = "V7")]
public partial class IncidentKind
{
    [Key]
    public int IncidentKindID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public int? UserAreaID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? RIDDORValue { get; set; }

    public bool IsForNonAccidentOnly { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("IncidentKind")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("IncidentKind")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("IncidentKindArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("IncidentKindCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("IncidentKindModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("IncidentKinds")]
    public virtual UserArea? UserArea { get; set; }
}
