using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Update", Schema = "V7")]
public partial class Update
{
    [Key]
    public int UpdateID { get; set; }

    [StringLength(255)]
    public string? Action { get; set; }

    [StringLength(255)]
    public string? Controller { get; set; }

    public string? RouteValues { get; set; }

    public int? UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? ExternalURL { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int UpdateTypeID { get; set; }

    public int? OrderNumber { get; set; }

    [StringLength(150)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UpdateArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UpdateCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UpdateModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UpdateTypeID")]
    [InverseProperty("Updates")]
    public virtual UpdateType UpdateType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Updates")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("Update")]
    public virtual ICollection<UserAreaUpdate> UserAreaUpdates { get; set; } = new List<UserAreaUpdate>();
}
