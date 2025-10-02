using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocPack", Schema = "V7")]
public partial class DocPack
{
    [Key]
    public int DocPackID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    public bool IsShareable { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocPackArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocPackCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("DocPack")]
    public virtual ICollection<DocPackItem> DocPackItems { get; set; } = new List<DocPackItem>();

    [InverseProperty("DocPack")]
    public virtual ICollection<DocPackViewerUser> DocPackViewerUsers { get; set; } = new List<DocPackViewerUser>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocPackModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocPacks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
