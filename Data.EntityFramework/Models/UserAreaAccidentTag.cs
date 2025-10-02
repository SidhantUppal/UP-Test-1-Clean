using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaAccidentTag", Schema = "V7")]
public partial class UserAreaAccidentTag
{
    [Key]
    public int UserAreaAccidentTagID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string DisplayName { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaAccidentTagArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaAccidentTagCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaAccidentTagModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaAccidentTags")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaAccidentTag")]
    public virtual ICollection<UserAreaAccidentFormQuestionTag> UserAreaAccidentFormQuestionTags { get; set; } = new List<UserAreaAccidentFormQuestionTag>();

    [InverseProperty("UserAreaAccidentTag")]
    public virtual ICollection<UserAreaAccidentQuestionTag> UserAreaAccidentQuestionTags { get; set; } = new List<UserAreaAccidentQuestionTag>();
}
