using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaViewModel
{
    [Key]
    public int UserAreaID { get; set; }

    public int ThemeTypeID { get; set; }

    public Guid GUID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(10)]
    public string? Prefix { get; set; }

    public bool IsDemo { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    [StringLength(255)]
    public string? BaseURL { get; set; }

    [StringLength(255)]
    public string? SSOLoginURL { get; set; }

    public int? MobileIdentityAPIInstanceID { get; set; }

    public int? UploadedFileMBLimit { get; set; }

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
