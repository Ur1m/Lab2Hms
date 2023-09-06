using System;

namespace Domain
{
    public class Laboratori
    {
        public Guid Lab_Id { get; set; }
        public String Emri { get; set; }
        public string Pershkrimi { get; set; }
        public string Fotografia{get;set;}
          public Guid Department_id { get; set; }
        public Department Department { get; set; } 
        
    }
}