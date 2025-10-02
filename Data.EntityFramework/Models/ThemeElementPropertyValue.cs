using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ThemeElementPropertyValue", Schema = "V7")]
public partial class ThemeElementPropertyValue
{
    [Key]
    public int ThemeElementPropertyValueID { get; set; }

    public int ThemeElementPropertyID { get; set; }

    public int ThemeID { get; set; }

    [StringLength(255)]
    public string PropertyValue { get; set; } = null!;

    [ForeignKey("ThemeID")]
    [InverseProperty("ThemeElementPropertyValues")]
    public virtual Theme Theme { get; set; } = null!;

    [ForeignKey("ThemeElementPropertyID")]
    [InverseProperty("ThemeElementPropertyValues")]
    public virtual ThemeElementProperty ThemeElementProperty { get; set; } = null!;
}
