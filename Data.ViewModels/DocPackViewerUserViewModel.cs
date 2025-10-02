using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocPackViewerUserViewModel
{
    [Key]
    public int DocPackViewerUserID { get; set; }

    public int DocPackID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset? ExpirationDate { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
