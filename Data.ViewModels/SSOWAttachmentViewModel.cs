using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SSOWAttachmentViewModel
{
    [Key]
    public int SSOWAttachmentID { get; set; }

    public int UserAreaID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    public int DocumentID { get; set; }

    [StringLength(50)]
    public string? AttachmentType { get; set; }

    [StringLength(255)]
    public string AttachmentTitle { get; set; } = null!;

    [StringLength(500)]
    public string? AttachmentDescription { get; set; }

    public int? SequenceOrder { get; set; }

    public bool? IsRequired { get; set; }

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
