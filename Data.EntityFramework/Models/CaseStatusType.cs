using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseStatusType", Schema = "V7")]
public partial class CaseStatusType
{
    [Key]
    public int CaseStatusTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("CaseStatusType")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}
