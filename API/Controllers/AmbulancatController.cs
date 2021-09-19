using Application.Ambulancat;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AmbulancatController:BaseApiController
    {
         public async Task<IActionResult> GetAmbulancat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{Amb_Id}")]
        public async Task<IActionResult> GetAmbulancat(Guid Amb_Id)
        {
            var result = await Mediator.Send(new Details.Query { Amb_Id = Amb_Id });
        
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAmbulancat(Ambulanca ambulanca)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Ambulanca = ambulanca }));
        }

        [HttpPut("{Amb_Id}")]
        public async Task<IActionResult> EditAmbulancat(Guid Amb_Id, Ambulanca ambulanca)
        {
            ambulanca.Amb_Id = Amb_Id;
            return Ok(await Mediator.Send(new Edit.Command { Ambulanca = ambulanca }));
        }

        [HttpDelete("{Amb_Id}")]
        public async Task<IActionResult> DeleteAmbulancat(Guid Amb_Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Amb_Id = Amb_Id }));
        }

    }
}