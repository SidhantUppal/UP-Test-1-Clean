using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseType", Schema = "V7")]
public partial class TribunalCaseType
{
    [Key]
    public int TribunalCaseTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool IsOnActiveList { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TribunalCaseType")]
    public virtual ICollection<TribunalCaseTribunalCaseType> TribunalCaseTribunalCaseTypes { get; set; } = new List<TribunalCaseTribunalCaseType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseTypes")]
    public virtual UserArea? UserArea { get; set; }
}
