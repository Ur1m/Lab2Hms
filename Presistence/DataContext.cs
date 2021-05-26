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
        public DbSet<Doktori> Doktoret{get;set;}

        public DbSet<Pacienti> Pacientat {get;set;}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => d.Department_id );

            modelBuilder.Entity<Doktori>()
                .HasKey(d => d.Doktori_id );

            modelBuilder.Entity<Pacienti>()
                .HasKey(p => p.Pacienti_Id );
        }
    }
}