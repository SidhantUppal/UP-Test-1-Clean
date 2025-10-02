using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyAcknowledgmentViewModel
{
    [Key]
    public int PolicyAcknowledgmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset AcknowledgmentDate { get; set; }

    [StringLength(50)]
    public string? AcknowledgmentMethod { get; set; }

    public string? DigitalSignature { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    public string? AcknowledgmentText { get; set; }

    public string? UserComments { get; set; }

    [StringLength(100)]
    public string? VerificationCode { get; set; }

    public bool? IsVerified { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
