using System;

namespace Domain
{
    public class caktoShtratin
    {
        public Guid caktoShtratin_id { get; set; }
        public DateTime kohaHyrjes {get; set;}
        public DateTime kohaLeshimit {get; set;}
        public Guid Pacient_id {get; set;}
        public Pacient Pacient{get; set;}
        public Guid Shtrat_id {get; set;}
        public Shtrat Shtrat {get; set;}
    }
}