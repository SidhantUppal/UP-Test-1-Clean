using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UpdateViewModel
{
    [Key]
    public int UpdateID { get; set; }

    [StringLength(255)]
    public string? Action { get; set; }

    [StringLength(255)]
    public string? Controller { get; set; }

    public string? RouteValues { get; set; }

    public int? UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? ExternalURL { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int UpdateTypeID { get; set; }

    public int? OrderNumber { get; set; }

    [StringLength(150)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
