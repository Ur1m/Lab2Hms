using System;

namespace Domain
{
    public class Paisjet
    {
        public Guid Paisja_Id{get;set;}
        public string emertimi{get;set;}
        public string pershkrimi{get;set;}
        public DateTime? servisimi{get;set;}
        public Guid Department_Id{get;set;}
        public Department Department{get;set;}
        
    }
}