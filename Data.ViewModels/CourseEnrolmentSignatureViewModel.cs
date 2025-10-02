using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrolmentSignatureViewModel
{
    [Key]
    public int CourseEnrolmentSignatureID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    [StringLength(50)]
    public string? SignatureType { get; set; }

    public string SignatureData { get; set; } = null!;

    public int SignedByUserID { get; set; }

    public DateTimeOffset SignedDate { get; set; }

    public string? AgreementText { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
