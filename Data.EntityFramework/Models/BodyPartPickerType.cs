using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BodyPartPickerType", Schema = "V7")]
public partial class BodyPartPickerType
{
    [Key]
    public int BodyPartPickerTypeID { get; set; }

    public int? ParentID { get; set; }

    public int BodyPartID { get; set; }

    public bool IsBackView { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [ForeignKey("BodyPartID")]
    [InverseProperty("BodyPartPickerTypes")]
    public virtual BodyPart BodyPart { get; set; } = null!;

    [InverseProperty("Parent")]
    public virtual ICollection<BodyPartPickerType> InverseParent { get; set; } = new List<BodyPartPickerType>();

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual BodyPartPickerType? Parent { get; set; }
}
