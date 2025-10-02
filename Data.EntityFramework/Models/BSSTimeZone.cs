using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BSSTimeZone", Schema = "V7")]
public partial class BSSTimeZone
{
    [Key]
    public int TimeZoneID { get; set; }

    [StringLength(5)]
    public string Code { get; set; } = null!;

    [StringLength(50)]
    public string Name { get; set; } = null!;

    public double UTCOffsetHours { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string DateFormat { get; set; } = null!;

    [InverseProperty("IncidentDateTimeZone")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();
}
