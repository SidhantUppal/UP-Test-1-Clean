using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentEditLockUser", Schema = "V7")]
public partial class DocumentEditLockUser
{
    [Key]
    public int DocumentEditLockUserId { get; set; }

    public int DocumentTypeID { get; set; }

    public int UserID { get; set; }

    public int DocumentID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("DocumentTypeID")]
    [InverseProperty("DocumentEditLockUsers")]
    public virtual DocumentLinkTableType DocumentType { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("DocumentEditLockUsers")]
    public virtual User User { get; set; } = null!;
}
