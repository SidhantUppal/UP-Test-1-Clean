using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblEvidenceTypeViewModel
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

    // Additional Properties
}
