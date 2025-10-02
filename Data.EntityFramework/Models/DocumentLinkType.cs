using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentLinkType", Schema = "V7")]
public partial class DocumentLinkType
{
    [Key]
    public int DocumentLinkTypeID { get; set; }

    [StringLength(50)]
    public string LinkName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? PermissionID { get; set; }

    [InverseProperty("DocumentLinkType")]
    public virtual ICollection<DocumentLinkTableLinkType> DocumentLinkTableLinkTypes { get; set; } = new List<DocumentLinkTableLinkType>();

    [InverseProperty("DocumentLinkType")]
    public virtual ICollection<DocumentLink> DocumentLinks { get; set; } = new List<DocumentLink>();

    [ForeignKey("PermissionID")]
    [InverseProperty("DocumentLinkTypes")]
    public virtual Permission? Permission { get; set; }
}
