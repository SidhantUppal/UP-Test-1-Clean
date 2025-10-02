using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseTextBlockCollection", Schema = "V7")]
[Index("TextBlockCollectionID", "HRCaseID", "HRCaseMeetingID", Name = "CK_HRCaseTextBlockCollection_Unique", IsUnique = true)]
[Index("HRCaseID", Name = "IX_HRCaseTextBlockCollection_HRCaseID_includes")]
public partial class HRCaseTextBlockCollection
{
    [Key]
    public int HRCaseTextBlockCollectionID { get; set; }

    public int TextBlockCollectionID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseTextBlockCollections")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseTextBlockCollections")]
    public virtual HRCaseMeeting? HRCaseMeeting { get; set; }

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("HRCaseTextBlockCollections")]
    public virtual TextBlockCollection TextBlockCollection { get; set; } = null!;
}
