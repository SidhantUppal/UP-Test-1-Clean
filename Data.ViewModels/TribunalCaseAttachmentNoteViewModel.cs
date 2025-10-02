using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseAttachmentNoteViewModel
{
    [Key]
    public int TribunalCaseAttachmentNoteID { get; set; }

    public int TribunalCaseAttachmentID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
