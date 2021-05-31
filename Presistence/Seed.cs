using System.Collections.Generic;
using System.Linq;
using Domain;
using System;
using Presistence;

namespace Presistence{
}

    public class Seed
    {
    

    public static void SeedData(DataContext context){

             if(!context.Departmentet.Any()){
                    var Departmentet=new List<Department>{
                     new Department{
                         Name = "Stomatologjia",
                         Description = "Departmenti i stomatologjise"
                     }
                
                     };
                
                 //param
                 context.Departmentet.AddRange(Departmentet);
                 context.SaveChanges();
             };

             if(!context.Infermieret.Any()){
                    var Infermieret=new List<Infermierja>{
                     new Infermierja{
                         Emri = "Ana",
                         Mbiemri = "Smith",
                         Koeficienti = 4,
                         Departamenti = "Radiologji"


                     }
                /*
                         new Infermierja{
                        Emri = "Nicole",
                         Mbiemri = "Ford",
                         Koeficienti = 5,
                         Departamenti = "Stomatologji"
                    }
                     };
                
                */
                     };
                
                 //param
                 context.Infermieret.AddRange(Infermieret);
                 context.SaveChanges();
             };
        }
    }

