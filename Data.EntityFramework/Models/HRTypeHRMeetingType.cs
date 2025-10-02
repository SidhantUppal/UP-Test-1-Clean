using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRTypeHRMeetingType", Schema = "V7")]
[Index("HRTypeID", "HRMeetingTypeID", Name = "CK_HRTypeHRMeetingType_Unique", IsUnique = true)]
[Index("HRTypeID", Name = "IX_HRTypeHRMeetingType_HRTypeID_includes")]
public partial class HRTypeHRMeetingType
{
    [Key]
    public int HRTypeHRMeetingTypeID { get; set; }

    public int HRTypeID { get; set; }

    public int HRMeetingTypeID { get; set; }

    [ForeignKey("HRMeetingTypeID")]
    [InverseProperty("HRTypeHRMeetingTypes")]
    public virtual HRMeetingType HRMeetingType { get; set; } = null!;

    [ForeignKey("HRTypeID")]
    [InverseProperty("HRTypeHRMeetingTypes")]
    public virtual HRType HRType { get; set; } = null!;
}
