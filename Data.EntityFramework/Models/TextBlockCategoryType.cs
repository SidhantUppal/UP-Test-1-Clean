using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockCategoryType", Schema = "V7")]
public partial class TextBlockCategoryType
{
    [Key]
    public int TextBlockCategoryTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("TextBlockCategoryType")]
    public virtual ICollection<TextBlockCategory> TextBlockCategories { get; set; } = new List<TextBlockCategory>();
}
