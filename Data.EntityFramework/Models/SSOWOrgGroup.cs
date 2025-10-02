using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWOrgGroup", Schema = "V7")]
public partial class SSOWOrgGroup
{
    [Key]
    public int SSOWOrgGroupID { get; set; }

    public int UserAreaID { get; set; }

    public int OrgGroupID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    public int DocumentID { get; set; }

    public string? GroupSpecificNotes { get; set; }

    public string? AdditionalRequirements { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("SSOWOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SSOWOrgGroups")]
    public virtual UserArea UserArea { get; set; } = null!;
}
