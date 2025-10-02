using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Event", Schema = "V7")]
public partial class Event
{
    [Key]
    public int EventID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? LocationID { get; set; }

    public DateTimeOffset? FromDate { get; set; }

    public DateTimeOffset? ToDate { get; set; }

    public DateTimeOffset? LiveFromDate { get; set; }

    public DateTimeOffset? LiveToDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? SystemProductTypeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EventArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EventCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("Event")]
    public virtual ICollection<EventAudience> EventAudiences { get; set; } = new List<EventAudience>();

    [InverseProperty("Event")]
    public virtual ICollection<EventTagType> EventTagTypes { get; set; } = new List<EventTagType>();

    [ForeignKey("LocationID")]
    [InverseProperty("Events")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EventModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SystemProductTypeID")]
    [InverseProperty("Events")]
    public virtual SystemProductType? SystemProductType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Events")]
    public virtual UserArea? UserArea { get; set; }
}
