using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InboundEmailViewModel
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

    // Additional Properties
}
