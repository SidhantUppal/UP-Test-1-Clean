using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkCompetency", Schema = "V7")]
[Index("SafeSystemOfWorkID", "CompetencyID", Name = "CK_SafeSystemOfWorkCompetency_Unique", IsUnique = true)]
[Index("SafeSystemOfWorkID", Name = "IX_SafeSystemOfWorkCompetency_SafeSystemOfWorkID_includes")]
public partial class SafeSystemOfWorkCompetency
{
    [Key]
    public int SafeSystemOfWorkCompetencyID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int CompetencyID { get; set; }

    [ForeignKey("CompetencyID")]
    [InverseProperty("SafeSystemOfWorkCompetencies")]
    public virtual Competency Competency { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkID")]
    [InverseProperty("SafeSystemOfWorkCompetencies")]
    public virtual SafeSystemOfWork SafeSystemOfWork { get; set; } = null!;
}
