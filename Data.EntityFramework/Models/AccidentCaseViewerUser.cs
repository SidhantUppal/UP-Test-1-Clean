using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseViewerUser", Schema = "V7")]
public partial class AccidentCaseViewerUser
{
    [Key]
    public int AccidentCaseViewerUserID { get; set; }

    public int AccidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseViewerUsers")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseViewerUserArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseViewerUserCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseViewerUserModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("AccidentCaseViewerUserUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentCaseViewerUsers")]
    public virtual UserArea UserArea { get; set; } = null!;
}
