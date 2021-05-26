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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => d.Department_id );

            modelBuilder.Entity<Mjeku>()
                .HasKey(m => m.Mjeku_Id );

        }
    }
}