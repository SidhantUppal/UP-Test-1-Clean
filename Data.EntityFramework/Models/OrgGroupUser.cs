using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OrgGroupUser", Schema = "V7")]
[Index("OrgGroupID", "UserID", Name = "CK_OrgGroupUser_Unique", IsUnique = true)]
[Index("UserID", Name = "IX_OrgGroupUser_UserID_includes")]
public partial class OrgGroupUser
{
    [Key]
    public int OrgGroupUserID { get; set; }

    public int OrgGroupID { get; set; }

    public int UserID { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("OrgGroupUsers")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("OrgGroupUsers")]
    public virtual User User { get; set; } = null!;
}
