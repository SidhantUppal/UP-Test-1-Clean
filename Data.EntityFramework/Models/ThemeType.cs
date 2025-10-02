using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ThemeType", Schema = "V7")]
public partial class ThemeType
{
    [Key]
    public int ThemeTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(255)]
    public string? CustomCultureRegionString { get; set; }

    public string? CssFolderRelativePath { get; set; }

    public string? ImagesFolderRelativePath { get; set; }

    public bool IsLive { get; set; }

    [InverseProperty("ThemeType")]
    public virtual ICollection<UserArea> UserAreas { get; set; } = new List<UserArea>();
}
