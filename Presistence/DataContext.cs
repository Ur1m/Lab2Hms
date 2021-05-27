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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => d.Department_id );

            modelBuilder.Entity<Mjeku>()
                .HasKey(m => m.Mjeku_Id );

            modelBuilder.Entity<Pacient>()
                .HasKey(p => p.Pacient_Id );

            modelBuilder.Entity<Fatura>()
                .HasKey(f => f.Fatura_Id );

            modelBuilder.Entity<Fatura>()
                .HasOne(p => p.Pacient)
                .WithMany()
                .HasForeignKey(p => p.Pacient_id)
                .HasConstraintName("FK_Fatura_Pacient_id");
            
            modelBuilder.Entity<Infermierja>()
                .HasKey(i => i.Infermierja_Id);

        }
        public DbSet <Infermierja> Infermieret {get; set;}
    }
}