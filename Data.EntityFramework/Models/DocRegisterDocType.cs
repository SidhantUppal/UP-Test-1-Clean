using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocRegisterDocType", Schema = "V7")]
public partial class DocRegisterDocType
{
    [Key]
    public int DocRegisterDocTypeID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("DocRegisterDocTypes")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [InverseProperty("DocRegisterDocType")]
    public virtual ICollection<UserAreaDocRegisterDocType> UserAreaDocRegisterDocTypes { get; set; } = new List<UserAreaDocRegisterDocType>();
}
