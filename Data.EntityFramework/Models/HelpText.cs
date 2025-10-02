using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HelpText", Schema = "V7")]
public partial class HelpText
{
    [Key]
    public int HelpTextID { get; set; }

    public int ModuleTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? ThemeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Title { get; set; }

    public string? Content { get; set; }

    [StringLength(255)]
    public string? Keywords { get; set; }

    [ForeignKey("ModuleTypeID")]
    [InverseProperty("HelpTexts")]
    public virtual ModuleType ModuleType { get; set; } = null!;

    [ForeignKey("ThemeID")]
    [InverseProperty("HelpTexts")]
    public virtual Theme? Theme { get; set; }
}
