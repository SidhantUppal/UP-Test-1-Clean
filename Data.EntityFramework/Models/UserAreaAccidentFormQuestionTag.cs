using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentFormQuestionTag", Schema = "V7")]
[Index("UserAreaAccidentFormQuestionID", "UserAreaAccidentTagID", Name = "CK_UserAreaAccidentFormQuestionTage_Unique", IsUnique = true)]
[Index("UserAreaAccidentTagID", Name = "IX_UserAreaAccidentFormQuestionTag_TagID_includes")]
public partial class UserAreaAccidentFormQuestionTag
{
    [Key]
    public int UserAreaAccidentFormQuestionTagID { get; set; }

    public int UserAreaAccidentFormQuestionID { get; set; }

    public int UserAreaAccidentTagID { get; set; }

    [ForeignKey("UserAreaAccidentFormQuestionID")]
    [InverseProperty("UserAreaAccidentFormQuestionTags")]
    public virtual UserAreaAccidentFormQuestion UserAreaAccidentFormQuestion { get; set; } = null!;

    [ForeignKey("UserAreaAccidentTagID")]
    [InverseProperty("UserAreaAccidentFormQuestionTags")]
    public virtual UserAreaAccidentTag UserAreaAccidentTag { get; set; } = null!;
}
