using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseCounsel", Schema = "V7")]
public partial class TribunalCaseCounsel
{
    [Key]
    public int TribunalCaseCounselID { get; set; }

    public int TribunalCaseID { get; set; }

    public int CounselID { get; set; }

    public DateTimeOffset? AssignedToCaseDate { get; set; }

    public bool HasAccessToCase { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseCounselArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CounselID")]
    [InverseProperty("TribunalCaseCounsels")]
    public virtual Counsel Counsel { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseCounselCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseCounselModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseCounsels")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseCounsels")]
    public virtual UserArea? UserArea { get; set; }
}
