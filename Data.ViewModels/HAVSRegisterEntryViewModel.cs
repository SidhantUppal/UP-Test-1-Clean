using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HAVSRegisterEntryViewModel
{
    [Key]
    public int HAVSRegisterEntryID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int? Year { get; set; }

    public int? Month { get; set; }

    public int? Day { get; set; }

    public bool IsOnLeave { get; set; }

    public bool IsOffSick { get; set; }

    public bool IsSubmitted { get; set; }

    public bool IsBlocked { get; set; }

    [StringLength(255)]
    public string? BlockedReason { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public DateOnly EntryDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
