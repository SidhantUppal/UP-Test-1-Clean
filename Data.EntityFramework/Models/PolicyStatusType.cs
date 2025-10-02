using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyStatusType", Schema = "V7")]
public partial class PolicyStatusType
{
    [Key]
    public int PolicyStatusTypeID { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [StringLength(200)]
    public string? StatusDescription { get; set; }

    [StringLength(50)]
    public string StatusCategory { get; set; } = null!;

    [StringLength(7)]
    public string? ColorCode { get; set; }

    public int? WorkflowOrder { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [InverseProperty("PolicyStatusType")]
    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();
}
