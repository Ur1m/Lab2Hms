using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
   public class Shtrat
    {
        public Guid Shtrat_id { get; set; }
        public int nrShtratit { get; set; }
        public string Statusi { get; set; }
        public string Pershkrimi { get; set; }
        public Guid llojiShtratit_id { get; set; }
        public llojiShtratit llojiShtratit { get; set; }
    }
}
