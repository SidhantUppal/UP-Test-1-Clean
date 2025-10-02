using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ResourceOrgGroup", Schema = "V7")]
[Index("ResourceID", "OrgGroupID", Name = "CK_ResourceOrgGroup_Unique", IsUnique = true)]
[Index("ResourceID", Name = "IX_ResourceOrgGroup_ResourceID_includes")]
public partial class ResourceOrgGroup
{
    [Key]
    public int ResourceOrgGroupID { get; set; }

    public int ResourceID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("ResourceOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("ResourceID")]
    [InverseProperty("ResourceOrgGroups")]
    public virtual Resource Resource { get; set; } = null!;
}
