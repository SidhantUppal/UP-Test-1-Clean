using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentRegisterViewModel
{
    [Key]
    public int DocumentRegisterID { get; set; }

    public int UserAreaID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public decimal LatestVersion { get; set; }

    public DateTimeOffset DocumentCreatedDate { get; set; }

    public DateTimeOffset? DocumentModifiedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(255)]
    public string? LatestReference { get; set; }

    [StringLength(255)]
    public string? LatestTitle { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
