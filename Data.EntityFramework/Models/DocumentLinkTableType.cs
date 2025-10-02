using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentLinkTableType", Schema = "V7")]
public partial class DocumentLinkTableType
{
    [Key]
    public int DocumentLinkTableTypeID { get; set; }

    [StringLength(50)]
    public string TableName { get; set; } = null!;

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<DocRegisterDocType> DocRegisterDocTypes { get; set; } = new List<DocRegisterDocType>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<DocRegisterEmployee> DocRegisterEmployees { get; set; } = new List<DocRegisterEmployee>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<DocRegisterTask> DocRegisterTasks { get; set; } = new List<DocRegisterTask>();

    [InverseProperty("DocumentType")]
    public virtual ICollection<DocumentEditLockUser> DocumentEditLockUsers { get; set; } = new List<DocumentEditLockUser>();

    [InverseProperty("FirstTableType")]
    public virtual ICollection<DocumentLink> DocumentLinkFirstTableTypes { get; set; } = new List<DocumentLink>();

    [InverseProperty("SecondTableType")]
    public virtual ICollection<DocumentLink> DocumentLinkSecondTableTypes { get; set; } = new List<DocumentLink>();

    [InverseProperty("DocumentLinkTableChildType")]
    public virtual ICollection<DocumentLinkTableLinkType> DocumentLinkTableLinkTypeDocumentLinkTableChildTypes { get; set; } = new List<DocumentLinkTableLinkType>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<DocumentLinkTableLinkType> DocumentLinkTableLinkTypeDocumentLinkTableTypes { get; set; } = new List<DocumentLinkTableLinkType>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<DocumentRegister> DocumentRegisters { get; set; } = new List<DocumentRegister>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainings { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<InductionBundleItem> InductionBundleItems { get; set; } = new List<InductionBundleItem>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItems { get; set; } = new List<PlanCollectionItem>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<ResourceCreditLimit> ResourceCreditLimits { get; set; } = new List<ResourceCreditLimit>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<SafeSystemOfWorkLinkRecord> SafeSystemOfWorkLinkRecords { get; set; } = new List<SafeSystemOfWorkLinkRecord>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<SafeSystemOfWorkLink> SafeSystemOfWorkLinks { get; set; } = new List<SafeSystemOfWorkLink>();

    [InverseProperty("DocumentLinkTableType")]
    public virtual ICollection<UserAreaEntityCacheConfiguration> UserAreaEntityCacheConfigurations { get; set; } = new List<UserAreaEntityCacheConfiguration>();
}
