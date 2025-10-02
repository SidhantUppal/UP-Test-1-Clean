using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkLinkRecord", Schema = "V7")]
public partial class SafeSystemOfWorkLinkRecord
{
    [Key]
    public int SafeSystemOfWorkLinkRecordID { get; set; }

    public int SafeSystemOfWorkLinkID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int RecordID { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("SafeSystemOfWorkLinkRecords")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkLinkID")]
    [InverseProperty("SafeSystemOfWorkLinkRecords")]
    public virtual SafeSystemOfWorkLink SafeSystemOfWorkLink { get; set; } = null!;
}
