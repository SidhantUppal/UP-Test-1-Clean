using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FolderType", Schema = "V7")]
public partial class FolderType
{
    [Key]
    public int FolderTypeID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    public bool IsHidden { get; set; }

    [InverseProperty("FolderType")]
    public virtual ICollection<Folder> Folders { get; set; } = new List<Folder>();
}
