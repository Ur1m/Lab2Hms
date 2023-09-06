using System.Collections.Generic;
using System.Linq;
using Domain;
using System;
using Presistence;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Presistence{


    public class Seed
    {
    

    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager){

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser{DisplayName = "Rinor", UserName = "rinor", Email = "rinor@test.com"},
                new AppUser{DisplayName = "Berat", UserName = "berat", Email = "berat@test.com"},
                new AppUser{DisplayName = "Lavdim", UserName = "lavdim", Email = "lavdim@test.com"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

          /*  if(!context.Therapies.Any()) return;
                   var therapies =new List<Therapy>{

                     new Therapy{                     
                          terapia= "Momox MONALIZ",
                          OnGoing= "Ilaq ndaj alergjis"
                         
                     }
                
                     }; 
                
                 //param
                 context.Therapies.AddRange(therapies);
                 context.SaveChanges();*/
                  /*if(!context.Terminet.Any()){
                      var termini=new List<Terminet>{
                          new Terminet{
                             orari=DateTime.Now
                          }
                      };
                       context.Terminet.AddRangeAsync(termini);
                       context.SaveChangesAsync();
                  }*/
            
        }
       
    }
}