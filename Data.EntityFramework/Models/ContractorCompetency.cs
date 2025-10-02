using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompetency", Schema = "V7")]
public partial class ContractorCompetency
{
    [Key]
    public int ContractorCompetencyID { get; set; }

    public int UserAreaID { get; set; }

    public int? ContractorCompanyID { get; set; }

    public int? EmployeeID { get; set; }

    public int CompetencyID { get; set; }

    public int? TemplateContractorCompetencyID { get; set; }

    public bool? IsInPlace { get; set; }

    public bool IsExempt { get; set; }

    public DateTimeOffset? ExemptionToDate { get; set; }

    public DateTimeOffset? ValidToDate { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ContractorCompetencyStatusTypeID { get; set; }

    public bool IsOptional { get; set; }

    public bool IsEvidenceMandatory { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorCompetencyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CompetencyID")]
    [InverseProperty("ContractorCompetencies")]
    public virtual Competency Competency { get; set; } = null!;

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorCompetencies")]
    public virtual ContractorCompany? ContractorCompany { get; set; }

    [InverseProperty("ContractorCompetency")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogs { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("ContractorCompetency")]
    public virtual ICollection<ContractorCompetencyAttachment> ContractorCompetencyAttachments { get; set; } = new List<ContractorCompetencyAttachment>();

    [InverseProperty("ContractorCompetency")]
    public virtual ICollection<ContractorCompetencyNote> ContractorCompetencyNotes { get; set; } = new List<ContractorCompetencyNote>();

    [ForeignKey("ContractorCompetencyStatusTypeID")]
    [InverseProperty("ContractorCompetencies")]
    public virtual ContractorCompetencyStatusType? ContractorCompetencyStatusType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorCompetencyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("ContractorCompetencies")]
    public virtual Employee? Employee { get; set; }

    [InverseProperty("TemplateContractorCompetency")]
    public virtual ICollection<ContractorCompetency> InverseTemplateContractorCompetency { get; set; } = new List<ContractorCompetency>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorCompetencyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TemplateContractorCompetencyID")]
    [InverseProperty("InverseTemplateContractorCompetency")]
    public virtual ContractorCompetency? TemplateContractorCompetency { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContractorCompetencies")]
    public virtual UserArea UserArea { get; set; } = null!;
}
