using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccessPersonnel", Schema = "V7")]
public partial class ContractorSiteAccessPersonnel
{
    [Key]
    public int ContractorSiteAccessPersonnelID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int? EmployeeID { get; set; }

    [StringLength(100)]
    public string? AltPersonName { get; set; }

    [StringLength(255)]
    public string? AltPersonEmail { get; set; }

    public bool HasArrived { get; set; }

    public bool HasAuthorisation { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsAuthorisationOverridden { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorSiteAccessPersonnelArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorSiteAccessID")]
    [InverseProperty("ContractorSiteAccessPersonnel")]
    public virtual ContractorSiteAccess ContractorSiteAccess { get; set; } = null!;

    [InverseProperty("ContractorSiteAccessPersonnel")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; } = new List<ContractorSiteAccessRequirement>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorSiteAccessPersonnelCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("ContractorSiteAccessPersonnel")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorSiteAccessPersonnelModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
