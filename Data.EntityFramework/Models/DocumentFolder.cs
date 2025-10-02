using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentFolder", Schema = "V7")]
public partial class DocumentFolder
{
    [Key]
    public int FolderID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    public int? ParentFolderID { get; set; }

    [StringLength(500)]
    public string Path { get; set; } = null!;

    public bool IsSystemFolder { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DocumentFolderArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentFolderCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Folder")]
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    [InverseProperty("ParentFolder")]
    public virtual ICollection<DocumentFolder> InverseParentFolder { get; set; } = new List<DocumentFolder>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DocumentFolderModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentFolderID")]
    [InverseProperty("InverseParentFolder")]
    public virtual DocumentFolder? ParentFolder { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentFolders")]
    public virtual UserArea UserArea { get; set; } = null!;
}
