using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentCaseUserAreaQuestionTypeData", Schema = "V7")]
public partial class AccidentCaseUserAreaQuestionTypeDatum
{
    [Key]
    public int AccidentCaseUserAreaQuestionTypeDataID { get; set; }

    public int AccidentCaseID { get; set; }

    public int UserAreaQuestionTypeID { get; set; }

    [StringLength(250)]
    public string UserAreaQuestionTypeVALUE { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("AccidentCaseUserAreaQuestionTypeData")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AccidentCaseUserAreaQuestionTypeDatumArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AccidentCaseUserAreaQuestionTypeDatumCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AccidentCaseUserAreaQuestionTypeDatumModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaQuestionTypeID")]
    [InverseProperty("AccidentCaseUserAreaQuestionTypeData")]
    public virtual UserAreaQuestionType UserAreaQuestionType { get; set; } = null!;
}
