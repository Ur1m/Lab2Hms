using Application.Shtreter;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ShtreterController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<Shtrat>>> GetShtreter()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Shtrat_id}")]
        public async Task<ActionResult<Shtrat>> GetShtreter(Guid Shtrat_id)
        {
            return await Mediator.Send(new Details.Query { Shtrat_id = Shtrat_id });
        }

        [HttpPost]

        public async Task<IActionResult> CreateFatura(Shtrat shtrat)
        {
            return Ok(await Mediator.Send(new Create.Command { Shtrat = shtrat }));
        }

        [HttpPut("{Shtrat_id}")]
        public async Task<IActionResult> EditFatura(Guid Shtrat_id, Shtrat shtrat)
        {
            shtrat.Shtrat_id = Shtrat_id;
            return Ok(await Mediator.Send(new Edit.Command { Shtrat = shtrat }));
        }

        [HttpDelete("{Shtrat_id}")]
        public async Task<IActionResult> DeleteShtrat(Guid Shtrat_id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Shtrat_id = Shtrat_id }));
        }

    }
}
