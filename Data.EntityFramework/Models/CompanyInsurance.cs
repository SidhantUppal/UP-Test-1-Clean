using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CompanyInsurance", Schema = "V7")]
public partial class CompanyInsurance
{
    [Key]
    public int CompanyInsuranceID { get; set; }

    public int CompanyID { get; set; }

    [StringLength(255)]
    public string PolicyName { get; set; } = null!;

    [StringLength(255)]
    public string? PolicyNumber { get; set; }

    public DateTimeOffset? RenewalDate { get; set; }

    [ForeignKey("CompanyID")]
    [InverseProperty("CompanyInsurances")]
    public virtual Company Company { get; set; } = null!;
}
