using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseExport", Schema = "V7")]
public partial class AccidentCaseExport
{
    [Key]
    public int AccidentCaseExportID { get; set; }

    public int AccidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    public byte[] ExportData { get; set; } = null!;

    public string? EmailedTo { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseExports")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseExports")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentCaseExports")]
    public virtual UserArea UserArea { get; set; } = null!;
}
