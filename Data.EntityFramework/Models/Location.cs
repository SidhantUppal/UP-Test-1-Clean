using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Location", Schema = "V7")]
public partial class Location
{
    [Key]
    public int LocationID { get; set; }

    public int? ParentID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(12)]
    [Unicode(false)]
    public string? UPRN { get; set; }

    public bool IsMain { get; set; }

    public bool IsReportTopLevel { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("Location")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("AssessorLocation")]
    public virtual ICollection<AccidentPerson> AccidentPersonAssessorLocations { get; set; } = new List<AccidentPerson>();

    [InverseProperty("Location")]
    public virtual ICollection<AccidentPerson> AccidentPersonLocations { get; set; } = new List<AccidentPerson>();

    [InverseProperty("Location")]
    public virtual ICollection<AlertTypeEmployeeLocation> AlertTypeEmployeeLocations { get; set; } = new List<AlertTypeEmployeeLocation>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("LocationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Location")]
    public virtual ICollection<AsbestosManagementPlan> AsbestosManagementPlans { get; set; } = new List<AsbestosManagementPlan>();

    [InverseProperty("MatchingLocation")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("MatchingLocation")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("Location")]
    public virtual ICollection<AttachmentLocation> AttachmentLocations { get; set; } = new List<AttachmentLocation>();

    [InverseProperty("Location")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("Location")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("Location")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignments { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("DefaultLocation")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [InverseProperty("Location")]
    public virtual ICollection<ContractorRegister> ContractorRegisters { get; set; } = new List<ContractorRegister>();

    [InverseProperty("SiteLocation")]
    public virtual ICollection<ContractorSiteAccess> ContractorSiteAccesses { get; set; } = new List<ContractorSiteAccess>();

    [InverseProperty("Location")]
    public virtual ICollection<CourseAllocation> CourseAllocations { get; set; } = new List<CourseAllocation>();

    [InverseProperty("Location")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilters { get; set; } = new List<CourseBundleFilter>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("LocationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("MasterLocation")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("Location")]
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    [InverseProperty("Location")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [InverseProperty("Location")]
    public virtual ICollection<HazardReport> HazardReports { get; set; } = new List<HazardReport>();

    [InverseProperty("Location")]
    public virtual ICollection<Hazard> Hazards { get; set; } = new List<Hazard>();

    [InverseProperty("Parent")]
    public virtual ICollection<Location> InverseParent { get; set; } = new List<Location>();

    [InverseProperty("Location")]
    public virtual ICollection<LocationEmployee> LocationEmployees { get; set; } = new List<LocationEmployee>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("LocationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Location")]
    public virtual ICollection<OrgGroupLocation> OrgGroupLocations { get; set; } = new List<OrgGroupLocation>();

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual Location? Parent { get; set; }

    [InverseProperty("Location")]
    public virtual ICollection<PolicyLocationAssignment> PolicyLocationAssignments { get; set; } = new List<PolicyLocationAssignment>();

    [InverseProperty("Location")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("Location")]
    public virtual ICollection<ResourceLocation> ResourceLocations { get; set; } = new List<ResourceLocation>();

    [InverseProperty("Location")]
    public virtual ICollection<RiskAssessmentLocation> RiskAssessmentLocations { get; set; } = new List<RiskAssessmentLocation>();

    [InverseProperty("Location")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEvents { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("Location")]
    public virtual ICollection<SSOWLocation> SSOWLocations { get; set; } = new List<SSOWLocation>();

    [InverseProperty("Location")]
    public virtual ICollection<SafeSystemOfWorkLocation> SafeSystemOfWorkLocations { get; set; } = new List<SafeSystemOfWorkLocation>();

    [InverseProperty("Location")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("Location")]
    public virtual ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();

    [InverseProperty("Location")]
    public virtual ICollection<TaskNonEmployee> TaskNonEmployees { get; set; } = new List<TaskNonEmployee>();

    [InverseProperty("Location")]
    public virtual ICollection<TaskScheduleAssignment> TaskScheduleAssignments { get; set; } = new List<TaskScheduleAssignment>();

    [InverseProperty("Location")]
    public virtual ICollection<TaskScheduleNonEmployee> TaskScheduleNonEmployees { get; set; } = new List<TaskScheduleNonEmployee>();

    [InverseProperty("Location")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("Location")]
    public virtual ICollection<TextBlockLocation> TextBlockLocations { get; set; } = new List<TextBlockLocation>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Locations")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("Location")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponses { get; set; } = new List<UserAreaFormResponse>();

    [InverseProperty("Location")]
    public virtual ICollection<WalkCheckpoint> WalkCheckpoints { get; set; } = new List<WalkCheckpoint>();

    [InverseProperty("Location")]
    public virtual ICollection<Walk> Walks { get; set; } = new List<Walk>();
}
