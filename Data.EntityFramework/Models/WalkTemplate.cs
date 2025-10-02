using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkTemplate", Schema = "V7")]
public partial class WalkTemplate
{
    [Key]
    public int WalkTemplateID { get; set; }

    public int TagTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? MaxPreStartDuration { get; set; }

    public int? MaxPostStartDuration { get; set; }

    public int? MaxExtensionDuration { get; set; }

    [ForeignKey("TagTypeID")]
    [InverseProperty("WalkTemplates")]
    public virtual TagType TagType { get; set; } = null!;

    [InverseProperty("WalkTemplate")]
    public virtual ICollection<WalkHazardReportType> WalkHazardReportTypes { get; set; } = new List<WalkHazardReportType>();

    [InverseProperty("WalkTemplate")]
    public virtual ICollection<Walk> Walks { get; set; } = new List<Walk>();
}
