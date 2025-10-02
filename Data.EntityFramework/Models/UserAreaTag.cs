using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTag", Schema = "V7")]
public partial class UserAreaTag
{
    [Key]
    public int UserAreaTagID { get; set; }

    public int UserAreaID { get; set; }

    public int TagTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    [ForeignKey("TagTypeID")]
    [InverseProperty("UserAreaTags")]
    public virtual TagType TagType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTags")]
    public virtual UserArea UserArea { get; set; } = null!;
}
