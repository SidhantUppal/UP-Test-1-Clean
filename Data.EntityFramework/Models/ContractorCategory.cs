using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCategory", Schema = "V7")]
public partial class ContractorCategory
{
    [Key]
    public int ContractorCategoryID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("ContractorCategory")]
    public virtual ICollection<ContractorCompany> ContractorCompanies { get; set; } = new List<ContractorCompany>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ContractorCategories")]
    public virtual UserArea? UserArea { get; set; }
}
