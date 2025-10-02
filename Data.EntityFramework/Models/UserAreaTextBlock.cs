using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTextBlock", Schema = "V7")]
public partial class UserAreaTextBlock
{
    [Key]
    public int UserAreaTextBlockID { get; set; }

    public int TextBlockID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaTextBlockArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaTextBlockCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaTextBlockModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TextBlockID")]
    [InverseProperty("UserAreaTextBlocks")]
    public virtual TextBlock TextBlock { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTextBlocks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
