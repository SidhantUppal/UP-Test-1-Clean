using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HighLevelProductTypeViewModel
{
    [Key]
    public int HighLevelProductTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Controller { get; set; }

    [StringLength(50)]
    public string? Action { get; set; }

    [StringLength(500)]
    public string? ResourceStringKey { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IsSelectable { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
