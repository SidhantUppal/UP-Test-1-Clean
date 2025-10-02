using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblPortfolio", Schema = "NVQ")]
[Index("AssessorId", Name = "IX_Portfolio_AssessorId")]
[Index("LearnerId", Name = "IX_Portfolio_LearnerId")]
[Index("PortfolioStatusId", Name = "IX_Portfolio_StatusId")]
public partial class tblPortfolio
{
    [Key]
    public int PortfolioId { get; set; }

    public int LearnerId { get; set; }

    public int QualificationId { get; set; }

    public int? AssessorId { get; set; }

    public int? IVId { get; set; }

    public int? PortfolioStatusId { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? TargetEndDate { get; set; }

    public DateTimeOffset? ActualEndDate { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? ProgressPercentage { get; set; }

    public bool? IsActive { get; set; }

    public int? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? UserAreaID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedBy { get; set; }

    [ForeignKey("PortfolioStatusId")]
    [InverseProperty("tblPortfolios")]
    public virtual tblPortfolioStatus? PortfolioStatus { get; set; }

    [InverseProperty("Portfolio")]
    public virtual ICollection<tblAssessmentDiary> tblAssessmentDiaries { get; set; } = new List<tblAssessmentDiary>();

    [InverseProperty("Portfolio")]
    public virtual ICollection<tblEvidence> tblEvidences { get; set; } = new List<tblEvidence>();

    [InverseProperty("Portfolio")]
    public virtual ICollection<tblMonitoringReport> tblMonitoringReports { get; set; } = new List<tblMonitoringReport>();
}
