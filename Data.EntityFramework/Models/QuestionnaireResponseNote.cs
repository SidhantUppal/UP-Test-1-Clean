using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("QuestionnaireResponseNote", Schema = "V7")]
public partial class QuestionnaireResponseNote
{
    [Key]
    public int QuestionnaireResponseNoteID { get; set; }

    public int QuestionnaireResponseID { get; set; }

    public string Notes { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("QuestionnaireResponseNoteArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("QuestionnaireResponseNoteCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("QuestionnaireResponseNotes")]
    public virtual QuestionnaireResponse QuestionnaireResponse { get; set; } = null!;
}
