using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InjuryType", Schema = "V7")]
public partial class InjuryType
{
    [Key]
    public int InjuryTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public bool IsRIDDORReportable { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int? UserAreaID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? OrderNum { get; set; }

    public int? RIDDORValue { get; set; }

    [InverseProperty("InjuryType")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("InjuryType")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("InjuryType")]
    public virtual ICollection<AccidentPerson> AccidentPeople { get; set; } = new List<AccidentPerson>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InjuryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InjuryTypeCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [InverseProperty("InjuryType")]
    public virtual ICollection<InjuryTypeBodyPart> InjuryTypeBodyParts { get; set; } = new List<InjuryTypeBodyPart>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InjuryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("InjuryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
