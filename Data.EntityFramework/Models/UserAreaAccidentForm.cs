using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentForm", Schema = "V7")]
public partial class UserAreaAccidentForm
{
    [Key]
    public int UserAreaAccidentFormID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool IsNonAccidentForm { get; set; }

    public byte LatestTemplateVersion { get; set; }

    public byte? LiveTemplateVersion { get; set; }

    public int? oldid { get; set; }

    public bool IsEnabledForWeb { get; set; }

    public bool IsEnabledForApp { get; set; }

    public int? InvestigationUserAreaAccidentFormID { get; set; }

    public bool IsSecondaryForm { get; set; }

    public bool AllowCompletionFromAlternativeUserArea { get; set; }

    public bool HasSeverityOptionEnabled { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("UserAreaAccidentForm")]
    public virtual ICollection<AccidentForm> AccidentForms { get; set; } = new List<AccidentForm>();

    [InverseProperty("InvestigationUserAreaAccidentForm")]
    public virtual ICollection<UserAreaAccidentForm> InverseInvestigationUserAreaAccidentForm { get; set; } = new List<UserAreaAccidentForm>();

    [ForeignKey("InvestigationUserAreaAccidentFormID")]
    [InverseProperty("InverseInvestigationUserAreaAccidentForm")]
    public virtual UserAreaAccidentForm? InvestigationUserAreaAccidentForm { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaAccidentForms")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaAccidentForm")]
    public virtual ICollection<UserAreaAccidentFormQuestion> UserAreaAccidentFormQuestions { get; set; } = new List<UserAreaAccidentFormQuestion>();

    [InverseProperty("UserAreaAccidentForm")]
    public virtual ICollection<UserAreaAccidentQuestionTag> UserAreaAccidentQuestionTags { get; set; } = new List<UserAreaAccidentQuestionTag>();
}
