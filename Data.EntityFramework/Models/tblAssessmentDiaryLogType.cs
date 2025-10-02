using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblAssessmentDiaryLogType", Schema = "NVQ")]
public partial class tblAssessmentDiaryLogType
{
    [Key]
    public int LogTypeId { get; set; }

    [StringLength(50)]
    public string LogTypeName { get; set; } = null!;

    [StringLength(200)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    [InverseProperty("LogType")]
    public virtual ICollection<tblAssessmentDiary> tblAssessmentDiaries { get; set; } = new List<tblAssessmentDiary>();
}
