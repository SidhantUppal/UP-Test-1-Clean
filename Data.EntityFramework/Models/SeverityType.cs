using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SeverityType", Schema = "V7")]
public partial class SeverityType
{
    [Key]
    public int SeverityTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? TaskSeverityID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("SeverityType")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("SeverityType")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("SeverityType")]
    public virtual ICollection<AlertTypeEmployee> AlertTypeEmployees { get; set; } = new List<AlertTypeEmployee>();

    [InverseProperty("SeverityType")]
    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("SeverityTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("SeverityTypeCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("SeverityTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskSeverityID")]
    [InverseProperty("SeverityTypes")]
    public virtual TaskSeverity? TaskSeverity { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("SeverityTypes")]
    public virtual UserArea? UserArea { get; set; }
}
