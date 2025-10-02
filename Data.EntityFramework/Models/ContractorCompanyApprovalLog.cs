using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompanyApprovalLog", Schema = "V7")]
[Index("ContractorCompanyID", "UserAreaID", Name = "IX_ContractorCompanyApprovalLog_ApprovalComments")]
public partial class ContractorCompanyApprovalLog
{
    [Key]
    public int ContractorCompanyApprovalLogID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int? ContractorCompetencyID { get; set; }

    public int? ChecklistEnrolmentID { get; set; }

    public int UserAreaID { get; set; }

    public bool? IsApproved { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorCompanyApprovalLogArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistEnrolmentID")]
    [InverseProperty("ContractorCompanyApprovalLogs")]
    public virtual ChecklistEnrolment? ChecklistEnrolment { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorCompanyApprovalLogs")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [ForeignKey("ContractorCompetencyID")]
    [InverseProperty("ContractorCompanyApprovalLogs")]
    public virtual ContractorCompetency? ContractorCompetency { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorCompanyApprovalLogCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorCompanyApprovalLogModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContractorCompanyApprovalLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
