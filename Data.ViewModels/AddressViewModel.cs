using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AddressViewModel
{
    [Key]
    public int AddressID { get; set; }

    [StringLength(255)]
    public string? Line1 { get; set; }

    [StringLength(255)]
    public string? Line2 { get; set; }

    [StringLength(255)]
    public string? Line3 { get; set; }

    [StringLength(50)]
    public string? TownCity { get; set; }

    [StringLength(50)]
    public string? County { get; set; }

    [StringLength(8)]
    public string? PostCode { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
