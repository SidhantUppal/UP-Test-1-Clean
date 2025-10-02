using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentLinkViewModel
{
    [Key]
    public int DocumentLinkID { get; set; }

    public int FirstID { get; set; }

    public int SecondID { get; set; }

    public int FirstTableTypeID { get; set; }

    public int SecondTableTypeID { get; set; }

    public int DocumentLinkTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    [StringLength(50)]
    public string? InstanceID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
