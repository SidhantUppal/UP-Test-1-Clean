using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TribunalCaseEvent", Schema = "V7")]
[Index("TribunalCaseID", Name = "IX_TribunalCaseEvent_TribunalCase")]
public partial class TribunalCaseEvent
{
    [Key]
    public int TribunalCaseEventID { get; set; }

    public int TribunalCaseID { get; set; }

    public int TribunalCaseEventTypeID { get; set; }

    public int? OrderNum { get; set; }

    public DateTimeOffset? EventDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TribunalCaseEventArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TribunalCaseEventCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TribunalCaseEventModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TribunalCaseID")]
    [InverseProperty("TribunalCaseEvents")]
    public virtual TribunalCase TribunalCase { get; set; } = null!;

    [ForeignKey("TribunalCaseEventTypeID")]
    [InverseProperty("TribunalCaseEvents")]
    public virtual TribunalCaseEventType TribunalCaseEventType { get; set; } = null!;
}
