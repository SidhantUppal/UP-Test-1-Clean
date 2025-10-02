using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireResponseXML", Schema = "V7")]
[Index("QuestionnaireResponseID", Name = "ix_QuestionnaireResponseXML_QuestionnaireResponseID")]
public partial class QuestionnaireResponseXML
{
    [Key]
    public int QuestionnaireResponseXMLID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public int V5ChecklistCacheID { get; set; }

    public int V5ChecklistResponseID { get; set; }

    public int? V5ParentChecklistResponseID { get; set; }

    public bool IsLatest { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal Version { get; set; }

    [Column(TypeName = "xml")]
    public string XMLResponse { get; set; } = null!;

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("QuestionnaireResponseXMLs")]
    public virtual QuestionnaireResponse QuestionnaireResponse { get; set; } = null!;
}
