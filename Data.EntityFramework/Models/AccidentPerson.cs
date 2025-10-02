using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentPerson", Schema = "V7")]
public partial class AccidentPerson
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
    [Unicode(false)]
    public string? Title { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? FirstName { get; set; }

    [StringLength(100)]
    [Unicode(false)]
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

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentPeople")]
    public virtual AccidentCase? AccidentCase { get; set; }

    [InverseProperty("AccidentPerson")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("AccidentPerson")]
    public virtual ICollection<AccidentPersonBodyPart> AccidentPersonBodyParts { get; set; } = new List<AccidentPersonBodyPart>();

    [ForeignKey("AccidentPersonTypeID")]
    [InverseProperty("AccidentPeople")]
    public virtual AccidentPersonType? AccidentPersonType { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentPersonArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssessorEmployeeID")]
    [InverseProperty("AccidentPersonAssessorEmployees")]
    public virtual Employee? AssessorEmployee { get; set; }

    [ForeignKey("AssessorLocationID")]
    [InverseProperty("AccidentPersonAssessorLocations")]
    public virtual Location? AssessorLocation { get; set; }

    [ForeignKey("AssessorOrgGroupID")]
    [InverseProperty("AccidentPersonAssessorOrgGroups")]
    public virtual OrgGroup? AssessorOrgGroup { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentPersonCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("AccidentPersonEmployees")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("EmploymentStatusTypeID")]
    [InverseProperty("AccidentPeople")]
    public virtual EmploymentStatusType? EmploymentStatusType { get; set; }

    [ForeignKey("GenderTypeID")]
    [InverseProperty("AccidentPeople")]
    public virtual GenderType? GenderType { get; set; }

    [ForeignKey("InjuryTypeID")]
    [InverseProperty("AccidentPeople")]
    public virtual InjuryType? InjuryType { get; set; }

    [InverseProperty("Parent")]
    public virtual ICollection<AccidentPerson> InverseParent { get; set; } = new List<AccidentPerson>();

    [ForeignKey("LocationID")]
    [InverseProperty("AccidentPersonLocations")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentPersonModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("AccidentPersonOrgGroups")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual AccidentPerson? Parent { get; set; }

    [ForeignKey("SeverityOfInjuryTypeID")]
    [InverseProperty("AccidentPeople")]
    public virtual SeverityOfInjuryType? SeverityOfInjuryType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentPeople")]
    public virtual UserArea UserArea { get; set; } = null!;
}
