using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblPortfolioStatusViewModel
{
    [Key]
    public int PortfolioStatusId { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [StringLength(200)]
    public string? StatusDescription { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
