using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskPriority", Schema = "V7")]
[Index("PriorityCode", Name = "UQ__TaskPrio__3E2A4474842D4BAB", IsUnique = true)]
public partial class TaskPriority
{
    [Key]
    public int TaskPriorityID { get; set; }

    [StringLength(50)]
    public string PriorityName { get; set; } = null!;

    [StringLength(20)]
    public string PriorityCode { get; set; } = null!;

    public int PriorityLevel { get; set; }

    [StringLength(7)]
    public string? ColorCode { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [InverseProperty("TaskPriority")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();
}
