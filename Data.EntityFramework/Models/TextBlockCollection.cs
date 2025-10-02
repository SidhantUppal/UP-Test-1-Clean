using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockCollection", Schema = "V7")]
public partial class TextBlockCollection
{
    [Key]
    public int TextBlockCollectionID { get; set; }

    public int TextBlockTypeID { get; set; }

    public int TextBlockStatusTypeID { get; set; }

    public int? TextBlockCategoryID { get; set; }

    public int? OriginalTextBlockCollectionID { get; set; }

    public int? OrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsEnvironmental { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Keywords { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public byte Version { get; set; }

    public int OrderNum { get; set; }

    public int? LocationID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool UseCalculatedVersion { get; set; }

    public int? TemplateTextBlockCollectionID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockCollectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockCollectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<HRCaseTextBlockCollection> HRCaseTextBlockCollections { get; set; } = new List<HRCaseTextBlockCollection>();

    [InverseProperty("OriginalTextBlockCollection")]
    public virtual ICollection<TextBlockCollection> InverseOriginalTextBlockCollection { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("TemplateTextBlockCollection")]
    public virtual ICollection<TextBlockCollection> InverseTemplateTextBlockCollection { get; set; } = new List<TextBlockCollection>();

    [ForeignKey("LocationID")]
    [InverseProperty("TextBlockCollections")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockCollectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TextBlockCollections")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("OriginalTextBlockCollectionID")]
    [InverseProperty("InverseOriginalTextBlockCollection")]
    public virtual TextBlockCollection? OriginalTextBlockCollection { get; set; }

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [ForeignKey("TemplateTextBlockCollectionID")]
    [InverseProperty("InverseTemplateTextBlockCollection")]
    public virtual TextBlockCollection? TemplateTextBlockCollection { get; set; }

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<TextBlockAttachment> TextBlockAttachments { get; set; } = new List<TextBlockAttachment>();

    [ForeignKey("TextBlockCategoryID")]
    [InverseProperty("TextBlockCollections")]
    public virtual TextBlockCategory? TextBlockCategory { get; set; }

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<TextBlockCollectionEmployee> TextBlockCollectionEmployees { get; set; } = new List<TextBlockCollectionEmployee>();

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<TextBlockSection> TextBlockSections { get; set; } = new List<TextBlockSection>();

    [ForeignKey("TextBlockStatusTypeID")]
    [InverseProperty("TextBlockCollections")]
    public virtual TextBlockStatusType TextBlockStatusType { get; set; } = null!;

    [ForeignKey("TextBlockTypeID")]
    [InverseProperty("TextBlockCollections")]
    public virtual TextBlockType TextBlockType { get; set; } = null!;

    [InverseProperty("TextBlockCollection")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TextBlockCollections")]
    public virtual UserArea UserArea { get; set; } = null!;
}
