using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseSeverityType", Schema = "V7")]
public partial class TribunalCaseSeverityType
{
    [Key]
    public int TribunalCaseSeverityTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseSeverityTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseSeverityTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseSeverityTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TribunalCaseSeverityType")]
    public virtual ICollection<TribunalCaseAttachment> TribunalCaseAttachments { get; set; } = new List<TribunalCaseAttachment>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseSeverityTypes")]
    public virtual UserArea? UserArea { get; set; }
}
