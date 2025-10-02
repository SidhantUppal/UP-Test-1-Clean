using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaDivision", Schema = "V7")]
public partial class UserAreaDivision
{
    [Key]
    public int UserAreaDivisionID { get; set; }

    public int UserAreaID { get; set; }

    public int? RootOrgGroupID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaDivisionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("UserAreaDivision")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaDivisionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaDivisionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("UserAreaDivision")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEvents { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [ForeignKey("RootOrgGroupID")]
    [InverseProperty("UserAreaDivisions")]
    public virtual OrgGroup? RootOrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaDivisions")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaDivision")]
    public virtual ICollection<UserUserAreaDivision> UserUserAreaDivisions { get; set; } = new List<UserUserAreaDivision>();
}
