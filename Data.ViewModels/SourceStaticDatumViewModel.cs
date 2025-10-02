using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SourceStaticDatumViewModel
{
    [Key]
    public int SourceStaticDataID { get; set; }

    [StringLength(512)]
    public string? Title { get; set; }

    public int SourceStaticDataTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(256)]
    public string? IconFileName { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
