using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CategoryType", Schema = "V7")]
public partial class CategoryType
{
    [Key]
    public int CategoryTypeID { get; set; }

    [StringLength(50)]
    public string Type { get; set; } = null!;

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public bool IsLive { get; set; }

    [InverseProperty("CategoryType")]
    public virtual ICollection<ChecklistTemplateCategory> ChecklistTemplateCategories { get; set; } = new List<ChecklistTemplateCategory>();
}
