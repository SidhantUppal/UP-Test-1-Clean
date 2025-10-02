using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseTimePad", Schema = "V7")]
[Index("HRCaseID", "UserID", "EmulatingUserID", "EndDateTime", Name = "IX_HRCaseTimePad_HRCaseID_EndDateTime_includes")]
[Index("HRCaseID", "UserID", "EmulatingUserID", Name = "IX_HRCaseTimePad_HRCaseID_includes")]
public partial class HRCaseTimePad
{
    [Key]
    public int HRCaseTimePadID { get; set; }

    public int HRCaseID { get; set; }

    public int UserID { get; set; }

    public int? EmulatingUserID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset? EndDateTime { get; set; }

    public int? DurationInMins { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("EmulatingUserID")]
    [InverseProperty("HRCaseTimePadEmulatingUsers")]
    public virtual User? EmulatingUser { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseTimePads")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("HRCaseTimePadUsers")]
    public virtual User User { get; set; } = null!;
}
