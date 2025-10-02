using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompanyLog", Schema = "V7")]
public partial class ContractorCompanyLog
{
    [Key]
    public int ContractorCompanyLogID { get; set; }

    public int UserAreaID { get; set; }

    public int ContractorCompanyID { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public DateOnly LoggedDate { get; set; }

    public int LoggedByUserID { get; set; }

    [StringLength(100)]
    public string? LoggedByFullName { get; set; }

    [StringLength(100)]
    public string? LoggedByJobTitle { get; set; }

    public string? LoggedBySignature { get; set; }

    public bool IsApproved { get; set; }

    public byte SignOffStage { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorCompanyLogs")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [ForeignKey("LoggedByUserID")]
    [InverseProperty("ContractorCompanyLogs")]
    public virtual User LoggedByUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContractorCompanyLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
