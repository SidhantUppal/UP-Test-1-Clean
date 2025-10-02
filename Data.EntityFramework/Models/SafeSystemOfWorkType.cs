using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkType", Schema = "V7")]
public partial class SafeSystemOfWorkType
{
    [Key]
    public int SafeSystemOfWorkTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int TextBlockTypeID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SafeSystemOfWorkTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SafeSystemOfWorkTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SafeSystemOfWorkTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("SafeSystemOfWorkType")]
    public virtual ICollection<SafeSystemOfWorkTemplate> SafeSystemOfWorkTemplates { get; set; } = new List<SafeSystemOfWorkTemplate>();

    [InverseProperty("SafeSystemOfWorkType")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [ForeignKey("TextBlockTypeID")]
    [InverseProperty("SafeSystemOfWorkTypes")]
    public virtual TextBlockType TextBlockType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SafeSystemOfWorkTypes")]
    public virtual UserArea? UserArea { get; set; }
}
