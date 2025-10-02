using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockStatusType", Schema = "V7")]
public partial class TextBlockStatusType
{
    [Key]
    public int TextBlockStatusTypeID { get; set; }

    public bool IsVisible { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("TextBlockStatusType")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("TextBlockStatusType")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();
}
