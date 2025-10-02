using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECaseNote", Schema = "V7")]
[Index("DSECaseID", Name = "IX_DSECaseNote_Note")]
public partial class DSECaseNote
{
    [Key]
    public int DSECaseNoteID { get; set; }

    public int DSECaseID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsPrivate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("DSECaseNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DSECaseNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DSECaseID")]
    [InverseProperty("DSECaseNotes")]
    public virtual DSECase DSECase { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("DSECaseNoteModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
