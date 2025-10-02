using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AlertTypeUserArea", Schema = "V7")]
[Index("AlertTypeID", Name = "IX_AlertTypeUserArea_AlertType")]
[Index("UserAreaID", Name = "IX_AlertTypeUserArea_UserArea")]
public partial class AlertTypeUserArea
{
    [Key]
    public int AlertTypeUserAreaID { get; set; }

    public int AlertTypeID { get; set; }

    public int UserAreaID { get; set; }
}
