using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserWebFavouriteChecklist", Schema = "V7")]
public partial class UserWebFavouriteChecklist
{
    [Key]
    public int UserWebFavouriteChecklistID { get; set; }

    public int FavouriteChecklistID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserWebFavouriteChecklistArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserWebFavouriteChecklistCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("FavouriteChecklistID")]
    [InverseProperty("UserWebFavouriteChecklists")]
    public virtual FavouriteChecklist FavouriteChecklist { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserWebFavouriteChecklistModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserWebFavouriteChecklistUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserWebFavouriteChecklists")]
    public virtual UserArea UserArea { get; set; } = null!;
}
