using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseBundleFilter", Schema = "V7")]
public partial class CourseBundleFilter
{
    [Key]
    public int CourseBundleFilterID { get; set; }

    public int CourseBundleID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? JobRoleID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? LocationID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CourseBundleFilterArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CourseBundleID")]
    [InverseProperty("CourseBundleFilters")]
    public virtual CourseBundle CourseBundle { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CourseBundleFilterCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("JobRoleID")]
    [InverseProperty("CourseBundleFilters")]
    public virtual JobRole? JobRole { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("CourseBundleFilters")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CourseBundleFilterModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("CourseBundleFilters")]
    public virtual OrgGroup? OrgGroup { get; set; }
}
