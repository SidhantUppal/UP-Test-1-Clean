using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistOrgGroup", Schema = "V7")]
public partial class ChecklistOrgGroup
{
    [Key]
    public int ChecklistOrgGroupID { get; set; }

    public int ChecklistID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("ChecklistID")]
    [InverseProperty("ChecklistOrgGroups")]
    public virtual Checklist Checklist { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("ChecklistOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;
}
