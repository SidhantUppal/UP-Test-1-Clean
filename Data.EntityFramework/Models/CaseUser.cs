using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseUser", Schema = "V7")]
public partial class CaseUser
{
    [Key]
    public int CaseUserID { get; set; }

    public int CaseID { get; set; }

    public int UserID { get; set; }

    public int CaseUserTypeID { get; set; }

    public bool HasRead { get; set; }

    [ForeignKey("CaseID")]
    [InverseProperty("CaseUsers")]
    public virtual Case Case { get; set; } = null!;

    [ForeignKey("CaseUserTypeID")]
    [InverseProperty("CaseUsers")]
    public virtual CaseUserType CaseUserType { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("CaseUsers")]
    public virtual User User { get; set; } = null!;
}
