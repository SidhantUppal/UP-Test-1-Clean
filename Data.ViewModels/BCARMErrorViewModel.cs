using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BCARMErrorViewModel
{
    [Key]
    public int BCARMErrorID { get; set; }

    public int? BCARMUserInternalID { get; set; }

    public int? BCARMUserAreaInternalID { get; set; }

    public string PersonalMessage { get; set; } = null!;

    public string ExceptionType { get; set; } = null!;

    public string ExceptionMessage { get; set; } = null!;

    public string Exception { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
