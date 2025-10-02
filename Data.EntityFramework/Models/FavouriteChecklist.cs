using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FavouriteChecklist", Schema = "V7")]
public partial class FavouriteChecklist
{
    [Key]
    public int FavouriteChecklistID { get; set; }

    public int ChecklistID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsForMobile { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("FavouriteChecklistArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ChecklistID")]
    [InverseProperty("FavouriteChecklists")]
    public virtual Checklist Checklist { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("FavouriteChecklistCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("FavouriteChecklistModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("FavouriteChecklists")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("FavouriteChecklist")]
    public virtual ICollection<UserFavouriteChecklist> UserFavouriteChecklists { get; set; } = new List<UserFavouriteChecklist>();

    [InverseProperty("FavouriteChecklist")]
    public virtual ICollection<UserWebFavouriteChecklist> UserWebFavouriteChecklists { get; set; } = new List<UserWebFavouriteChecklist>();
}
