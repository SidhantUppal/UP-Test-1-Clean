using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HAVSRegisterEntryTool", Schema = "V7")]
[Index("HAVSRegisterEntryID", Name = "IX_HAVSRegisterEntryTool_Entry")]
public partial class HAVSRegisterEntryTool
{
    [Key]
    public int HAVSRegisterEntryToolID { get; set; }

    public int HAVSRegisterEntryID { get; set; }

    public int HAVSToolID { get; set; }

    public int UsageHours { get; set; }

    public int UsageMinutes { get; set; }

    public bool IsNotApplicable { get; set; }

    [StringLength(255)]
    public string? ArchivedReason { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HAVSRegisterEntryToolArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HAVSRegisterEntryToolCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HAVSRegisterEntryID")]
    [InverseProperty("HAVSRegisterEntryTools")]
    public virtual HAVSRegisterEntry HAVSRegisterEntry { get; set; } = null!;

    [ForeignKey("HAVSToolID")]
    [InverseProperty("HAVSRegisterEntryTools")]
    public virtual HAVSTool HAVSTool { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HAVSRegisterEntryToolModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
