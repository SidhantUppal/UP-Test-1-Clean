using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FolderOrgGroup", Schema = "V7")]
[Index("FolderID", "OrgGroupID", Name = "IX_FolderOrgGroup_FolderOrgGroup")]
[Index("FolderID", "OrgGroupID", Name = "UK_FolderOrgGroup", IsUnique = true)]
public partial class FolderOrgGroup
{
    [Key]
    public int FolderOrgGroupID { get; set; }

    public int FolderID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("FolderID")]
    [InverseProperty("FolderOrgGroups")]
    public virtual Folder Folder { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("FolderOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;
}
