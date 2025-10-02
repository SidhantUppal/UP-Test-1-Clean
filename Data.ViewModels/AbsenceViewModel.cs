using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AbsenceViewModel
{
    [Key]
    public int AbsenceID { get; set; }

    public int EmployeeID { get; set; }

    public int AbsenceTypeID { get; set; }

    public int? AbsenceReasonTypeID { get; set; }

    [StringLength(100)]
    public string? OtherAbsenceReason { get; set; }

    public int UserAreaID { get; set; }

    public bool IsClosed { get; set; }

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset? ExpectedReturnToWorkDate { get; set; }

    public DateTimeOffset? ActualReturnToWorkDate { get; set; }

    public bool IsAuthorised { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool LongTermAbsenceAlertSent { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
