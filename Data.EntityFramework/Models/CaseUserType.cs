using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseUserType", Schema = "V7")]
public partial class CaseUserType
{
    [Key]
    public int CaseUserTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [InverseProperty("CaseUserType")]
    public virtual ICollection<CaseAssignableUser> CaseAssignableUsers { get; set; } = new List<CaseAssignableUser>();

    [InverseProperty("CaseUserType")]
    public virtual ICollection<CaseUser> CaseUsers { get; set; } = new List<CaseUser>();
}
