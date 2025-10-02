using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskContractorCompany", Schema = "V7")]
[Index("TaskID", "ContractorCompanyID", Name = "CK_TaskContractorCompany_Unique", IsUnique = true)]
[Index("TaskID", Name = "IX_TaskContractorCompany_TaskID_includes")]
public partial class TaskContractorCompany
{
    [Key]
    public int TaskContractorCompanyID { get; set; }

    public int TaskID { get; set; }

    public int ContractorCompanyID { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("TaskContractorCompanies")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("TaskContractorCompanies")]
    public virtual BSSTask Task { get; set; } = null!;
}
