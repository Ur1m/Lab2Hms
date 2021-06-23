using Application.Faturat;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class DhomatController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<Dhoma>>> GetDhomat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Dhoma_Id}")]
        public async Task<ActionResult<Dhoma>> GetDhoma(Guid Dhoma_Id)
        {
            return await Mediator.Send(new Details.Query { Dhoma_Id = Dhoma_Id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateDhoma(Dhoma dhoma)
        {
            return Ok(await Mediator.Send(new Create.Command { Dhoma = dhoma }));
        }

        [HttpPut("{Dhoma_Id}")]
        public async Task<IActionResult> EditDhoma(Guid Dhoma_Id, Dhoma dhoma)
        {
            dhoma.Dhoma_Id = Dhoma_Id;
            return Ok(await Mediator.Send(new Edit.Command { Dhoma = dhoma }));
        }

        [HttpDelete("{Dhoma_Id}")]
        public async Task<IActionResult> DeleteDhoma(Guid Dhoma_Id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Dhoma_Id = Dhoma_Id }));
        }

    }
}
