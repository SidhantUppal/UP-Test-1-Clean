using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentPersonViewModel
{
    [Key]
    public int AccidentPersonID { get; set; }

    public int? AccidentPersonTypeID { get; set; }

    public int? AccidentCaseID { get; set; }

    public int? EmployeeID { get; set; }

    public int? EmploymentStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int? LocationID { get; set; }

    [StringLength(255)]
    public string? Email { get; set; }

    public int? GenderTypeID { get; set; }

    [StringLength(255)]
    public string? Telephone { get; set; }

    [StringLength(255)]
    public string? Mobile { get; set; }

    public int? Age { get; set; }

    [StringLength(10)]
    public string? NINumber { get; set; }

    public int? MaritalStatusTypeID { get; set; }

    public DateTimeOffset? DateEmploymentStarted { get; set; }

    public int? NumberOfDependents { get; set; }

    public int? AverageEarningPerWeek { get; set; }

    public int? SickPayRate { get; set; }

    public int? MaximumEntitledPeriod { get; set; }

    public bool? IsInjuryResultedInDeath { get; set; }

    public bool? IsInvolvedInjury { get; set; }

    public bool? IsMedicalAttentionRequired { get; set; }

    public bool? IsPeventedFromWork { get; set; }

    public int? DaysOffWork { get; set; }

    public bool? IsBecameUnconscious { get; set; }

    public bool? IsRequiredResuscitation { get; set; }

    public bool? InHostpitalMoreThan24Hours { get; set; }

    public bool? IsLossOfSight { get; set; }

    [StringLength(2000)]
    public string? InjuryDescription { get; set; }

    public int? OrgGroupID { get; set; }

    public int? ParentID { get; set; }

    public int? SeverityOfInjuryTypeID { get; set; }

    public int? InjuryTypeID { get; set; }

    public int? AssessorEmployeeID { get; set; }

    public int? AssessorLocationID { get; set; }

    [StringLength(255)]
    public string? AssessorEmail { get; set; }

    public int? AssessorOrgGroupID { get; set; }

    public bool? WasFirstAidAdministered { get; set; }

    public int? FirstAidAttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(20)]
    public string? Title { get; set; }

    [StringLength(100)]
    public string? FirstName { get; set; }

    [StringLength(100)]
    public string? FamilyName { get; set; }

    [StringLength(255)]
    public string? LocationTitle { get; set; }

    [StringLength(255)]
    public string? Address1 { get; set; }

    [StringLength(255)]
    public string? Address2 { get; set; }

    [StringLength(255)]
    public string? Address3 { get; set; }

    [StringLength(255)]
    public string? Town { get; set; }

    [StringLength(255)]
    public string? County { get; set; }

    [StringLength(20)]
    public string? PostCode { get; set; }

    [StringLength(255)]
    public string? JobTitle { get; set; }

    [StringLength(20)]
    public string? AssessorTitle { get; set; }

    [StringLength(100)]
    public string? AssessorFirstName { get; set; }

    [StringLength(100)]
    public string? AssessorFamilyName { get; set; }

    [StringLength(255)]
    public string? AssessorLocationTitle { get; set; }

    [StringLength(255)]
    public string? AssessorAddress1 { get; set; }

    [StringLength(255)]
    public string? AssessorAddress2 { get; set; }

    [StringLength(255)]
    public string? AssessorAddress3 { get; set; }

    [StringLength(255)]
    public string? AssessorTown { get; set; }

    [StringLength(255)]
    public string? AssessorCounty { get; set; }

    [StringLength(20)]
    public string? AssessorPostCode { get; set; }

    public string? FirstAidApplied { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
