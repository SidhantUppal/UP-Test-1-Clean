using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseNote", Schema = "V7")]
[Index("AccidentCaseID", "UserAreaID", "ArchivedDate", Name = "IX_AccidentCaseNote_AccidentCaseID_UserAreaID_ArchivedDate")]
public partial class AccidentCaseNote
{
    [Key]
    public int AccidentCaseNoteID { get; set; }

    public int AccidentCaseID { get; set; }

    public string Notes { get; set; } = null!;

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsSignOff { get; set; }

    public string? SignatureText { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseNotes")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseNoteModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentCaseNotes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
