using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentLinkTableLinkType", Schema = "V7")]
public partial class DocumentLinkTableLinkType
{
    [Key]
    public int DocumentLinkTableLinkTypeID { get; set; }

    public int DocumentLinkTypeID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int DocumentLinkTableChildTypeID { get; set; }

    [ForeignKey("DocumentLinkTableChildTypeID")]
    [InverseProperty("DocumentLinkTableLinkTypeDocumentLinkTableChildTypes")]
    public virtual DocumentLinkTableType DocumentLinkTableChildType { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("DocumentLinkTableLinkTypeDocumentLinkTableTypes")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("DocumentLinkTypeID")]
    [InverseProperty("DocumentLinkTableLinkTypes")]
    public virtual DocumentLinkType DocumentLinkType { get; set; } = null!;
}
