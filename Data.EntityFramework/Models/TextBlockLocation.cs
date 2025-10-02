using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockLocation", Schema = "V7")]
[Index("TextBlockID", Name = "IX_TextBlockLocation_TextBlockID_includes")]
public partial class TextBlockLocation
{
    [Key]
    public int TextBlockLocationID { get; set; }

    public int TextBlockID { get; set; }

    public int LocationID { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("TextBlockLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockLocations")]
    public virtual TextBlock TextBlock { get; set; } = null!;
}
