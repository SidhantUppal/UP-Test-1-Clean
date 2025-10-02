using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskSafetyPhrase", Schema = "V7")]
public partial class RiskSafetyPhrase
{
    [Key]
    public int RiskSafetyPhraseID { get; set; }

    public bool IsRiskPhrase { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(50)]
    public string? temptitle { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskSafetyPhraseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskSafetyPhraseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RiskSafetyPhraseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("RiskSafetyPhrase")]
    public virtual ICollection<RiskAssessmentRiskSafetyPhrase> RiskAssessmentRiskSafetyPhrases { get; set; } = new List<RiskAssessmentRiskSafetyPhrase>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskSafetyPhrases")]
    public virtual UserArea? UserArea { get; set; }
}
