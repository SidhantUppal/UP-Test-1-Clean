using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SSOWStatusTypeViewModel
{
    [Key]
    public int SSOWStatusTypeID { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [StringLength(200)]
    public string? StatusDescription { get; set; }

    [StringLength(50)]
    public string StatusCategory { get; set; } = null!;

    [StringLength(7)]
    public string? ColorCode { get; set; }

    public int? WorkflowOrder { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
