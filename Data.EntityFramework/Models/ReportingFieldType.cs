using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ReportingFieldType", Schema = "V7")]
public partial class ReportingFieldType
{
    [Key]
    public int ReportingFieldTypeID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string FieldName { get; set; } = null!;

    public int AnswerTypeID { get; set; }

    [StringLength(50)]
    public string? AnswerTypeOptionsTable { get; set; }

    public bool IsRIDDORReportable { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [ForeignKey("AnswerTypeID")]
    [InverseProperty("ReportingFieldTypes")]
    public virtual AnswerType AnswerType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ReportingFieldTypes")]
    public virtual UserArea? UserArea { get; set; }
}
