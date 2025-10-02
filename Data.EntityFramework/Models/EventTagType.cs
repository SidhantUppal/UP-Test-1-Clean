using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EventTagType", Schema = "V7")]
public partial class EventTagType
{
    [Key]
    public int EventTagTypeID { get; set; }

    public int EventID { get; set; }

    public int TagTypeID { get; set; }

    [ForeignKey("EventID")]
    [InverseProperty("EventTagTypes")]
    public virtual Event Event { get; set; } = null!;

    [ForeignKey("TagTypeID")]
    [InverseProperty("EventTagTypes")]
    public virtual TagType TagType { get; set; } = null!;
}
