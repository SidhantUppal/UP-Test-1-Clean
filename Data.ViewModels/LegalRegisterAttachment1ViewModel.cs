using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LegalRegisterAttachment1ViewModel
{
    [Key]
    public int LegalRegisterAttachmentID { get; set; }

    public int LegalRegisterID { get; set; }

    public int AttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
