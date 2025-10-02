using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DSECaseStatusType", Schema = "V7")]
public partial class DSECaseStatusType
{
    [Key]
    public int DSECaseStatusTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("DSECaseStatusType")]
    public virtual ICollection<DSECase> DSECases { get; set; } = new List<DSECase>();
}
