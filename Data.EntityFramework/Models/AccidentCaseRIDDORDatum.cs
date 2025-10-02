using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseRIDDORData", Schema = "V7")]
[Index("AccidentCaseID", Name = "IX_AccidentCaseRIDDORData_Data")]
public partial class AccidentCaseRIDDORDatum
{
    [Key]
    public int AccidentCaseRIDDORDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int? LocationTypeID { get; set; }

    public int LocalAuthorityTypeID { get; set; }

    public int? MainIndustryTypeID { get; set; }

    public int? MainActivityTypeID { get; set; }

    public int SubActivityTypeID { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string ReportingSeverity { get; set; } = null!;

    public int WorkProcessTypeID { get; set; }

    public int MainFactorTypeID { get; set; }

    public int IncidentKindID { get; set; }

    public int InjuryTypeID { get; set; }

    public int BodyPartID { get; set; }

    public byte? FallFromHeightInMetres { get; set; }

    public string? FullData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseRIDDORDatumArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("BodyPartID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual BodyPart BodyPart { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseRIDDORDatumCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("IncidentKindID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual IncidentKind IncidentKind { get; set; } = null!;

    [ForeignKey("InjuryTypeID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual InjuryType InjuryType { get; set; } = null!;

    [ForeignKey("LocalAuthorityTypeID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual LocalAuthorityType LocalAuthorityType { get; set; } = null!;

    [ForeignKey("MainFactorTypeID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual MainFactorType MainFactorType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseRIDDORDatumModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SubActivityTypeID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual SubActivityType SubActivityType { get; set; } = null!;

    [ForeignKey("WorkProcessTypeID")]
    [InverseProperty("AccidentCaseRIDDORData")]
    public virtual WorkProcessType WorkProcessType { get; set; } = null!;
}
