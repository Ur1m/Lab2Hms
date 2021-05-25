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
        public DbSet<Doktori> doktori{get;set;}
        
        

        protected override void OnModelCreating(ModelBuilder builder) {
                base.OnModelCreating(builder);

                 builder.Entity<Doktori>(x => x.HasKey(aa => new { aa.Doktori_id}));
                 

            
    }
    
}
}