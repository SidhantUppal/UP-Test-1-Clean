using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ModuleType", Schema = "V7")]
[Index("ArchivedDate", Name = "IX_ArchivedDate")]
[Index("IsNotArchived", Name = "IX_IsNotArchived")]
[Index("RootPermissionID", Name = "IX_ModuleType_RootPermission")]
public partial class ModuleType
{
    [Key]
    public int ModuleTypeID { get; set; }

    [StringLength(50)]
    public string? Controller { get; set; }

    [StringLength(50)]
    public string? Action { get; set; }

    [StringLength(255)]
    public string? MenuIcon { get; set; }

    public bool IsVisibleOnSidebar { get; set; }

    public int? RootPermissionID { get; set; }

    public int? DisplayPermissionID { get; set; }

    public bool? IsMobileViewable { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? MobileIcon { get; set; }

    public bool IsDevelopedOnMobile { get; set; }

    public int IsNotArchived { get; set; }

    public int? DefaultSystemProductTypeID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ModuleTypes")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("ModuleType")]
    public virtual ICollection<DefaultDashboardSlot> DefaultDashboardSlots { get; set; } = new List<DefaultDashboardSlot>();

    [ForeignKey("DefaultSystemProductTypeID")]
    [InverseProperty("ModuleTypes")]
    public virtual SystemProductType? DefaultSystemProductType { get; set; }

    [ForeignKey("DisplayPermissionID")]
    [InverseProperty("ModuleTypeDisplayPermissions")]
    public virtual Permission? DisplayPermission { get; set; }

    [InverseProperty("ModuleType")]
    public virtual ICollection<HelpGuide> HelpGuides { get; set; } = new List<HelpGuide>();

    [InverseProperty("ModuleType")]
    public virtual ICollection<HelpText> HelpTexts { get; set; } = new List<HelpText>();

    [InverseProperty("ModuleType")]
    public virtual ICollection<ProductTypeModuleType> ProductTypeModuleTypes { get; set; } = new List<ProductTypeModuleType>();

    [InverseProperty("DefaultModuleType")]
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    [ForeignKey("RootPermissionID")]
    [InverseProperty("ModuleTypeRootPermissions")]
    public virtual Permission? RootPermission { get; set; }
}
