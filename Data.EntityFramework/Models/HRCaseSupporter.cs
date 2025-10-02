using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseSupporter", Schema = "V7")]
[Index("HRCaseID", "HRCaseStatusTypeID", Name = "IX_HRCaseSupporter_HRCaseID_includes")]
public partial class HRCaseSupporter
{
    [Key]
    public int HRCaseSupporterID { get; set; }

    public int HRCaseID { get; set; }

    public int HRCaseStatusTypeID { get; set; }

    public bool IsForNapthensPeopleProjectTeam { get; set; }

    public bool IsExternalSupportOfficerRequired { get; set; }

    [StringLength(100)]
    public string? ExternalSupportOfficerName { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseSupporters")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCaseSupporters")]
    public virtual HRCaseStatusType HRCaseStatusType { get; set; } = null!;
}
