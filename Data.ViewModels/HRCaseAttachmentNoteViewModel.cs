using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseAttachmentNoteViewModel
{
    [Key]
    public int HRCaseAttachmentNoteID { get; set; }

    public int HRCaseAttachmentID { get; set; }

    public string Note { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
