using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CurrencyTypeViewModel
{
    [Key]
    public int CurrencyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string Symbol { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
