using Application.ShtreteritNeDhoma;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ShtreteritNeDhomaController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<ShtreteritNeDhome>>> GetShteteritNeDhoma()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{ShtreteritNeDhome_Id}")]
        public async Task<ActionResult<ShtreteritNeDhome>> GetShteteritNeDhome(Guid ShtreteritNeDhome_Id)
        {
            return await Mediator.Send(new Details.Query { ShtreteritNeDhome_Id = ShtreteritNeDhome_Id });
        }
    }
}