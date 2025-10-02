using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireResponseNoteViewModel
{
    [Key]
    public int QuestionnaireResponseNoteID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public string Notes { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
