using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseAssignableUser", Schema = "V7")]
public partial class CaseAssignableUser
{
    [Key]
    public int CaseAssignableUserID { get; set; }

    public int? UserAreaID { get; set; }

    public int UserID { get; set; }

    public int CaseUserTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CaseAssignableUserArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CaseUserTypeID")]
    [InverseProperty("CaseAssignableUsers")]
    public virtual CaseUserType CaseUserType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseAssignableUserCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("CaseAssignableUserUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CaseAssignableUsers")]
    public virtual UserArea? UserArea { get; set; }
}
