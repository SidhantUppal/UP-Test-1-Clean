using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseViewerUser", Schema = "V7")]
public partial class HRCaseViewerUser
{
    [Key]
    public int HRCaseViewerUserID { get; set; }

    public int HRCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseViewerUsers")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("HRCaseViewerUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("HRCaseViewerUsers")]
    public virtual UserArea UserArea { get; set; } = null!;
}
