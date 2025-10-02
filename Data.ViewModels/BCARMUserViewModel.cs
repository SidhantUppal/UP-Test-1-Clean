using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BCARMUserViewModel
{
    [Key]
    public int BCARMUserID { get; set; }

    public int? UserID { get; set; }

    public int? EmployeeID { get; set; }

    public int? BCARMUserAreaID { get; set; }

    public int BCARMUserInternalID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    public string Email { get; set; } = null!;

    [StringLength(50)]
    public string Password { get; set; } = null!;

    [StringLength(50)]
    public string UserStatus { get; set; } = null!;

    [StringLength(255)]
    public string TransactionType { get; set; } = null!;

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
