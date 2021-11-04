using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TestWebAPI_CV.Models;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TestWebAPI_CV.Context
{
    public partial class appDbContext : DbContext
    {
        public appDbContext()
        {
        }

        public appDbContext(DbContextOptions<appDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Dosis> Dosis { get; set; }
        public virtual DbSet<Pacientes> Pacientes { get; set; }
        public virtual DbSet<VacunacionCovid19> VacunacionCovid19 { get; set; }
        public virtual DbSet<Vacunas> Vacunas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-A6Q4787\\SQLEXPRESS;Database=TestWebAPI_Denis_Zelaya;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dosis>(entity =>
            {
                entity.HasKey(e => e.DosisVacunaId);

                entity.Property(e => e.Descripcion).HasMaxLength(50);
            });

            modelBuilder.Entity<Pacientes>(entity =>
            {
                entity.HasKey(e => e.PacienteId);

                entity.Property(e => e.Apellidos).HasMaxLength(50);

                entity.Property(e => e.Expediente).HasMaxLength(20);

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.Nombres).HasMaxLength(50);

                entity.Property(e => e.Sexo)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.TipoEdad).HasMaxLength(10);
            });

            modelBuilder.Entity<VacunacionCovid19>(entity =>
            {
                entity.HasKey(e => e.VacunacionId);

                entity.ToTable("Vacunacion_Covid19");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaUltimaModificacion).HasColumnType("datetime");

                entity.Property(e => e.FkDosisId).HasColumnName("FK_DosisId");

                entity.Property(e => e.FkPacienteId).HasColumnName("FK_PacienteId");

                entity.Property(e => e.FkVacunaId).HasColumnName("FK_VacunaId");
            });

            modelBuilder.Entity<Vacunas>(entity =>
            {
                entity.HasKey(e => e.VacunaId);

                entity.Property(e => e.Descripcion).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
