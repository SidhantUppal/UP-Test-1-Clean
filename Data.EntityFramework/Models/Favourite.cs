using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Favourite", Schema = "V7")]
public partial class Favourite
{
    [Key]
    public int FavouriteID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int ReportType { get; set; }

    [StringLength(1024)]
    public string URL { get; set; } = null!;

    [StringLength(50)]
    public string? Note { get; set; }

    [StringLength(64)]
    public string? SearchFilterObjectName { get; set; }

    [StringLength(4000)]
    public string? SearchFilterParams { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("FavouriteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("FavouriteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("FavouriteModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("FavouriteUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Favourites")]
    public virtual UserArea UserArea { get; set; } = null!;
}
