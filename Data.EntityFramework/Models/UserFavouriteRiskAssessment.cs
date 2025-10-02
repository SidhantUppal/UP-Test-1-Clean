using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserFavouriteRiskAssessment", Schema = "V7")]
public partial class UserFavouriteRiskAssessment
{
    [Key]
    public int UserFavouriteRiskAssessmentID { get; set; }

    public int FavouriteRiskAssessmentID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserFavouriteRiskAssessmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserFavouriteRiskAssessmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("UserFavouriteRiskAssessments")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("FavouriteRiskAssessmentID")]
    [InverseProperty("UserFavouriteRiskAssessments")]
    public virtual FavouriteRiskAssessment FavouriteRiskAssessment { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserFavouriteRiskAssessmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserFavouriteRiskAssessments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
