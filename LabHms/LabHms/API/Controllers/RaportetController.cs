using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Raportet;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;


namespace API.Controllers
{
    public class RaportetController: BaseApiController
    {
         [HttpGet]
        public async Task<ActionResult<List<Raport>>> GetRaportet()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Raport_Id}")]
        public async Task<ActionResult<Raport>> GetRaport(Guid Raport_Id)
        {
            return await Mediator.Send(new Details.Query { Raport_Id = Raport_Id });

        }
        [HttpPost]
        public async Task<ActionResult<Raport>> CreateRaportet(Raport raport)
        {
            return Ok(await Mediator.Send(new Create.Command { Raport = raport }));
        }
        [HttpPut("{Raport_Id}")]
        public async Task<IActionResult> EditRaport(Guid id, Raport raport)
        {

            raport.Raport_Id = id;

            return Ok(await Mediator.Send(new Edit.Command { Raport = raport }));
        }
       

        [HttpDelete("{Raport_Id}")]
        public async Task<IActionResult> DeleteRaport(Guid Raport_Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Raport_Id =Raport_Id  }));
            
        }
    }
}