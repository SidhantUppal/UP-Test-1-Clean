using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseFieldData", Schema = "V7")]
[Index("AccidentCaseID", "AccidentFormID", Name = "IX_AccidentCaseFieldData_FieldValue")]
public partial class AccidentCaseFieldDatum
{
    [Key]
    public int AccidentCaseFieldDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int AccidentFormID { get; set; }

    public int? AccidentQuestionTypeID { get; set; }

    public string? FieldValue { get; set; }

    public bool IncludeInCaseDetails { get; set; }

    public string? AdditionalValue { get; set; }

    public int? UserAreaAccidentQuestionID { get; set; }

    public int? ReportValue { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseFieldData")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("AccidentFormID")]
    [InverseProperty("AccidentCaseFieldData")]
    public virtual AccidentForm AccidentForm { get; set; } = null!;

    [ForeignKey("AccidentQuestionTypeID")]
    [InverseProperty("AccidentCaseFieldData")]
    public virtual AccidentQuestionType? AccidentQuestionType { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseFieldDatumArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseFieldDatumCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseFieldDatumModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaAccidentQuestionID")]
    [InverseProperty("AccidentCaseFieldData")]
    public virtual UserAreaAccidentQuestion? UserAreaAccidentQuestion { get; set; }
}
