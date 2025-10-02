using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockSection", Schema = "V7")]
public partial class TextBlockSection
{
    [Key]
    public int TextBlockSectionID { get; set; }

    public int TextBlockTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int OrderNum { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    public int? LegacySectionID { get; set; }

    public int? TemplateTextBlockSectionID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockSectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockSectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("TemplateTextBlockSection")]
    public virtual ICollection<TextBlockSection> InverseTemplateTextBlockSection { get; set; } = new List<TextBlockSection>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockSectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TextBlockSection")]
    public virtual ICollection<SafeSystemOfWorkTemplateSection> SafeSystemOfWorkTemplateSections { get; set; } = new List<SafeSystemOfWorkTemplateSection>();

    [ForeignKey("TemplateTextBlockSectionID")]
    [InverseProperty("InverseTemplateTextBlockSection")]
    public virtual TextBlockSection? TemplateTextBlockSection { get; set; }

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("TextBlockSections")]
    public virtual TextBlockCollection? TextBlockCollection { get; set; }

    [ForeignKey("TextBlockTypeID")]
    [InverseProperty("TextBlockSections")]
    public virtual TextBlockType TextBlockType { get; set; } = null!;

    [InverseProperty("TextBlockSection")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TextBlockSections")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("TextBlockSection")]
    public virtual ICollection<UserAreaTextBlockSectionOrder> UserAreaTextBlockSectionOrders { get; set; } = new List<UserAreaTextBlockSectionOrder>();
}
