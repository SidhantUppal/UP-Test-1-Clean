using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Country", Schema = "V7")]
public partial class Country
{
    [Key]
    public int CountryID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("Country")]
    public virtual ICollection<GeographicalAreaType> GeographicalAreaTypes { get; set; } = new List<GeographicalAreaType>();
}
