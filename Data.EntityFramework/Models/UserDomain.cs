using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserDomain", Schema = "V7")]
public partial class UserDomain
{
    [Key]
    public int UserDomainID { get; set; }

    public int UserID { get; set; }

    public int DomainID { get; set; }

    [ForeignKey("DomainID")]
    [InverseProperty("UserDomains")]
    public virtual AllowedDomain Domain { get; set; } = null!;
}
