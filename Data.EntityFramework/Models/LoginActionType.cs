using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LoginActionType", Schema = "V7")]
public partial class LoginActionType
{
    [Key]
    public int LoginActionTypeID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [InverseProperty("LoginActionType")]
    public virtual ICollection<LoginAction> LoginActions { get; set; } = new List<LoginAction>();
}
