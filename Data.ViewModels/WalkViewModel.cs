using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkViewModel
{
    [Key]
    public int WalkID { get; set; }

    public int TagTypeID { get; set; }

    public int? WalkTemplateID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int LocationID { get; set; }

    public int Duration { get; set; }

    public bool IsOrdered { get; set; }

    public bool IsGPSTracked { get; set; }

    public bool IsSignOffRequired { get; set; }

    public bool IsPointWalk { get; set; }

    public int? MaxPreStartDuration { get; set; }

    public int? MaxPostStartDuration { get; set; }

    public int? MaxExtensionDuration { get; set; }

    public bool IsAdhocAllowed { get; set; }

    public bool IsRandomImageRequired { get; set; }

    [StringLength(255)]
    public string? RandomImageInstruction { get; set; }

    public bool IsRandomWalk { get; set; }

    public int? RandomWalkRangeMin { get; set; }

    public int? RandomWalkRangeMax { get; set; }

    public int Version { get; set; }

    public int? OriginalWalkID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? DefaultHazardEmployeeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
