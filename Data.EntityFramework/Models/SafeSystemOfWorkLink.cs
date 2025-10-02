using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkLink", Schema = "V7")]
public partial class SafeSystemOfWorkLink
{
    [Key]
    public int SafeSystemOfWorkLinkID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    public int? RecordID { get; set; }

    public bool? YesNoNAValue { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public string? Comments { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("SafeSystemOfWorkLinks")]
    public virtual DocumentLinkTableType? DocumentLinkTableType { get; set; }

    [ForeignKey("SafeSystemOfWorkID")]
    [InverseProperty("SafeSystemOfWorkLinks")]
    public virtual SafeSystemOfWork SafeSystemOfWork { get; set; } = null!;

    [InverseProperty("SafeSystemOfWorkLink")]
    public virtual ICollection<SafeSystemOfWorkLinkRecord> SafeSystemOfWorkLinkRecords { get; set; } = new List<SafeSystemOfWorkLinkRecord>();
}
