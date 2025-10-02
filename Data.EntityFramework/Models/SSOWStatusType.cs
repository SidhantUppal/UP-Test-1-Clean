using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWStatusType", Schema = "V7")]
public partial class SSOWStatusType
{
    [Key]
    public int SSOWStatusTypeID { get; set; }

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

    [InverseProperty("SSOWStatusType")]
    public virtual ICollection<SafeWorkingProcedure> SafeWorkingProcedures { get; set; } = new List<SafeWorkingProcedure>();

    [InverseProperty("SSOWStatusType")]
    public virtual ICollection<WorkInstruction> WorkInstructions { get; set; } = new List<WorkInstruction>();
}
