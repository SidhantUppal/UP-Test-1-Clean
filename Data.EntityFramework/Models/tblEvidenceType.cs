using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblEvidenceType", Schema = "NVQ")]
public partial class tblEvidenceType
{
    [Key]
    public int EvidenceTypeId { get; set; }

    [StringLength(10)]
    public string TypeCode { get; set; } = null!;

    [StringLength(50)]
    public string TypeName { get; set; } = null!;

    [StringLength(200)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    [InverseProperty("EvidenceType")]
    public virtual ICollection<tblEvidence> tblEvidences { get; set; } = new List<tblEvidence>();
}
