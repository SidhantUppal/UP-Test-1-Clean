using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SubActivityType", Schema = "V7")]
public partial class SubActivityType
{
    [Key]
    public int SubActivityTypeID { get; set; }

    public int MainActivityTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("SubActivityType")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("SubActivityType")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    [InverseProperty("SubActivityType")]
    public virtual ICollection<UserAreaActivity> UserAreaActivities { get; set; } = new List<UserAreaActivity>();
}
