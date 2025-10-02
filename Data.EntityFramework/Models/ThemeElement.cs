using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ThemeElement", Schema = "V7")]
public partial class ThemeElement
{
    [Key]
    public int ThemeElementID { get; set; }

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    public string CssElement { get; set; } = null!;

    [InverseProperty("ThemeElement")]
    public virtual ICollection<ThemeElementProperty> ThemeElementProperties { get; set; } = new List<ThemeElementProperty>();
}
