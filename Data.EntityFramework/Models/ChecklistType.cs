using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistType", Schema = "V7")]
public partial class ChecklistType
{
    [Key]
    public int ChecklistTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public bool IsAudit { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("ChecklistType")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();
}
