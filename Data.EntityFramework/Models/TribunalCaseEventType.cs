using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseEventType", Schema = "V7")]
public partial class TribunalCaseEventType
{
    [Key]
    public int TribunalCaseEventTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool IsMandatory { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseEventTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseEventTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseEventTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TribunalCaseEventType")]
    public virtual ICollection<TribunalCaseAttachment> TribunalCaseAttachments { get; set; } = new List<TribunalCaseAttachment>();

    [InverseProperty("TribunalCaseEventType")]
    public virtual ICollection<TribunalCaseEvent> TribunalCaseEvents { get; set; } = new List<TribunalCaseEvent>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TribunalCaseEventTypes")]
    public virtual UserArea? UserArea { get; set; }
}
