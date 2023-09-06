using System;

namespace Domain
{
    public class Terminet
    {
        public Guid termini_ID{get;set;}
        public Guid Pacient_Id{get;set;}
        public Guid Mjeku_Id{get;set;}
        public DateTime? orari{get;set;}
        public Pacient pacient{get;set;}
        public Mjeku mjeket{get;set;}
    }
}