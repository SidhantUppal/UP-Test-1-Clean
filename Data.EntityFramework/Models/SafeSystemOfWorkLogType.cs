using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkLogType", Schema = "V7")]
public partial class SafeSystemOfWorkLogType
{
    [Key]
    public int SafeSystemOfWorkLogTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [InverseProperty("SafeSystemOfWorkLogType")]
    public virtual ICollection<SafeSystemOfWorkLog> SafeSystemOfWorkLogs { get; set; } = new List<SafeSystemOfWorkLog>();
}
