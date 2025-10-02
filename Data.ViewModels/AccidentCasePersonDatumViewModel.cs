using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AccidentCasePersonDatumViewModel
{
    [Key]
    public int AccidentCasePersonDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int AccidentFormID { get; set; }

    public int AccidentPersonTypeID { get; set; }

    public int? EmployeeID { get; set; }

    [StringLength(100)]
    public string? EmploymentStatusTypeTitle { get; set; }

    [StringLength(255)]
    public string? Name { get; set; }

    public string? Address { get; set; }

    [StringLength(255)]
    public string? Email { get; set; }

    [StringLength(50)]
    public string? PhoneNo { get; set; }

    public int? EmploymentStatusTypeID { get; set; }

    public int? GenderTypeID { get; set; }

    [StringLength(35)]
    public string? Title { get; set; }

    [StringLength(35)]
    public string? FirstName { get; set; }

    [StringLength(35)]
    public string? LastName { get; set; }

    public int? AddressID { get; set; }

    [StringLength(50)]
    public string? JobTitle { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
