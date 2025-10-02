using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BCARMClient", Schema = "V7")]
[Index("BCARMUserAreaInternalID", Name = "UQ__BCARMCli__552D9ED8F0EA5C01", IsUnique = true)]
public partial class BCARMClient
{
    [Key]
    public int BCARMClientID { get; set; }

    public int BCARMUserAreaInternalID { get; set; }

    public bool IsV5Client { get; set; }

    public bool HasNewDesign { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("BCARMClientArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("BCARMClientCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("BCARMClientModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
