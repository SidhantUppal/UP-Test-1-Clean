using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FavouriteRiskAssessment", Schema = "V7")]
public partial class FavouriteRiskAssessment
{
    [Key]
    public int FavouriteRiskAssessmentID { get; set; }

    public int OriginalRiskAssessmentID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsForMobile { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("FavouriteRiskAssessmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("FavouriteRiskAssessmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("FavouriteRiskAssessmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("FavouriteRiskAssessments")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("FavouriteRiskAssessment")]
    public virtual ICollection<UserFavouriteRiskAssessment> UserFavouriteRiskAssessments { get; set; } = new List<UserFavouriteRiskAssessment>();
}
