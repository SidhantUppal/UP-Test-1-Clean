using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssignmentSignatureViewModel
{
    [Key]
    public int SignatureID { get; set; }

    public int AssignmentID { get; set; }

    public int SignerUserID { get; set; }

    [StringLength(50)]
    public string SignatureType { get; set; } = null!;

    [StringLength(50)]
    public string SignatureStatus { get; set; } = null!;

    public DateTimeOffset? SignedDate { get; set; }

    public string? SignatureData { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    [StringLength(255)]
    public string? GeographicLocation { get; set; }

    [StringLength(255)]
    public string? ExternalSignatureID { get; set; }

    [StringLength(100)]
    public string? ExternalStatus { get; set; }

    public string? DeclineReason { get; set; }

    public string? Metadata { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
