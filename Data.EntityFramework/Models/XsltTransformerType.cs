using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("XsltTransformerType", Schema = "V7")]
public partial class XsltTransformerType
{
    [Key]
    public int XsltTransformerTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [InverseProperty("XsltTransformerType")]
    public virtual ICollection<MonitoringReportXsltTransformer> MonitoringReportXsltTransformers { get; set; } = new List<MonitoringReportXsltTransformer>();
}
