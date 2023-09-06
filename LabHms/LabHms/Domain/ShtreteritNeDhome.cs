using System;

namespace Domain
{
    public class ShtreteritNeDhome
    {
        public Guid ShtreteritNeDhome_Id {get; set;}

        public Guid Dhoma_Id {get; set;}

        public Dhoma Dhoma {get; set;}

        public Guid Shtrat_Id {get; set;}

        public Shtrat Shtrat {get; set;}
       
    }
}