using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LoginAction", Schema = "V7")]
public partial class LoginAction
{
    [Key]
    public int LoginActionID { get; set; }

    public int LoginActionTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [StringLength(255)]
    public string? Note { get; set; }

    [ForeignKey("LoginActionTypeID")]
    [InverseProperty("LoginActions")]
    public virtual LoginActionType LoginActionType { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("LoginActions")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("LoginActions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
