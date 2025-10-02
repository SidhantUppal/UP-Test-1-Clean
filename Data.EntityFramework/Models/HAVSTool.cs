using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HAVSTool", Schema = "V7")]
public partial class HAVSTool
{
    [Key]
    public int HAVSToolID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HAVSToolArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HAVSToolCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HAVSTool")]
    public virtual ICollection<HAVSRegisterEntryTool> HAVSRegisterEntryTools { get; set; } = new List<HAVSRegisterEntryTool>();

    [InverseProperty("HAVSTool")]
    public virtual ICollection<HAVSToolApplicableEmployee> HAVSToolApplicableEmployees { get; set; } = new List<HAVSToolApplicableEmployee>();

    [InverseProperty("HAVSTool")]
    public virtual ICollection<HAVSToolBannedEmployee> HAVSToolBannedEmployees { get; set; } = new List<HAVSToolBannedEmployee>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HAVSToolModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HAVSTools")]
    public virtual UserArea UserArea { get; set; } = null!;
}
