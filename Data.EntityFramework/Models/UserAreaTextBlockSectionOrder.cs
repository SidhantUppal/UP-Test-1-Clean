using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTextBlockSectionOrder", Schema = "V7")]
[Index("UserAreaID", "TextBlockSectionID", Name = "CK_UserAreaTextBlockSectionOrder_UserAreaTextBlockSection", IsUnique = true)]
[Index("UserAreaID", "TextBlockSectionID", Name = "IX_UserAreaTextBlockSectionOrder_UserAreaTextBlockSection")]
public partial class UserAreaTextBlockSectionOrder
{
    [Key]
    public int UserAreaTextBlockSectionOrderID { get; set; }

    public int UserAreaID { get; set; }

    public int TextBlockSectionID { get; set; }

    public int OrderNum { get; set; }

    [ForeignKey("TextBlockSectionID")]
    [InverseProperty("UserAreaTextBlockSectionOrders")]
    public virtual TextBlockSection TextBlockSection { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTextBlockSectionOrders")]
    public virtual UserArea UserArea { get; set; } = null!;
}
