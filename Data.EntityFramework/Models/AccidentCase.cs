using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCase", Schema = "V7")]
[Index("UserAreaID", "ArchivedDate", "LocationID", "OrgGroupID", Name = "IX_AccidentCase_UserAreaID_ArchivedDate_LocationID_OrgGroupID")]
public partial class AccidentCase
{
    [Key]
    public int AccidentCaseID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(8)]
    public string? Reference { get; set; }

    [StringLength(256)]
    public string? AdditionalReference { get; set; }

    public DateTimeOffset IncidentDate { get; set; }

    [StringLength(15)]
    public string? IncidentTime { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? OptionListItemID { get; set; }

    public bool HasLostTime { get; set; }

    [StringLength(255)]
    public string? OrganisationName { get; set; }

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
    public string? Description { get; set; }

    [StringLength(255)]
    public string? OrgGroupName { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal? LostDays { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int? ClosedByEmployeeID { get; set; }

    public bool IsRIDDORReportable { get; set; }

    public int? RootCauseTypeID { get; set; }

    public int? SeverityTypeID { get; set; }

    public int? InjuryTypeID { get; set; }

    public int? IncidentKindID { get; set; }

    public bool IsReadyToClose { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public bool HasSuppressedAlerts { get; set; }

    public int? BodyPartID { get; set; }

    public bool IsFatality { get; set; }

    public bool IsRIDDORSpecifiedInjury { get; set; }

    public bool IsUnableToWorkForAbove7Days { get; set; }

    public bool IsNonWorkerInjuredAndHospitalised { get; set; }

    public bool IsAnonymousSubmission { get; set; }

    public bool IsApprovedSubmission { get; set; }

    public bool HasBeenHospitalisedForOver1Day { get; set; }

    public bool HasInvolvedUnconsciousness { get; set; }

    public bool HasInvolvedResuscitation { get; set; }

    public bool HasInvolvedEmergencyServices { get; set; }

    public bool IsWorkRelatedIncident { get; set; }

    [StringLength(255)]
    public string? ManagerEmployeeEmail { get; set; }

    [StringLength(20)]
    public string? PortalAccessToken { get; set; }

    public bool IsRIDDORDangerousOccurrence { get; set; }

    public bool IsRIDDOROccupationalDisease { get; set; }

    public bool IsSignOffRequired { get; set; }

    public bool IsSignedOff { get; set; }

    [StringLength(100)]
    public string? RootCauseOther { get; set; }

    public int? RootCauseCategoryTypeID { get; set; }

    public int? IncidentDateTimeZoneID { get; set; }

    public bool IsFirstAidRefused { get; set; }

    public string? FirstAidRefuserSignature { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("AssociatedAccidentCase")]
    public virtual ICollection<AccidentCaseAssociation> AccidentCaseAssociationAssociatedAccidentCases { get; set; } = new List<AccidentCaseAssociation>();

    [InverseProperty("MasterAccidentCase")]
    public virtual ICollection<AccidentCaseAssociation> AccidentCaseAssociationMasterAccidentCases { get; set; } = new List<AccidentCaseAssociation>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseAttachment> AccidentCaseAttachments { get; set; } = new List<AccidentCaseAttachment>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseExport> AccidentCaseExports { get; set; } = new List<AccidentCaseExport>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseFieldDatum> AccidentCaseFieldData { get; set; } = new List<AccidentCaseFieldDatum>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseNote> AccidentCaseNotes { get; set; } = new List<AccidentCaseNote>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseUserAreaQuestionTypeDatum> AccidentCaseUserAreaQuestionTypeData { get; set; } = new List<AccidentCaseUserAreaQuestionTypeDatum>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentCaseViewerUser> AccidentCaseViewerUsers { get; set; } = new List<AccidentCaseViewerUser>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<AccidentPerson> AccidentPeople { get; set; } = new List<AccidentPerson>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("BodyPartID")]
    [InverseProperty("AccidentCases")]
    public virtual BodyPart? BodyPart { get; set; }

    [ForeignKey("ClosedByEmployeeID")]
    [InverseProperty("AccidentCaseClosedByEmployees")]
    public virtual Employee? ClosedByEmployee { get; set; }

    [InverseProperty("AccidentCase")]
    public virtual ICollection<CostSheet> CostSheets { get; set; } = new List<CostSheet>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("IncidentDateTimeZoneID")]
    [InverseProperty("AccidentCases")]
    public virtual BSSTimeZone? IncidentDateTimeZone { get; set; }

    [ForeignKey("IncidentKindID")]
    [InverseProperty("AccidentCases")]
    public virtual IncidentKind? IncidentKind { get; set; }

    [ForeignKey("InjuryTypeID")]
    [InverseProperty("AccidentCases")]
    public virtual InjuryType? InjuryType { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("AccidentCases")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("AccidentCaseManagerEmployees")]
    public virtual Employee? ManagerEmployee { get; set; }

    [InverseProperty("AccidentCase")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OptionListItemID")]
    [InverseProperty("AccidentCases")]
    public virtual OptionListItem? OptionListItem { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("AccidentCases")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [InverseProperty("AccidentCase")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("AccidentCase")]
    public virtual ICollection<RIDDORSubmission> RIDDORSubmissions { get; set; } = new List<RIDDORSubmission>();

    [ForeignKey("RootCauseCategoryTypeID")]
    [InverseProperty("AccidentCases")]
    public virtual RootCauseCategoryType? RootCauseCategoryType { get; set; }

    [ForeignKey("RootCauseTypeID")]
    [InverseProperty("AccidentCases")]
    public virtual RootCauseType? RootCauseType { get; set; }

    [ForeignKey("SeverityTypeID")]
    [InverseProperty("AccidentCases")]
    public virtual SeverityType? SeverityType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AccidentCases")]
    public virtual UserArea UserArea { get; set; } = null!;
}
