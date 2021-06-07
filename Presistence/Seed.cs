using System.Collections.Generic;
using System.Linq;
using Domain;
using System;
using Presistence;
using System.Threading.Tasks;

namespace Presistence{


    public class Seed
    {
    

    public static async Task SeedData(DataContext context){

            if(!context.Therapies.Any()) return;
                   var therapies =new List<Therapy>{

                     new Therapy{                     
                          terapia= "Momox MONALIZ",
                          OnGoing= "Ilaq ndaj alergjis"
                         
                     }
                
                     };
                
                 //param
                 context.Therapies.AddRange(therapies);
                 context.SaveChanges();
            
        }
    }
}