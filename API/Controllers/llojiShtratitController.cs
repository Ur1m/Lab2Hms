using Application.llojiShtreterve;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class llojiShtratitController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<llojiShtratit>>> GetLlojiShtratit()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{llojiShtratit_id}")]
        public async Task<ActionResult<llojiShtratit>> GetLlojiShtratit(Guid llojiShtratit_id)
        {
            return await Mediator.Send(new Details.Query { llojiShtratit_id = llojiShtratit_id });
        }

    }
}
