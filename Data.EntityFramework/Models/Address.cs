using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Address", Schema = "V7")]
public partial class Address
{
    [Key]
    public int AddressID { get; set; }

    [StringLength(255)]
    public string? Line1 { get; set; }

    [StringLength(255)]
    public string? Line2 { get; set; }

    [StringLength(255)]
    public string? Line3 { get; set; }

    [StringLength(50)]
    public string? TownCity { get; set; }

    [StringLength(50)]
    public string? County { get; set; }

    [StringLength(8)]
    public string? PostCode { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AddressNavigation")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AddressArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("HomeAddress")]
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    [InverseProperty("Address")]
    public virtual ICollection<ContractorCompany> ContractorCompanies { get; set; } = new List<ContractorCompany>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AddressCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AddressModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
