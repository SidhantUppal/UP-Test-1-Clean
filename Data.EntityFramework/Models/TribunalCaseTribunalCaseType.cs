using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseTribunalCaseType", Schema = "V7")]
[Index("TribunalCaseID", Name = "IX_TribunalCaseTribunalCaseType_TribunalCase")]
public partial class TribunalCaseTribunalCaseType
{
    [Key]
    public int TribunalCaseTribunalCaseTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int TribunalCaseID { get; set; }

    public int TribunalCaseTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseTribunalCaseTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseTribunalCaseTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseTribunalCaseTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseTribunalCaseTypes")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [ForeignKey("TribunalCaseTypeID")]
    [InverseProperty("TribunalCaseTribunalCaseTypes")]
    public virtual TribunalCaseType TribunalCaseType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseTribunalCaseTypes")]
    public virtual UserArea? UserArea { get; set; }
}
