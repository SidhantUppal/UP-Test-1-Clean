using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Enquiry", Schema = "V7")]
public partial class Enquiry
{
    [Key]
    public int EnquiryID { get; set; }

    public int EnquiryTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [StringLength(150)]
    public string Subject { get; set; } = null!;

    public string Comments { get; set; } = null!;

    public DateTimeOffset SubmittedDate { get; set; }

    public string? ProcessedNote { get; set; }

    public int? ProcessedByUserID { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    [ForeignKey("EnquiryTypeID")]
    [InverseProperty("Enquiries")]
    public virtual EnquiryType EnquiryType { get; set; } = null!;

    [ForeignKey("ProcessedByUserID")]
    [InverseProperty("EnquiryProcessedByUsers")]
    public virtual User? ProcessedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("EnquiryUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("Enquiries")]
    public virtual UserArea UserArea { get; set; } = null!;
}
