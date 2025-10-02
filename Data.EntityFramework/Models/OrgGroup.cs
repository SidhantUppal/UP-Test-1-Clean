using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OrgGroup", Schema = "V7")]
public partial class OrgGroup
{
    [Key]
    public int OrgGroupID { get; set; }

    public int? ParentID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public bool IsMain { get; set; }

    public bool ExcludeFromReportingCentre { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("OrgGroup")]
    public virtual ICollection<AbsenceSetting> AbsenceSettings { get; set; } = new List<AbsenceSetting>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("AssessorOrgGroup")]
    public virtual ICollection<AccidentPerson> AccidentPersonAssessorOrgGroups { get; set; } = new List<AccidentPerson>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<AccidentPerson> AccidentPersonOrgGroups { get; set; } = new List<AccidentPerson>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<ActionPlan> ActionPlans { get; set; } = new List<ActionPlan>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<AlertTypeEmployeeOrgGroup> AlertTypeEmployeeOrgGroups { get; set; } = new List<AlertTypeEmployeeOrgGroup>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("OrgGroupArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("OrgGroup")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<ChecklistOrgGroup> ChecklistOrgGroups { get; set; } = new List<ChecklistOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignments { get; set; } = new List<ChecklistTemplateAssignment>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<CourseAllocation> CourseAllocations { get; set; } = new List<CourseAllocation>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilters { get; set; } = new List<CourseBundleFilter>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("OrgGroupCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("MasterOrgGroup")]
    public virtual ICollection<EWMGEscalationEmployee> EWMGEscalationEmployees { get; set; } = new List<EWMGEscalationEmployee>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<FolderOrgGroup> FolderOrgGroups { get; set; } = new List<FolderOrgGroup>();

    [InverseProperty("Parent")]
    public virtual ICollection<OrgGroup> InverseParent { get; set; } = new List<OrgGroup>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("OrgGroupModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("OrgGroup")]
    public virtual ICollection<NonWorkingDay> NonWorkingDays { get; set; } = new List<NonWorkingDay>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<OrgGroupEmployee> OrgGroupEmployees { get; set; } = new List<OrgGroupEmployee>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<OrgGroupLocation> OrgGroupLocations { get; set; } = new List<OrgGroupLocation>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<OrgGroupTaskSetting> OrgGroupTaskSettings { get; set; } = new List<OrgGroupTaskSetting>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<OrgGroupUser> OrgGroupUsers { get; set; } = new List<OrgGroupUser>();

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual OrgGroup? Parent { get; set; }

    [InverseProperty("OrgGroup")]
    public virtual ICollection<PolicyOrgGroupAssignment> PolicyOrgGroupAssignments { get; set; } = new List<PolicyOrgGroupAssignment>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<PrintedHeader> PrintedHeaders { get; set; } = new List<PrintedHeader>();

    [InverseProperty("ManagerOrgGroup")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<ResourceOrgGroup> ResourceOrgGroups { get; set; } = new List<ResourceOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEvents { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<RiskAssessmentOrgGroup> RiskAssessmentOrgGroups { get; set; } = new List<RiskAssessmentOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<SSOWOrgGroup> SSOWOrgGroups { get; set; } = new List<SSOWOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<SafeSystemOfWork> SafeSystemOfWorks { get; set; } = new List<SafeSystemOfWork>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskAssignment> TaskAssignments { get; set; } = new List<TaskAssignment>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskNonEmployee> TaskNonEmployees { get; set; } = new List<TaskNonEmployee>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskOrgGroup> TaskOrgGroups { get; set; } = new List<TaskOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskScheduleAssignment> TaskScheduleAssignments { get; set; } = new List<TaskScheduleAssignment>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskScheduleNonEmployee> TaskScheduleNonEmployees { get; set; } = new List<TaskScheduleNonEmployee>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TaskScheduleOrgGroup> TaskScheduleOrgGroups { get; set; } = new List<TaskScheduleOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TextBlockCollection> TextBlockCollections { get; set; } = new List<TextBlockCollection>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TextBlockOrgGroup> TextBlockOrgGroups { get; set; } = new List<TextBlockOrgGroup>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<TextBlock> TextBlocks { get; set; } = new List<TextBlock>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("OrgGroups")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("RootOrgGroup")]
    public virtual ICollection<UserAreaDivision> UserAreaDivisions { get; set; } = new List<UserAreaDivision>();

    [InverseProperty("OrgGroup")]
    public virtual ICollection<UserAreaFormResponse> UserAreaFormResponses { get; set; } = new List<UserAreaFormResponse>();
}
