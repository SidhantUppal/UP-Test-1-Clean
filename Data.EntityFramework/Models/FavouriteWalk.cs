using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FavouriteWalk", Schema = "V7")]
public partial class FavouriteWalk
{
    [Key]
    public int FavouriteWalkID { get; set; }

    public int WalkID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("FavouriteWalkArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("FavouriteWalkCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("FavouriteWalk")]
    public virtual ICollection<EmployeeFavouriteWalk> EmployeeFavouriteWalks { get; set; } = new List<EmployeeFavouriteWalk>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("FavouriteWalkModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("FavouriteWalks")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("WalkID")]
    [InverseProperty("FavouriteWalks")]
    public virtual Walk Walk { get; set; } = null!;
}
