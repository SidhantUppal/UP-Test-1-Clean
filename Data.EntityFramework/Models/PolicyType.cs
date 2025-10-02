using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyType", Schema = "V7")]
public partial class PolicyType
{
    [Key]
    public int PolicyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string TypeName { get; set; } = null!;

    [StringLength(500)]
    public string? TypeDescription { get; set; }

    public bool? RequiresApproval { get; set; }

    public bool? RequiresTraining { get; set; }

    public bool? RequiresAcknowledgment { get; set; }

    public int? ReviewFrequencyMonths { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("PolicyType")]
    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyTypes")]
    public virtual UserArea? UserArea { get; set; }
}
