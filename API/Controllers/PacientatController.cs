using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Pacientett;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PacientatController : BaseApiController
    {
       /* private readonly IMediator mediator;
        public PacientatController(IMediator mediator)
        {
            this.mediator = mediator;

        }*/

        [HttpGet]
        public async Task<ActionResult<List<Pacient>>> GetPacinetet()
        {
            return await Mediator.Send(new List.Query());
        }
         [HttpGet("{Pacinet_Id}")]
        public async Task<IActionResult> GetPacient(Guid Pacinet_Id)
        {
            var result = await Mediator.Send(new Details.Query {Pacient_Id = Pacinet_Id });
        
            return HandleResult(result);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreatePacient(Pacient Pacinetii)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Pacienti = Pacinetii }));
        }
         [HttpPut("{Pacinet_Id}")]
        public async Task<IActionResult> EditPacient(Guid Pacinet_Id, Pacient pacient)
        {
            pacient.Pacient_Id= Pacinet_Id;
            return HandleResult(await Mediator.Send(new Edit.Command {Pacienti = pacient}));
        }
        [HttpDelete("{Pacinet_Id}")]
        public async Task<IActionResult> DeletePacient(Guid Pacinet_Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Pacinet_ID= Pacinet_Id }));
        }

    }
}