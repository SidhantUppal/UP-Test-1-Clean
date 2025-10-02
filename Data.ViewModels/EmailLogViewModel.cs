using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmailLogViewModel
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(1000)]
    public string ToAddress { get; set; } = null!;

    [StringLength(255)]
    public string FromAddress { get; set; } = null!;

    [StringLength(500)]
    public string Subject { get; set; } = null!;

    [StringLength(50)]
    public string Provider { get; set; } = null!;

    [StringLength(255)]
    public string? MessageId { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = null!;

    public string? ErrorMessage { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? SentAt { get; set; }

    public DateTime? DeliveredAt { get; set; }

    // Additional Properties
}
