using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmploymentStatusType", Schema = "V7")]
public partial class EmploymentStatusType
{
    [Key]
    public int EmploymentStatusTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("EmploymentStatusType")]
    public virtual ICollection<AccidentCasePersonDatum> AccidentCasePersonData { get; set; } = new List<AccidentCasePersonDatum>();

    [InverseProperty("EmploymentStatusType")]
    public virtual ICollection<AccidentPerson> AccidentPeople { get; set; } = new List<AccidentPerson>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmploymentStatusTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmploymentStatusTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmploymentStatusTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmploymentStatusTypes")]
    public virtual UserArea? UserArea { get; set; }
}
