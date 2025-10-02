using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCategoryViewModel
{
    [Key]
    public int HRCategoryID { get; set; }

    public int? HRTypeID { get; set; }

    public short? EventType { get; set; }

    public int OrderNum { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

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
