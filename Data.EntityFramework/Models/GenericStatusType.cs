using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("GenericStatusType", Schema = "V7")]
public partial class GenericStatusType
{
    [Key]
    public int GenericStatusTypeID { get; set; }

    [StringLength(30)]
    public string Type { get; set; } = null!;

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(150)]
    public string? Title { get; set; }

    [InverseProperty("GenericStatusType")]
    public virtual ICollection<ContractorSiteAccessStatus> ContractorSiteAccessStatuses { get; set; } = new List<ContractorSiteAccessStatus>();

    [InverseProperty("ImportanceGenericStatusType")]
    public virtual ICollection<HRCaseEmail> HRCaseEmails { get; set; } = new List<HRCaseEmail>();

    [InverseProperty("ImportanceGenericStatusType")]
    public virtual ICollection<HRCaseNote> HRCaseNotes { get; set; } = new List<HRCaseNote>();

    [InverseProperty("SeverityGenericStatusType")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("GenericStatusTypes")]
    public virtual UserArea? UserArea { get; set; }
}
