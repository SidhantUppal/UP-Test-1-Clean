using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSIP", Schema = "V7")]
public partial class SSIP
{
    [Key]
    public int SSIPID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(100)]
    public string Logo { get; set; } = null!;

    [InverseProperty("SSIP")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPs { get; set; } = new List<ContractorCompanySSIP>();
}
