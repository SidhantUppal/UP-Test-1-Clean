using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockApprovalLog", Schema = "V7")]
[Index("TextBlockID", "UserAreaID", Name = "IX_TextBlockApprovalLog_ApprovalComments")]
public partial class TextBlockApprovalLog
{
    [Key]
    public int TextBlockApprovalLogID { get; set; }

    public int TextBlockID { get; set; }

    public int UserAreaID { get; set; }

    public bool? IsApproved { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TextBlockApprovalLogArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockApprovalLogCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TextBlockApprovalLogModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockApprovalLogs")]
    public virtual TextBlock TextBlock { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TextBlockApprovalLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
