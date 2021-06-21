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

        [HttpPost]
        public async Task<IActionResult> CreatellojiShtratit(llojiShtratit llojiShtratit)
        {
            return Ok(await Mediator.Send(new Create.Command { llojiShtratit = llojiShtratit }));
        }

        [HttpPut("{llojiShtratit_id}")]
        public async Task<IActionResult> EditllojiShtratit(Guid llojiShtratit_id, llojiShtratit llojiShtratit)
        {
            llojiShtratit.llojiShtratit_id = llojiShtratit_id;
            return Ok(await Mediator.Send(new Edit.Command { llojiShtratit = llojiShtratit }));
        }

        [HttpDelete("{llojiShtratit_id}")]
        public async Task<IActionResult> DeletellojiShtratit(Guid llojiShtratit_id)
        {
            return Ok(await Mediator.Send(new Delete.Command { llojiShtratit_id = llojiShtratit_id }));
        }

    }
}
