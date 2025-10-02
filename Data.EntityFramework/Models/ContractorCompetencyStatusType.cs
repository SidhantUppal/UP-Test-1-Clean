using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompetencyStatusType", Schema = "V7")]
public partial class ContractorCompetencyStatusType
{
    [Key]
    public int ContractorCompetencyStatusTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("ContractorCompetencyStatusType")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencies { get; set; } = new List<ContractorCompetency>();
}
