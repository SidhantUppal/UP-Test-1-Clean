using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CompanyStatus", Schema = "V7")]
public partial class CompanyStatus
{
    [Key]
    public int CompanyStatusID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("CompanyStatus")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();
}
