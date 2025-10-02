using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ThemeElementProperty", Schema = "V7")]
public partial class ThemeElementProperty
{
    [Key]
    public int ThemeElementPropertyID { get; set; }

    public int ThemeElementID { get; set; }

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(255)]
    public string CssProperty { get; set; } = null!;

    [ForeignKey("ThemeElementID")]
    [InverseProperty("ThemeElementProperties")]
    public virtual ThemeElement ThemeElement { get; set; } = null!;

    [InverseProperty("ThemeElementProperty")]
    public virtual ICollection<ThemeElementPropertyValue> ThemeElementPropertyValues { get; set; } = new List<ThemeElementPropertyValue>();
}
