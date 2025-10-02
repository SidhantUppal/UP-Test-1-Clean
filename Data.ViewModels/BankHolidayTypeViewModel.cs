using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BankHolidayTypeViewModel
{
    [Key]
    public int BankHolidayTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int RegionTypeID { get; set; }

    public DateTimeOffset BankHolDate { get; set; }

    [StringLength(255)]
    public string BankHolNote { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
