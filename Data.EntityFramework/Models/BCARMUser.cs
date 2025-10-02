using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BCARMUser", Schema = "V7")]
public partial class BCARMUser
{
    [Key]
    public int BCARMUserID { get; set; }

    public int? UserID { get; set; }

    public int? EmployeeID { get; set; }

    public int? BCARMUserAreaID { get; set; }

    public int BCARMUserInternalID { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string UserStatus { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string TransactionType { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }
}
