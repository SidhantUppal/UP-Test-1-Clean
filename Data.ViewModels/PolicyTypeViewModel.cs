using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyTypeViewModel
{
    [Key]
    public int PolicyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string TypeName { get; set; } = null!;

    [StringLength(500)]
    public string? TypeDescription { get; set; }

    public bool? RequiresApproval { get; set; }

    public bool? RequiresTraining { get; set; }

    public bool? RequiresAcknowledgment { get; set; }

    public int? ReviewFrequencyMonths { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
