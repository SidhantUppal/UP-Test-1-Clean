using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentSignature", Schema = "V7")]
[Index("DocumentID", Name = "IX_DocumentSignature_DocumentID")]
[Index("SignerUserID", Name = "IX_DocumentSignature_SignerUserID")]
[Index("SignatureStatus", Name = "IX_DocumentSignature_Status")]
public partial class DocumentSignature
{
    [Key]
    public int SignatureID { get; set; }

    public int DocumentID { get; set; }

    public int SignerUserID { get; set; }

    [StringLength(50)]
    public string SignatureProvider { get; set; } = null!;

    [StringLength(50)]
    public string SignatureStatus { get; set; } = null!;

    public DateTimeOffset? SignedAt { get; set; }

    public string? SignatureData { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? SignedDocumentUrl { get; set; }

    public DateTimeOffset? ExpiresAt { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("DocumentID")]
    [InverseProperty("DocumentSignatures")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("SignerUserID")]
    [InverseProperty("DocumentSignatures")]
    public virtual User SignerUser { get; set; } = null!;
}
