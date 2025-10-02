using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("BodyPart", Schema = "V7")]
public partial class BodyPart
{
    [Key]
    public int BodyPartID { get; set; }

    public int? UserAreaID { get; set; }

    public int? ParentBodyPartID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public int? CreatedByUserID { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public int? RIDDORValue { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("BodyPart")]
    public virtual ICollection<AccidentCaseRIDDORDatum> AccidentCaseRIDDORData { get; set; } = new List<AccidentCaseRIDDORDatum>();

    [InverseProperty("BodyPart")]
    public virtual ICollection<AccidentCase> AccidentCases { get; set; } = new List<AccidentCase>();

    [InverseProperty("BodyPart")]
    public virtual ICollection<AccidentPersonBodyPart> AccidentPersonBodyParts { get; set; } = new List<AccidentPersonBodyPart>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("BodyPartArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("BodyPart")]
    public virtual ICollection<BodyPartPickerType> BodyPartPickerTypes { get; set; } = new List<BodyPartPickerType>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("BodyPartCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [InverseProperty("BodyPart")]
    public virtual ICollection<InjuryTypeBodyPart> InjuryTypeBodyParts { get; set; } = new List<InjuryTypeBodyPart>();

    [InverseProperty("ParentBodyPart")]
    public virtual ICollection<BodyPart> InverseParentBodyPart { get; set; } = new List<BodyPart>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("BodyPartModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentBodyPartID")]
    [InverseProperty("InverseParentBodyPart")]
    public virtual BodyPart? ParentBodyPart { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("BodyParts")]
    public virtual UserArea? UserArea { get; set; }
}
