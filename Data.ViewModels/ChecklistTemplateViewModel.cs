using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistTemplateViewModel
{
    [Key]
    public int ChecklistTemplateID { get; set; }

    public int? UserAreaID { get; set; }

    public int OriginalUserAreaFormID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsRenewable { get; set; }

    public int? RenewalFrequencyTypeID { get; set; }

    public int? RenewalFrequencyPeriod { get; set; }

    public bool HasTasksAllowed { get; set; }

    public int? DefaultManagerEmployeeID { get; set; }

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
