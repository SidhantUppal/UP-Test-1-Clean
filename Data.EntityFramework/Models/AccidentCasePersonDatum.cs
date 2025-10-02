using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCasePersonData", Schema = "V7")]
[Index("AccidentCaseID", "AccidentFormID", Name = "IX_AccidentCasePersonData_PersonData")]
[Index("AccidentCaseID", Name = "IX_AccidentCasePersonData_RIDDORPersonData")]
public partial class AccidentCasePersonDatum
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

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("AccidentFormID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual AccidentForm AccidentForm { get; set; } = null!;

    [ForeignKey("AccidentPersonTypeID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual AccidentPersonType AccidentPersonType { get; set; } = null!;

    [ForeignKey("AddressID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual Address? AddressNavigation { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCasePersonDatumArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCasePersonDatumCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("EmploymentStatusTypeID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual EmploymentStatusType? EmploymentStatusType { get; set; }

    [ForeignKey("GenderTypeID")]
    [InverseProperty("AccidentCasePersonData")]
    public virtual GenderType? GenderType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCasePersonDatumModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
