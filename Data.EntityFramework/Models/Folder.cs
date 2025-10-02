using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Folder", Schema = "V7")]
public partial class Folder
{
    [Key]
    public int FolderID { get; set; }

    public int? ParentFolderID { get; set; }

    public int FolderTypeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? V5FolderID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("FolderArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Folder")]
    public virtual ICollection<AttachmentBackup> AttachmentBackups { get; set; } = new List<AttachmentBackup>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("FolderCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Folder")]
    public virtual ICollection<FolderOrgGroup> FolderOrgGroups { get; set; } = new List<FolderOrgGroup>();

    [ForeignKey("FolderTypeID")]
    [InverseProperty("Folders")]
    public virtual FolderType FolderType { get; set; } = null!;

    [InverseProperty("ParentFolder")]
    public virtual ICollection<Folder> InverseParentFolder { get; set; } = new List<Folder>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("FolderModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentFolderID")]
    [InverseProperty("InverseParentFolder")]
    public virtual Folder? ParentFolder { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Folders")]
    public virtual UserArea UserArea { get; set; } = null!;
}
