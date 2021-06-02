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
             if(!context.Mjeket.Any()){
                    var Mjeki=new List<Mjeku>{
                     new Mjeku{
                         Emri="Berat",
                        Mbimeri="Latifi",
                        Ditlindja=DateTime.Now,
                        Specializimi="MSC",
                        depName="Emergjenc"
                      
                     }
                
                     };
                
                 //param
                 context.Mjeket.AddRange(Mjeki);
                 context.SaveChanges();
             };
        }
    }

