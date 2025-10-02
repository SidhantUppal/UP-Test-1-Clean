using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmailMessageViewModel
{
    [Key]
    public int EmailMessageID { get; set; }

    [StringLength(255)]
    public string MailboxUIDL { get; set; } = null!;

    [StringLength(100)]
    public string MailboxAddress { get; set; } = null!;

    public bool IsInbound { get; set; }

    public bool InboundIsRead { get; set; }

    [StringLength(150)]
    public string? InboundFromAddress { get; set; }

    public bool IsOutboundDraft { get; set; }

    [StringLength(2265)]
    public string? OutboundToAddresses { get; set; }

    public string Headers { get; set; } = null!;

    [StringLength(150)]
    public string Subject { get; set; } = null!;

    public string HTMLBody { get; set; } = null!;

    public byte TotalAttachments { get; set; }

    public DateTimeOffset? DateTime { get; set; }

    public bool IsFollowUp { get; set; }

    public bool IsDeleted { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
