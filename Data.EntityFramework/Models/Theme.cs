using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Theme", Schema = "V7")]
public partial class Theme
{
    [Key]
    public int ThemeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string? CustomCultureRegionString { get; set; }

    public string? CssFolderRelativePath { get; set; }

    public string? ImagesFolderRelativePath { get; set; }

    [StringLength(255)]
    public string? LogoImageTitle { get; set; }

    public string? Description { get; set; }

    public int? LogoAttachmentID { get; set; }

    public int? OwnerUserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ThemeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Theme")]
    public virtual ICollection<HelpText> HelpTexts { get; set; } = new List<HelpText>();

    [ForeignKey("LogoAttachmentID")]
    [InverseProperty("Themes")]
    public virtual Attachment? LogoAttachment { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ThemeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OwnerUserAreaID")]
    [InverseProperty("Themes")]
    public virtual UserArea? OwnerUserArea { get; set; }

    [InverseProperty("Theme")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [InverseProperty("Theme")]
    public virtual ICollection<ThemeElementPropertyValue> ThemeElementPropertyValues { get; set; } = new List<ThemeElementPropertyValue>();
}
