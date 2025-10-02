using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRType", Schema = "V7")]
public partial class HRType
{
    [Key]
    public int HRTypeID { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("HRType")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRCaseOutcomeType> HRCaseOutcomeTypes { get; set; } = new List<HRCaseOutcomeType>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRCaseStatusType> HRCaseStatusTypes { get; set; } = new List<HRCaseStatusType>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRCategory> HRCategories { get; set; } = new List<HRCategory>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRTemplate> HRTemplates { get; set; } = new List<HRTemplate>();

    [InverseProperty("HRType")]
    public virtual ICollection<HRTypeHRMeetingType> HRTypeHRMeetingTypes { get; set; } = new List<HRTypeHRMeetingType>();
}
