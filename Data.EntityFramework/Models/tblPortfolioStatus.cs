using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblPortfolioStatus", Schema = "NVQ")]
public partial class tblPortfolioStatus
{
    [Key]
    public int PortfolioStatusId { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [StringLength(200)]
    public string? StatusDescription { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [InverseProperty("PortfolioStatus")]
    public virtual ICollection<tblPortfolio> tblPortfolios { get; set; } = new List<tblPortfolio>();
}
