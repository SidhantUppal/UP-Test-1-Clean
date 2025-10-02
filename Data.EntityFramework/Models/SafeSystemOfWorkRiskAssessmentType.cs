using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkRiskAssessmentType", Schema = "V7")]
public partial class SafeSystemOfWorkRiskAssessmentType
{
    [Key]
    public int SafeSystemOfWorkRiskAssessmentTypeID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Reference { get; set; }

    public bool HasRelatedRiskAssessments { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }
}
