using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ApprovalStatusType", Schema = "V7")]
public partial class ApprovalStatusType
{
    [Key]
    public int ApprovalStatusTypeID { get; set; }

    public bool IsVisible { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("ApprovalStatusType")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();
}
