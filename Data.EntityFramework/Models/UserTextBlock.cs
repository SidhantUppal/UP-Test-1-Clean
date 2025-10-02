using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserTextBlock", Schema = "V7")]
public partial class UserTextBlock
{
    [Key]
    public int UserTextBlockID { get; set; }

    public int TextBlockID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? TaskID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserTextBlockArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserTextBlockCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserTextBlockModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("UserTextBlocks")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("TextBlockID")]
    [InverseProperty("UserTextBlocks")]
    public virtual TextBlock TextBlock { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("UserTextBlockUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserTextBlocks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
