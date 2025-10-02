using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCase", Schema = "V7")]
public partial class TribunalCase
{
    [Key]
    public int TribunalCaseID { get; set; }

    public int TribunalCaseStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int? ClaimantEmployeeID { get; set; }

    [StringLength(255)]
    public string? Claimant { get; set; }

    [StringLength(255)]
    public string? Respondant { get; set; }

    [StringLength(40)]
    public string? Reference { get; set; }

    public DateTimeOffset? SetupDate { get; set; }

    public DateTimeOffset? HearingDate { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("TribunalCase")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [ForeignKey("ClaimantEmployeeID")]
    [InverseProperty("TribunalCaseClaimantEmployees")]
    public virtual Employee? ClaimantEmployee { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("TribunalCaseManagerEmployees")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseAttachment> TribunalCaseAttachments { get; set; } = new List<TribunalCaseAttachment>();

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseContact> TribunalCaseContacts { get; set; } = new List<TribunalCaseContact>();

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseCounsel> TribunalCaseCounsels { get; set; } = new List<TribunalCaseCounsel>();

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseDistribution> TribunalCaseDistributions { get; set; } = new List<TribunalCaseDistribution>();

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseEvent> TribunalCaseEvents { get; set; } = new List<TribunalCaseEvent>();

    [ForeignKey("TribunalCaseStatusTypeID")]
    [InverseProperty("TribunalCases")]
    public virtual TribunalCaseStatusType TribunalCaseStatusType { get; set; } = null!;

    [InverseProperty("TribunalCase")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypes { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCases")]
    public virtual UserArea UserArea { get; set; } = null!;
}
