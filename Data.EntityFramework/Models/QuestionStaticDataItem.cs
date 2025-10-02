using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionStaticDataItem", Schema = "V7")]
public partial class QuestionStaticDataItem
{
    [Key]
    public int QuestionStaticDataItemID { get; set; }

    public int QuestionID { get; set; }

    public int QuestionnaireStaticDataTypeID { get; set; }

    public int StaticDataRecordID { get; set; }

    [ForeignKey("QuestionID")]
    [InverseProperty("QuestionStaticDataItems")]
    public virtual Question Question { get; set; } = null!;

    [ForeignKey("QuestionnaireStaticDataTypeID")]
    [InverseProperty("QuestionStaticDataItems")]
    public virtual QuestionnaireStaticDataType QuestionnaireStaticDataType { get; set; } = null!;
}
