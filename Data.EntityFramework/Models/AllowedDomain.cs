using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AllowedDomain", Schema = "V7")]
public partial class AllowedDomain
{
    [Key]
    public int DomainID { get; set; }

    [StringLength(64)]
    public string DomainName { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AllowedDomainArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AllowedDomainCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AllowedDomainModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Domain")]
    public virtual ICollection<UserDomain> UserDomains { get; set; } = new List<UserDomain>();
}
