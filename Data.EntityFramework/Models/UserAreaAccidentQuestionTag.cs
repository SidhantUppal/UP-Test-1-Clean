using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentQuestionTag", Schema = "V7")]
[Index("UserAreaAccidentFormID", "OriginalUserAreaAccidentQuestionID", "UserAreaAccidentTagID", Name = "CK_UserAreaAccidentQuestionTag_Unique", IsUnique = true)]
[Index("UserAreaAccidentTagID", Name = "IX_UserAreaAccidentQuestionTag_TagID_includes")]
public partial class UserAreaAccidentQuestionTag
{
    [Key]
    public int UserAreaAccidentQuestionTagID { get; set; }

    public int UserAreaAccidentFormID { get; set; }

    public int OriginalUserAreaAccidentQuestionID { get; set; }

    public int UserAreaAccidentTagID { get; set; }

    [ForeignKey("OriginalUserAreaAccidentQuestionID")]
    [InverseProperty("UserAreaAccidentQuestionTags")]
    public virtual UserAreaAccidentQuestion OriginalUserAreaAccidentQuestion { get; set; } = null!;

    [ForeignKey("UserAreaAccidentFormID")]
    [InverseProperty("UserAreaAccidentQuestionTags")]
    public virtual UserAreaAccidentForm UserAreaAccidentForm { get; set; } = null!;

    [ForeignKey("UserAreaAccidentTagID")]
    [InverseProperty("UserAreaAccidentQuestionTags")]
    public virtual UserAreaAccidentTag UserAreaAccidentTag { get; set; } = null!;
}
