using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistViewResponseUser", Schema = "V7")]
public partial class ChecklistViewResponseUser
{
    [Key]
    public int ChecklistViewResponseUserID { get; set; }

    public int ChecklistID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [ForeignKey("ChecklistID")]
    [InverseProperty("ChecklistViewResponseUsers")]
    public virtual Checklist Checklist { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("ChecklistViewResponseUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ChecklistViewResponseUsers")]
    public virtual UserArea UserArea { get; set; } = null!;
}
