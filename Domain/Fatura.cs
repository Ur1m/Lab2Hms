using System;

namespace Domain
{

        public class Fatura
        {
        public Guid Fatura_Id{get;set;}
        public string Titulli{get; set;}

        public string Pershkrimi{get; set;}

        public int Shuma{get; set;}

        public int KrijuarMe {get; set;}

        public string Statusi {get; set;}

        public Guid Pacient_id {get; set;}

        public Pacient Pacient{get; set;}

        }
}