using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Walk", Schema = "V7")]
public partial class Walk
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultHazardEmployeeID")]
    [InverseProperty("Walks")]
    public virtual Employee? DefaultHazardEmployee { get; set; }

    [InverseProperty("Walk")]
    public virtual ICollection<FavouriteWalk> FavouriteWalks { get; set; } = new List<FavouriteWalk>();

    [InverseProperty("OriginalWalk")]
    public virtual ICollection<Walk> InverseOriginalWalk { get; set; } = new List<Walk>();

    [ForeignKey("LocationID")]
    [InverseProperty("Walks")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("WalkModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OriginalWalkID")]
    [InverseProperty("InverseOriginalWalk")]
    public virtual Walk? OriginalWalk { get; set; }

    [ForeignKey("TagTypeID")]
    [InverseProperty("Walks")]
    public virtual TagType TagType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Walks")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("Walk")]
    public virtual ICollection<WalkAdhocEmployee> WalkAdhocEmployees { get; set; } = new List<WalkAdhocEmployee>();

    [InverseProperty("Walk")]
    public virtual ICollection<WalkAssignment> WalkAssignments { get; set; } = new List<WalkAssignment>();

    [InverseProperty("Walk")]
    public virtual ICollection<WalkCheckpoint> WalkCheckpoints { get; set; } = new List<WalkCheckpoint>();

    [InverseProperty("Walk")]
    public virtual ICollection<WalkHazardReportType> WalkHazardReportTypes { get; set; } = new List<WalkHazardReportType>();

    [InverseProperty("Walk")]
    public virtual ICollection<WalkResponse> WalkResponses { get; set; } = new List<WalkResponse>();

    [ForeignKey("WalkTemplateID")]
    [InverseProperty("Walks")]
    public virtual WalkTemplate? WalkTemplate { get; set; }
}
