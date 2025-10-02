using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Index("FromAddress", Name = "IX_InboundEmails_FromAddress")]
[Index("Processed", Name = "IX_InboundEmails_Processed")]
[Index("Provider", Name = "IX_InboundEmails_Provider")]
[Index("ReceivedAt", Name = "IX_InboundEmails_ReceivedAt")]
[Index("ToAddress", Name = "IX_InboundEmails_ToAddress")]
[Index("MessageId", Name = "UQ__InboundE__C87C0C9DB259A071", IsUnique = true)]
public partial class InboundEmail
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(255)]
    public string MessageId { get; set; } = null!;

    [StringLength(255)]
    public string FromAddress { get; set; } = null!;

    [StringLength(255)]
    public string ToAddress { get; set; } = null!;

    [StringLength(500)]
    public string? Subject { get; set; }

    public string? TextBody { get; set; }

    public string? HtmlBody { get; set; }

    public string? Headers { get; set; }

    [StringLength(50)]
    public string Provider { get; set; } = null!;

    public string? ProviderData { get; set; }

    public bool? Processed { get; set; }

    public DateTime? ProcessedAt { get; set; }

    public DateTime? ReceivedAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    [InverseProperty("Email")]
    public virtual ICollection<EmailAttachment> EmailAttachments { get; set; } = new List<EmailAttachment>();
}
