using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AccidentFormCrossPopulationType", Schema = "V7")]
public partial class AccidentFormCrossPopulationType
{
    [Key]
    public int AccidentFormCrossPopulationTypeID { get; set; }

    public int MainAccidentFormTypeID { get; set; }

    public int LinkingAccidentFormTypeID { get; set; }

    [StringLength(250)]
    public string Description { get; set; } = null!;

    public bool? IsEnabled { get; set; }

    [ForeignKey("LinkingAccidentFormTypeID")]
    [InverseProperty("AccidentFormCrossPopulationTypeLinkingAccidentFormTypes")]
    public virtual AccidentFormType LinkingAccidentFormType { get; set; } = null!;

    [ForeignKey("MainAccidentFormTypeID")]
    [InverseProperty("AccidentFormCrossPopulationTypeMainAccidentFormTypes")]
    public virtual AccidentFormType MainAccidentFormType { get; set; } = null!;
}
