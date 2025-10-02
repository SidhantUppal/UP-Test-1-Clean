using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkTemplate", Schema = "V7")]
public partial class SafeSystemOfWorkTemplate
{
    [Key]
    public int SafeSystemOfWorkTemplateID { get; set; }

    public int SafeSystemOfWorkTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IncludePPEOptions { get; set; }

    public bool IncludeRiskAssessmentOptions { get; set; }

    public bool IncludeSSOWLinks { get; set; }

    public bool IncludeAdvancedDetails { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SafeSystemOfWorkTemplateArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SafeSystemOfWorkTemplateCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SafeSystemOfWorkTemplateModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("SafeSystemOfWorkTemplate")]
    public virtual ICollection<SafeSystemOfWorkTemplateSection> SafeSystemOfWorkTemplateSections { get; set; } = new List<SafeSystemOfWorkTemplateSection>();

    [ForeignKey("SafeSystemOfWorkTypeID")]
    [InverseProperty("SafeSystemOfWorkTemplates")]
    public virtual SafeSystemOfWorkType SafeSystemOfWorkType { get; set; } = null!;

    [InverseProperty("SafeSystemOfWorkTemplate")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("SafeSystemOfWorkTemplates")]
    public virtual UserArea? UserArea { get; set; }
}
