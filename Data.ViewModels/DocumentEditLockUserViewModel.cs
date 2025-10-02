using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentEditLockUserViewModel
{
    [Key]
    public int DocumentEditLockUserId { get; set; }

    public int DocumentTypeID { get; set; }

    public int UserID { get; set; }

    public int DocumentID { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
