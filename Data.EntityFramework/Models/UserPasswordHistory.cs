using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserPasswordHistory", Schema = "V7")]
[Index("UserID", Name = "IX_UserPasswordHistory_SaltPassword")]
public partial class UserPasswordHistory
{
    [Key]
    public int UserPasswordHistoryID { get; set; }

    public int UserID { get; set; }

    [StringLength(10)]
    public string Salt { get; set; } = null!;

    [StringLength(50)]
    public string Password { get; set; } = null!;

    public DateTimeOffset? InvalidatedDate { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserPasswordHistories")]
    public virtual User User { get; set; } = null!;
}
