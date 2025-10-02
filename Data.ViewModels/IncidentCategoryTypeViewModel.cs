using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class IncidentCategoryTypeViewModel
{
    [Key]
    public int IncidentCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? ColorCode { get; set; }

    [StringLength(50)]
    public string? Icon { get; set; }

    public int? DisplayOrder { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public bool IsSystemCategory { get; set; }
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
