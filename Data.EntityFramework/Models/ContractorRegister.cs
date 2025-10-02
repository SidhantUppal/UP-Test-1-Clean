using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorRegister", Schema = "V7")]
public partial class ContractorRegister
{
    [Key]
    public int ContractorRegisterID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int? EmployeeID { get; set; }

    public DateTimeOffset? OnsiteFromDate { get; set; }

    public DateTimeOffset? OnsiteToDate { get; set; }

    public bool IsLatest { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? LocationID { get; set; }

    public string? WorkDetails { get; set; }

    [StringLength(100)]
    public string? IndividualName { get; set; }

    [StringLength(100)]
    public string? IndividualJobTitle { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorRegisterArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorRegisters")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorRegisterCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("ContractorRegisters")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("ContractorRegisters")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorRegisterModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
