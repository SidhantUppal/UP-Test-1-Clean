using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class MobilePropertyViewModel
{
    [Key]
    public int MobilePropertyID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(256)]
    public string Key { get; set; } = null!;

    [StringLength(256)]
    public string Value { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
