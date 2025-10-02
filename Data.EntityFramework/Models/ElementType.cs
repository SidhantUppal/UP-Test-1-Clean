using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ElementType", Schema = "V7")]
public partial class ElementType
{
    [Key]
    public int ElementTypeID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Reference { get; set; }

    public bool? IsQuestion { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("ElementType")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
