using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkTemplateSection", Schema = "V7")]
public partial class SafeSystemOfWorkTemplateSection
{
    [Key]
    public int SafeSystemOfWorkTemplateSectionID { get; set; }

    public int SafeSystemOfWorkTemplateID { get; set; }

    public int TextBlockSectionID { get; set; }

    [ForeignKey("SafeSystemOfWorkTemplateID")]
    [InverseProperty("SafeSystemOfWorkTemplateSections")]
    public virtual SafeSystemOfWorkTemplate SafeSystemOfWorkTemplate { get; set; } = null!;

    [ForeignKey("TextBlockSectionID")]
    [InverseProperty("SafeSystemOfWorkTemplateSections")]
    public virtual TextBlockSection TextBlockSection { get; set; } = null!;
}
