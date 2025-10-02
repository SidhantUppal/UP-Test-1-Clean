using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompany", Schema = "V7")]
public partial class ContractorCompany
{
    [Key]
    public int ContractorCompanyID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(256)]
    public string Name { get; set; } = null!;

    public int AddressID { get; set; }

    [StringLength(50)]
    public string? PhoneNumber { get; set; }

    public int ContractorCategoryID { get; set; }

    public int Status { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(150)]
    public string? ContactName { get; set; }

    [StringLength(255)]
    public string? ContactEmail { get; set; }

    [StringLength(255)]
    public string? WebsiteURL { get; set; }

    public bool IsCompliantCachedValue { get; set; }

    public bool IsBlacklisted { get; set; }

    [StringLength(255)]
    public string? BlacklistedReason { get; set; }

    public int? DefaultChecklistID { get; set; }

    public int? CompletedQuestionnaireResponseID { get; set; }

    public bool AllowSignInWhenNonCompliant { get; set; }

    public int? ContractorTypeID { get; set; }

    public bool IsBranch { get; set; }

    public bool IsSignedOff { get; set; }

    public bool HasSubContractors { get; set; }

    [ForeignKey("AddressID")]
    [InverseProperty("ContractorCompanies")]
    public virtual Address Address { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorCompanyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [ForeignKey("CompletedQuestionnaireResponseID")]
    [InverseProperty("ContractorCompanies")]
    public virtual QuestionnaireResponse? CompletedQuestionnaireResponse { get; set; }

    [ForeignKey("ContractorCategoryID")]
    [InverseProperty("ContractorCompanies")]
    public virtual ContractorCategory ContractorCategory { get; set; } = null!;

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorCompanyApprovalLog> ContractorCompanyApprovalLogs { get; set; } = new List<ContractorCompanyApprovalLog>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorCompanyAttachment> ContractorCompanyAttachments { get; set; } = new List<ContractorCompanyAttachment>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorCompanyLog> ContractorCompanyLogs { get; set; } = new List<ContractorCompanyLog>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorCompanySSIP> ContractorCompanySSIPs { get; set; } = new List<ContractorCompanySSIP>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorCompetency> ContractorCompetencies { get; set; } = new List<ContractorCompetency>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorRegister> ContractorRegisters { get; set; } = new List<ContractorRegister>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccesses { get; set; } = new List<ContractorSiteAccess>();

    [ForeignKey("ContractorTypeID")]
    [InverseProperty("ContractorCompanies")]
    public virtual ContractorType? ContractorType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorCompanyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultChecklistID")]
    [InverseProperty("ContractorCompanies")]
    public virtual Checklist? DefaultChecklist { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorCompanyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("ContractorCompany")]
    public virtual ICollection<TaskContractorCompany> TaskContractorCompanies { get; set; } = new List<TaskContractorCompany>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContractorCompanies")]
    public virtual UserArea UserArea { get; set; } = null!;
}
