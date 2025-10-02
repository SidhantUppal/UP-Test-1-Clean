using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockOrgGroup", Schema = "V7")]
[Index("TextBlockID", Name = "IX_TextBlockOrgGroup_TextBlockID_includes")]
public partial class TextBlockOrgGroup
{
    [Key]
    public int TextBlockOrgGroupID { get; set; }

    public int TextBlockID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TextBlockOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockOrgGroups")]
    public virtual TextBlock TextBlock { get; set; } = null!;
}
