using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECaseType", Schema = "V7")]
public partial class DSECaseType
{
    [Key]
    public int DSECaseTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("DSECaseType")]
    public virtual ICollection<DSECase> DSECases { get; set; } = new List<DSECase>();
}
