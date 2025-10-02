using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Category", Schema = "V7")]
public partial class Category
{
    [Key]
    public int CategoryID { get; set; }

    public int CategoryTypeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CategoryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Category")]
    public virtual ICollection<Competency> Competencies { get; set; } = new List<Competency>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CategoryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CategoryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Categories")]
    public virtual UserArea UserArea { get; set; } = null!;
}
