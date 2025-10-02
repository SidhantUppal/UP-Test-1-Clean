using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EnquiryType", Schema = "V7")]
public partial class EnquiryType
{
    [Key]
    public int EnquiryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EnquiryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EnquiryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("EnquiryType")]
    public virtual ICollection<Enquiry> Enquiries { get; set; } = new List<Enquiry>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EnquiryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EnquiryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
