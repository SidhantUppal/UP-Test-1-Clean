using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Company", Schema = "V7")]
public partial class Company
{
    [Key]
    public int CompanyID { get; set; }

    public int UserAreaID { get; set; }

    public string Name { get; set; } = null!;

    public int CompanyStatusID { get; set; }

    public int LocationID { get; set; }

    [StringLength(255)]
    public string? Email { get; set; }

    public int? OrgGroupID { get; set; }

    public int MainIndustryTypeID { get; set; }

    public int MainActivityTypeID { get; set; }

    public int SubActivityTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CompanyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Company")]
    public virtual ICollection<CompanyInsurance> CompanyInsurances { get; set; } = new List<CompanyInsurance>();

    [ForeignKey("CompanyStatusID")]
    [InverseProperty("Companies")]
    public virtual CompanyStatus CompanyStatus { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CompanyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MainActivityTypeID")]
    [InverseProperty("Companies")]
    public virtual MainActivityType MainActivityType { get; set; } = null!;

    [ForeignKey("MainIndustryTypeID")]
    [InverseProperty("Companies")]
    public virtual MainIndustryType MainIndustryType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CompanyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("Companies")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("SubActivityTypeID")]
    [InverseProperty("Companies")]
    public virtual SubActivityType SubActivityType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Companies")]
    public virtual UserArea UserArea { get; set; } = null!;
}
