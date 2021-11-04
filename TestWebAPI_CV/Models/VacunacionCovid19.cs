using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TestWebAPI_CV.Models
{
    public partial class VacunacionCovid19
    {
        public int VacunacionId { get; set; }
        public int? FkPacienteId { get; set; }
        public int? FkVacunaId { get; set; }
        public int? FkDosisId { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
