using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistTemplateCategory", Schema = "V7")]
[Index("CategoryTypeID", Name = "IX_ChecklistTemplateCategory_CategoryTypeID")]
[Index("ChecklistTemplateID", Name = "IX_ChecklistTemplateCategory_ChecklistTemplateID")]
public partial class ChecklistTemplateCategory
{
    [Key]
    public int ChecklistTemplateCategoryID { get; set; }

    public int ChecklistTemplateID { get; set; }

    public int CategoryTypeID { get; set; }

    [ForeignKey("CategoryTypeID")]
    [InverseProperty("ChecklistTemplateCategories")]
    public virtual CategoryType CategoryType { get; set; } = null!;

    [ForeignKey("ChecklistTemplateID")]
    [InverseProperty("ChecklistTemplateCategories")]
    public virtual ChecklistTemplate ChecklistTemplate { get; set; } = null!;
}
