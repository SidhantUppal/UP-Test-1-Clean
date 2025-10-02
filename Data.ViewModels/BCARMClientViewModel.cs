using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BCARMClientViewModel
{
    [Key]
    public int BCARMClientID { get; set; }

    public int BCARMUserAreaInternalID { get; set; }

    public bool IsV5Client { get; set; }

    public bool HasNewDesign { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
