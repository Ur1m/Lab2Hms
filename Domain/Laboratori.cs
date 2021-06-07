using System;

namespace Domain
{
    public class Laboratori
    {
        public Guid Id { get; set; }
        public String Emri { get; set; }
        public String NrId { get; set; }
        public string Mosha { get; set; }
        public string Pershkrimi { get; set; }
        public string Rezultati { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        
    }
}