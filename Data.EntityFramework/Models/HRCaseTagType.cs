using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseTagType", Schema = "V7")]
[Index("HRCaseID", "TagTypeID", Name = "CK_HRCaseTagType_Unique", IsUnique = true)]
[Index("HRCaseID", Name = "IX_HRCaseTagType_HRCase_includes")]
[Index("TagTypeID", Name = "IX_HRCaseTagType_TagType_includes")]
public partial class HRCaseTagType
{
    [Key]
    public int HRCaseTagTypeID { get; set; }

    public int HRCaseID { get; set; }

    public int TagTypeID { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseTagTypes")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("TagTypeID")]
    [InverseProperty("HRCaseTagTypes")]
    public virtual TagType TagType { get; set; } = null!;
}
