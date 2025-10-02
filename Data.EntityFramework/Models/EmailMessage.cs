using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmailMessage", Schema = "V7")]
public partial class EmailMessage
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmailMessageArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmailMessageCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("EmailMessage")]
    public virtual ICollection<EmailMessageAttachment> EmailMessageAttachments { get; set; } = new List<EmailMessageAttachment>();

    [InverseProperty("EmailMessage")]
    public virtual ICollection<HRCaseEmail> HRCaseEmails { get; set; } = new List<HRCaseEmail>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmailMessageModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
