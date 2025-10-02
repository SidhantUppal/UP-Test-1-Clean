using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserTwoStepAuthToken", Schema = "V7")]
[Index("UserID", "UserAreaID", Name = "IX_UserTwoStepAuthToken_Token")]
public partial class UserTwoStepAuthToken
{
    [Key]
    public int UserTwoStepAuthTokenID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(14)]
    public string AuthToken { get; set; } = null!;

    [StringLength(36)]
    public string? SessionID { get; set; }

    public DateTimeOffset ExpiryDate { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserTwoStepAuthTokens")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserTwoStepAuthTokens")]
    public virtual UserArea UserArea { get; set; } = null!;
}
