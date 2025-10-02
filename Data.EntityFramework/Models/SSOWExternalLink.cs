using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWExternalLink", Schema = "V7")]
public partial class SSOWExternalLink
{
    [Key]
    public int SSOWExternalLinkID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    public int DocumentID { get; set; }

    [StringLength(255)]
    public string LinkTitle { get; set; } = null!;

    [StringLength(500)]
    public string LinkURL { get; set; } = null!;

    [StringLength(500)]
    public string? LinkDescription { get; set; }

    [StringLength(50)]
    public string? LinkType { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("SSOWExternalLinks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
