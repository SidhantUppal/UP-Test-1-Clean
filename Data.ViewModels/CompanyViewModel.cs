using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CompanyViewModel
{
    [Key]
    public int CompanyID { get; set; }

    public int UserAreaID { get; set; }

    public string Name { get; set; } = null!;

    public int CompanyStatusID { get; set; }

    public int LocationID { get; set; }

    [StringLength(255)]
    public string? Email { get; set; }

    public int? OrgGroupID { get; set; }

    public int MainIndustryTypeID { get; set; }

    public int MainActivityTypeID { get; set; }

    public int SubActivityTypeID { get; set; }

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
