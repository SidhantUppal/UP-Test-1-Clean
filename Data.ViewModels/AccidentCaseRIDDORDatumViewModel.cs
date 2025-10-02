using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCaseRIDDORDatumViewModel
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

    // Additional Properties
}
