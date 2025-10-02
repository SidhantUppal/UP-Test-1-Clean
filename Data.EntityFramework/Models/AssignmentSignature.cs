using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssignmentSignature", Schema = "V7")]
[Index("AssignmentID", Name = "IX_AssignmentSignature_AssignmentID")]
[Index("SignatureStatus", Name = "IX_AssignmentSignature_SignatureStatus")]
[Index("SignedDate", Name = "IX_AssignmentSignature_SignedDate")]
[Index("SignerUserID", Name = "IX_AssignmentSignature_SignerUserID")]
public partial class AssignmentSignature
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

    [ForeignKey("AssignmentID")]
    [InverseProperty("AssignmentSignatures")]
    public virtual DocumentAssignment Assignment { get; set; } = null!;

    [ForeignKey("SignerUserID")]
    [InverseProperty("AssignmentSignatures")]
    public virtual User SignerUser { get; set; } = null!;
}
