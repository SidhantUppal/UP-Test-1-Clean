using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InjuryTypeViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
