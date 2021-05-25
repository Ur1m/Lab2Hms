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

            if(!context.prova.Any()){
                   var Prova=new List<prov>{
                    new prov{
                        prova2="berat"
                    }
                
                    };
                
                //param
                context.prova.AddRange(Prova);
                context.SaveChanges();
            };
        }
    }

