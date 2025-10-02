using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockType", Schema = "V7")]
public partial class TextBlockType
{
    [Key]
    public int TextBlockTypeID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [InverseProperty("TextBlockType")]
    public virtual ICollection<SafeSystemOfWorkType> SafeSystemOfWorkTypes { get; set; } = new List<SafeSystemOfWorkType>();

    [InverseProperty("TextBlockType")]
    public virtual ICollection<TextBlockCategory> TextBlockCategories { get; set; } = new List<TextBlockCategory>();

    [InverseProperty("TextBlockType")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("TextBlockType")]
    public virtual ICollection<TextBlockSection> TextBlockSections { get; set; } = new List<TextBlockSection>();

    [InverseProperty("TextBlockType")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();
}
