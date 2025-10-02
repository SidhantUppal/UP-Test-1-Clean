using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Resource", Schema = "V7")]
public partial class Resource
{
    [Key]
    public int ResourceID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(150)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [StringLength(255)]
    public string? URL { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ResourceArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ResourceCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ResourceModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Resource")]
    public virtual ICollection<ResourceLocation> ResourceLocations { get; set; } = new List<ResourceLocation>();

    [InverseProperty("Resource")]
    public virtual ICollection<ResourceOrgGroup> ResourceOrgGroups { get; set; } = new List<ResourceOrgGroup>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Resources")]
    public virtual UserArea UserArea { get; set; } = null!;
}
