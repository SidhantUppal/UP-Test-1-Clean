using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseEventViewModel
{
    [Key]
    public int HRCaseEventID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCategoryID { get; set; }

    public short EventType { get; set; }

    public DateTimeOffset EventDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    public short? EventOutcomeType { get; set; }

    [StringLength(256)]
    public string? EventLog { get; set; }

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
