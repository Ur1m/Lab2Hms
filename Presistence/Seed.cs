using System.Collections.Generic;
using System.Linq;
using Domain;
using System;
using Presistence;
using System.Threading.Tasks;

namespace Presistence{


    public class Seed
    {
    

    public static void SeedData(DataContext context){

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