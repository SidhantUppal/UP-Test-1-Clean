using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HelpGuide", Schema = "V7")]
public partial class HelpGuide
{
    [Key]
    public int HelpGuideID { get; set; }

    public int ModuleTypeID { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string SourceURL { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ModuleTypeID")]
    [InverseProperty("HelpGuides")]
    public virtual ModuleType ModuleType { get; set; } = null!;
}
