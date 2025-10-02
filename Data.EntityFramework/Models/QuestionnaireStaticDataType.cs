using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireStaticDataType", Schema = "V7")]
public partial class QuestionnaireStaticDataType
{
    [Key]
    public int QuestionnaireStaticDataTypeID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    public bool IsPostBackRequired { get; set; }

    [InverseProperty("QuestionnaireStaticDataType")]
    public virtual ICollection<QuestionStaticDataItem> QuestionStaticDataItems { get; set; } = new List<QuestionStaticDataItem>();
}
