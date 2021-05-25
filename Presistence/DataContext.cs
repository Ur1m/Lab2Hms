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
    
        
        

        /*protected override void OnModelCreating(ModelBuilder builder) {
                builder.Entity<Citys>().HasData(
                new Citys { Id = 1, Name = "Prishtina" },
                new Citys {  Id=2,Name="Mitrovic"}

            );
    }*/
    
}
}