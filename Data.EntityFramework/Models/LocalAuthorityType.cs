using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LocalAuthorityType", Schema = "V7")]
public partial class LocalAuthorityType
{
    [Key]
    public int LocalAuthorityTypeID { get; set; }

    public int GeographicalAreaTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("LocalAuthorityType")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [ForeignKey("GeographicalAreaTypeID")]
    [InverseProperty("LocalAuthorityTypes")]
    public virtual GeographicalAreaType GeographicalAreaType { get; set; } = null!;
}
