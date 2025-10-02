using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class FavouriteViewModel
{
    [Key]
    public int FavouriteID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public int ReportType { get; set; }

    [StringLength(1024)]
    public string URL { get; set; } = null!;

    [StringLength(50)]
    public string? Note { get; set; }

    [StringLength(64)]
    public string? SearchFilterObjectName { get; set; }

    [StringLength(4000)]
    public string? SearchFilterParams { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
