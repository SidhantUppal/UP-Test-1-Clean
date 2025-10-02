using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("YesNoNAType", Schema = "V7")]
public partial class YesNoNAType
{
    [Key]
    public int YesNoNATypeID { get; set; }

    [StringLength(20)]
    public string Name { get; set; } = null!;

    [InverseProperty("YesNoNAType")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();
}
