using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentLink", Schema = "V7")]
[Index("FirstID", "FirstTableTypeID", Name = "IX_DocumentLink_FirstID_FirstTableTypeID")]
[Index("FirstTableTypeID", "SecondTableTypeID", "DocumentLinkTypeID", "FirstID", Name = "IX_DocumentLink_FirstTableTypeID_SecondTableTypeID_DocumentLinkTypeID_FirstID_includes")]
[Index("FirstTableTypeID", "SecondTableTypeID", "DocumentLinkTypeID", "UserAreaID", Name = "IX_DocumentLink_FirstTableTypeID_SecondTableTypeID_DocumentLinkTypeID_UserAreaID_includes")]
[Index("SecondID", Name = "IX_DocumentLink_SecondID_includes")]
public partial class DocumentLink
{
    [Key]
    public int DocumentLinkID { get; set; }

    public int FirstID { get; set; }

    public int SecondID { get; set; }

    public int FirstTableTypeID { get; set; }

    public int SecondTableTypeID { get; set; }

    public int DocumentLinkTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? InstanceID { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("DocumentLinks")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("DocumentLinkTypeID")]
    [InverseProperty("DocumentLinks")]
    public virtual DocumentLinkType DocumentLinkType { get; set; } = null!;

    [ForeignKey("FirstTableTypeID")]
    [InverseProperty("DocumentLinkFirstTableTypes")]
    public virtual DocumentLinkTableType FirstTableType { get; set; } = null!;

    [ForeignKey("SecondTableTypeID")]
    [InverseProperty("DocumentLinkSecondTableTypes")]
    public virtual DocumentLinkTableType SecondTableType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("DocumentLinks")]
    public virtual UserArea? UserArea { get; set; }
}
