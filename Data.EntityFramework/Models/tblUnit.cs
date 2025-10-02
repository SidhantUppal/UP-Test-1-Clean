using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblUnit", Schema = "NVQ")]
public partial class tblUnit
{
    [Key]
    public int UnitId { get; set; }

    [StringLength(20)]
    public string UnitCode { get; set; } = null!;

    [StringLength(200)]
    public string UnitTitle { get; set; } = null!;

    public int? UnitLevel { get; set; }

    public int? Credits { get; set; }

    public int? GLH { get; set; }

    public string? Description { get; set; }

    public bool? IsCore { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [InverseProperty("Unit")]
    public virtual ICollection<tblElement> tblElements { get; set; } = new List<tblElement>();

    [InverseProperty("Unit")]
    public virtual ICollection<tblKnowledgeRequirement> tblKnowledgeRequirements { get; set; } = new List<tblKnowledgeRequirement>();

    [InverseProperty("Unit")]
    public virtual ICollection<tblQualificationUnit> tblQualificationUnits { get; set; } = new List<tblQualificationUnit>();
}
