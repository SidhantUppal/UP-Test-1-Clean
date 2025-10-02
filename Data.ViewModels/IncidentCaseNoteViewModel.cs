using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentCaseNoteViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
