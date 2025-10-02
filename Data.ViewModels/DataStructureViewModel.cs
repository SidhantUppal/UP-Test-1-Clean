using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DataStructureViewModel
{
    [Key]
    public int DataStructureID { get; set; }

    public int DataStructureTypeID { get; set; }

    public string DataStructureJSON { get; set; } = null!;

    [StringLength(256)]
    public string? DataStructureTitle { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsTemplate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
