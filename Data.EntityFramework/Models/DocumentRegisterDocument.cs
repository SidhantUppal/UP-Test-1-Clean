using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentRegisterDocument", Schema = "V7")]
[Index("DocumentRegisterID", "DocumentID", Name = "CK_DocumentRegisterDocument_Unique", IsUnique = true)]
[Index("DocumentID", Name = "IX_DocumentRegisterDocument_DocumentID_includes")]
[Index("DocumentRegisterID", Name = "IX_DocumentRegisterDocument_DocumentRegisterID_includes")]
public partial class DocumentRegisterDocument
{
    [Key]
    public int DocumentRegisterDocumentID { get; set; }

    public int DocumentRegisterID { get; set; }

    public int DocumentID { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal Version { get; set; }

    [ForeignKey("DocumentRegisterID")]
    [InverseProperty("DocumentRegisterDocuments")]
    public virtual DocumentRegister DocumentRegister { get; set; } = null!;

    [InverseProperty("DocumentRegisterDocument")]
    public virtual ICollection<DocumentRegisterDocumentTask> DocumentRegisterDocumentTasks { get; set; } = new List<DocumentRegisterDocumentTask>();
}
