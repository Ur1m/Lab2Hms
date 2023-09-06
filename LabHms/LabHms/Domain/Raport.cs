using System;

namespace Domain
{
    public class Raport
    {
        public Guid Raport_Id {get; set;}
        public string raporti{get; set;}
         public DateTime Date { get; set; }
          public Guid Paisja_Id{get;set;}
        public Paisjet Paisjet{get; set;}

    }
}