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

<<<<<<< HEAD
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

             if(!context.BloodDonors.Any()){

                    var BloodDonors=new List<BloodDonor>{
                        
                     new BloodDonor{
                         Name = "Ian",
                         Surname = "Smith",
                         BloodGroup="A+",
                         LastDonation=DateTime.Now.AddMonths(-2)
                     },
                    /* new BloodDonor{
                         Name="Harry",
                         Surname="Poppins",
                         BloodGroup="0-",
                         LastDonation=DateTime.Now.AddMonths(-3)
                     }
                */
                     };
                
                 //param
                 context.BloodDonors.AddRange(BloodDonors);
                 context.SaveChanges();
             };

             if(!context.Infermieret.Any()){
                    var Infermieret=new List<Infermierja>{
                     new Infermierja{
                         Emri = "Ana",
                         Mbiemri = "Smith",
                         Koeficienti = 4,
                         Departamenti = "Radiologji"

=======
          /*  if(!context.Therapies.Any()) return;
                   var therapies =new List<Therapy>{
>>>>>>> 33e10b4c7f03e4c80ca461ea846b2c2bc0f1a3da

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