 using Domain;
using Microsoft.EntityFrameworkCore;

namespace Presistence
 {

 
 public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public  DbSet<prov> prova{ get; set;}
        public DbSet<Department> Departmentet{get;set;}

        public DbSet<Mjeku> Mjeket{get;set;}

        public DbSet<Pacient> pacientet{get;set;}

        public DbSet<Fatura> Faturat {get; set;}

        public DbSet<Laboratori> Laboratoret {get; set;}
        public DbSet<Therapy> Therapies {get; set;}

        public DbSet <Infermierja> Infermieret {get; set;}

        public DbSet<Barna> Barnat {get; set;}
        public DbSet<llojiShtratit> llojeteShtreterve { get; set; }
        public DbSet<Shtrat> Shtreter { get; set; }
        public DbSet<Provoprovo> provoprovos{get;set;}
        public DbSet<Terminet> Terminet {get;set;}

        public DbSet<caktoShtratin> caktoShtreterit {get; set;}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => d.Department_id );
//-----------------------------------------------------------------------------
            modelBuilder.Entity<Mjeku>()
                .HasKey(m => m.Mjeku_Id );
//-----------------------------------------------------------------------------
            modelBuilder.Entity<Pacient>()
                .HasKey(p => p.Pacient_Id );
//-----------------------------------------------------------------------------
           modelBuilder.Entity<Fatura>()
                .HasKey(f => f.Fatura_Id );

            modelBuilder.Entity<Fatura>()
                .HasOne(p => p.Pacient)
                .WithMany()
                .HasForeignKey(p => p.Pacient_id)
                .HasConstraintName("FK_Fatura_Pacient_id");
    //-----------------------------------------------------------------------------        
            modelBuilder.Entity<Infermierja>()
                .HasKey(i => i.Infermierja_Id);
 //-----------------------------------------------------------------------------        
            modelBuilder.Entity<Barna>()
                .HasKey(d => d.Barnat_Id );
//----------------------------------------------------------------------------- 
             modelBuilder.Entity<Therapy>()
                .HasKey(f => f.Therapy_Id );

            modelBuilder.Entity<Therapy>()
                .HasOne(p => p.Pacient)
                .WithMany()
                .HasForeignKey(p => p.Pacient_id)
                .HasConstraintName("FK_Therapy_Pacient_id");
                //----------------------------------------------------------------------------- 

            modelBuilder.Entity<Laboratori>()
                .HasKey(l => l.Id);

            modelBuilder.Entity<llojiShtratit>()
                .HasKey(ll => ll.llojiShtratit_id);
            
            modelBuilder.Entity<Shtrat>()
                .HasKey(sh => sh.Shtrat_id);

            modelBuilder.Entity<Shtrat>()
                .HasOne(ll => ll.llojiShtratit)
                .WithMany()
                .HasForeignKey(ll => ll.llojiShtratit_id)
                .HasConstraintName("FK_Shtrat_llojiShtratit_id");
                //-----------------------------------------------------
                modelBuilder.Entity<Provoprovo>()
                .HasKey(a =>a.id);
            modelBuilder.Entity<Terminet>()
                .HasKey(terminet=>terminet.termini_ID);
                //------------------------------------------------

                modelBuilder.Entity<Terminet>()
                .HasOne(terminet=>terminet.pacient)
                .WithMany()
                .HasForeignKey(p=>p.Pacient_Id)
                .HasConstraintName("FK_Temrinet_Pacinetat");

                //--------------------------------------------------
                modelBuilder.Entity<Terminet>()
                .HasOne(terminet=>terminet.mjeket)
                .WithMany()
                .HasForeignKey(p =>p.Mjeku_Id)
                .HasConstraintName("FK_Terminat_Doktoret");

            modelBuilder.Entity<caktoShtratin>()
                .HasKey(c => c.caktoShtratin_id);
            
            modelBuilder.Entity<caktoShtratin>()
                .HasOne(p => p.Pacient )
                .WithMany()
                .HasForeignKey(p => p.Pacient_id)
                .HasConstraintName("FK_caktoShtratin_Pacient_id");
            
            modelBuilder.Entity<caktoShtratin>()
                .HasOne(sh => sh.Shtrat)
                .WithMany()
                .HasForeignKey(sh => sh.Shtrat_id)
                .HasConstraintName("FK_caktoShtratin_Shtrat_id");

        }
      
    }
}