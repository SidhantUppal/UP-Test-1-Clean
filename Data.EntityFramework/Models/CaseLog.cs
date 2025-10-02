using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseLog", Schema = "V7")]
public partial class CaseLog
{
    [Key]
    public int CaseLogID { get; set; }

    public int CaseID { get; set; }

    public string Comment { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CaseID")]
    [InverseProperty("CaseLogs")]
    public virtual Case Case { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseLogs")]
    public virtual User CreatedByUser { get; set; } = null!;
}
