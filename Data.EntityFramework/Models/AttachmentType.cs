using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AttachmentType", Schema = "V7")]
public partial class AttachmentType
{
    [Key]
    public int AttachmentTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [InverseProperty("AttachmentType")]
    public virtual ICollection<AttachmentBackup> AttachmentBackups { get; set; } = new List<AttachmentBackup>();
}
