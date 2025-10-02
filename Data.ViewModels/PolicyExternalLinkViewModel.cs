using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyExternalLinkViewModel
{
    [Key]
    public int PolicyExternalLinkID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    [StringLength(255)]
    public string LinkTitle { get; set; } = null!;

    [StringLength(500)]
    public string LinkURL { get; set; } = null!;

    [StringLength(500)]
    public string? LinkDescription { get; set; }

    [StringLength(50)]
    public string? LinkType { get; set; }

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
