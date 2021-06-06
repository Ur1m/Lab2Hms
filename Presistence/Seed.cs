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

             if(!context.Barnat.Any()) return;
                    var barnat =new List<Barna>{

                     new Barna{                     
                          BName= "Momox MONALIZ",
                          Description= "Ilaq ndaj alergjis",
                          DataRegjistrimit=DateTime.Now.AddMonths(-2),
                     }
                
                     };
                
                 //param
                 context.Barnat.AddRange(barnat);
                 context.SaveChanges();
            
        }
    }
}