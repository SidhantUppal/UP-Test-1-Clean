using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistResponseData", Schema = "V7")]
public partial class ChecklistResponseDatum
{
    [Key]
    public int ChecklistResponseDataID { get; set; }

    public int UserAreaFormResponseID { get; set; }

    public string ResponseJSON { get; set; } = null!;

    public int? TotalScore { get; set; }

    public int? MaxPossibleScore { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? CompletionPercent { get; set; }

    public bool? FailedCritical { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistResponseDatumCreatedByUsers")]
    public virtual Employee CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistResponseDatumModifiedByUsers")]
    public virtual Employee? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaFormResponseID")]
    [InverseProperty("ChecklistResponseData")]
    public virtual UserAreaFormResponse UserAreaFormResponse { get; set; } = null!;
}
