using System;

namespace Domain
{
    public class Therapy
    {
        public Guid Therapy_Id{get;set;}
        public string terapia{get; set;}

         public string OnGoing{get;set;}
          public Guid Pacient_id {get; set;}

        public Pacient Pacient{get; set;}

    
    }
}