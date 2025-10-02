using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockCategory", Schema = "V7")]
public partial class TextBlockCategory
{
    [Key]
    public int TextBlockCategoryID { get; set; }

    public int TextBlockCategoryTypeID { get; set; }

    public int? TextBlockTypeID { get; set; }

    public int? ParentTextBlockCategoryID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockCategoryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockCategoryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("ParentTextBlockCategory")]
    public virtual ICollection<TextBlockCategory> InverseParentTextBlockCategory { get; set; } = new List<TextBlockCategory>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockCategoryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentTextBlockCategoryID")]
    [InverseProperty("InverseParentTextBlockCategory")]
    public virtual TextBlockCategory? ParentTextBlockCategory { get; set; }

    [ForeignKey("TextBlockCategoryTypeID")]
    [InverseProperty("TextBlockCategories")]
    public virtual TextBlockCategoryType TextBlockCategoryType { get; set; } = null!;

    [InverseProperty("TextBlockCategory")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [ForeignKey("TextBlockTypeID")]
    [InverseProperty("TextBlockCategories")]
    public virtual TextBlockType? TextBlockType { get; set; }

    [InverseProperty("TextBlockCategory")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TextBlockCategories")]
    public virtual UserArea? UserArea { get; set; }
}
