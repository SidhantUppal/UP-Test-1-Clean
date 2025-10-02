using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HAVSRegisterEntry", Schema = "V7")]
public partial class HAVSRegisterEntry
{
    [Key]
    public int HAVSRegisterEntryID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? Year { get; set; }

    public int? Month { get; set; }

    public int? Day { get; set; }

    public bool IsOnLeave { get; set; }

    public bool IsOffSick { get; set; }

    public bool IsSubmitted { get; set; }

    public bool IsBlocked { get; set; }

    [StringLength(255)]
    public string? BlockedReason { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public DateOnly EntryDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HAVSRegisterEntryArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HAVSRegisterEntryCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("HAVSRegisterEntries")]
    public virtual Employee Employee { get; set; } = null!;

    [InverseProperty("HAVSRegisterEntry")]
    public virtual ICollection<HAVSRegisterEntryTool> HAVSRegisterEntryTools { get; set; } = new List<HAVSRegisterEntryTool>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HAVSRegisterEntryModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HAVSRegisterEntries")]
    public virtual UserArea UserArea { get; set; } = null!;
}
