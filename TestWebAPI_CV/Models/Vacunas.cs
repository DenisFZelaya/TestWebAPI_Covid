using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TestWebAPI_CV.Models
{
    public partial class Vacunas
    {
        public int VacunaId { get; set; }
        public string Descripcion { get; set; }
        public bool? Estado { get; set; }
    }
}
