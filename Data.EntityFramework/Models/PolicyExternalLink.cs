using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyExternalLink", Schema = "V7")]
[Index("PolicyID", Name = "IX_PolicyExternalLink_PolicyID")]
public partial class PolicyExternalLink
{
    [Key]
    public int PolicyExternalLinkID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

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

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyExternalLinks")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyExternalLinks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
