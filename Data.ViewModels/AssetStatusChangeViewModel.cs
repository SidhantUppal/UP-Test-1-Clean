using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetStatusChangeViewModel
{
    [Key]
    public int AssetStatusChangeID { get; set; }

    public int AssetID { get; set; }

    public int AssetStatusChangeTypeID { get; set; }

    public decimal ChangeCost { get; set; }

    public DateTimeOffset ChangeDate { get; set; }

    public string? ChangeComments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
