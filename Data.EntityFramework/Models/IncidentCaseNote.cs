using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentCaseNote", Schema = "V7")]
[Index("IncidentCaseID", "UserAreaID", "ArchivedDate", Name = "IX_IncidentCaseNote_IncidentCaseID_UserAreaID_Archived")]
public partial class IncidentCaseNote
{
    [Key]
    public int CaseNoteID { get; set; }

    public int IncidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    public string NoteText { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    [StringLength(255)]
    public string CreatedByName { get; set; } = null!;

    public DateTimeOffset ModifiedDate { get; set; }

    public int ModifiedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool? IsDeleted { get; set; }

    [ForeignKey("IncidentCaseID")]
    [InverseProperty("IncidentCaseNotes")]
    public virtual IncidentCase IncidentCase { get; set; } = null!;
}
