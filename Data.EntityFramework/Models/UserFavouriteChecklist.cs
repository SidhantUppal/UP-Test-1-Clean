using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserFavouriteChecklist", Schema = "V7")]
public partial class UserFavouriteChecklist
{
    [Key]
    public int UserFavouriteChecklistID { get; set; }

    public int FavouriteChecklistID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserFavouriteChecklistArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserFavouriteChecklistCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("UserFavouriteChecklists")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("FavouriteChecklistID")]
    [InverseProperty("UserFavouriteChecklists")]
    public virtual FavouriteChecklist FavouriteChecklist { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserFavouriteChecklistModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserFavouriteChecklists")]
    public virtual UserArea UserArea { get; set; } = null!;
}
