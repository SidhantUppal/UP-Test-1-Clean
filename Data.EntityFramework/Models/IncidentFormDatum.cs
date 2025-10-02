using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("IncidentFormData", Schema = "V7")]
public partial class IncidentFormDatum
{
    [Key]
    public int IncidentFormDataID { get; set; }

    public int? IncidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int IncidentTypeID { get; set; }

    public string? FormData { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    public DateTimeOffset? SubmittedDate { get; set; }

    public int? SubmittedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int ModifiedByUserID { get; set; }

    public bool? IsDeleted { get; set; }

    [ForeignKey("IncidentCaseID")]
    [InverseProperty("IncidentFormData")]
    public virtual IncidentCase? IncidentCase { get; set; }

    [ForeignKey("IncidentTypeID")]
    [InverseProperty("IncidentFormData")]
    public virtual IncidentType IncidentType { get; set; } = null!;
}
