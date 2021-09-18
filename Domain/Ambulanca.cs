using System;
namespace Domain
{
    public class Ambulanca
    {
          public Guid Amb_Id { get; set; }
        public string Tipi { get; set; }
        public string Fotografia{get;set;}
          public Guid Department_id { get; set; }
        public Department Department { get; set; } 
    }
}