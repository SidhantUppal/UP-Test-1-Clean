using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmployeeFavouriteWalk", Schema = "V7")]
public partial class EmployeeFavouriteWalk
{
    [Key]
    public int EmployeeFavouriteWalkID { get; set; }

    public int FavouriteWalkID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmployeeFavouriteWalkArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmployeeFavouriteWalkCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("EmployeeFavouriteWalks")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("FavouriteWalkID")]
    [InverseProperty("EmployeeFavouriteWalks")]
    public virtual FavouriteWalk FavouriteWalk { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmployeeFavouriteWalkModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmployeeFavouriteWalks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
