using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.TerminatKontrolles;
using System;

namespace API.Controllers
{
   public class TerminetController: BaseApiController
    {

          [HttpGet]
        public async Task<ActionResult<List<Terminet>>> GetTerminet()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{terapia_ID}")]
        public async Task<IActionResult> GetTerminin(Guid terapia_ID)
        {
            var result = await Mediator.Send(new Details.Query {terapia_ID = terapia_ID});
        
            return HandleResult(result);
        }
         [HttpPost]
        public async Task<IActionResult> CreateTerminin(Terminet termini)
        {
            return HandleResult(await Mediator.Send(new Create.Command {terminet = termini }));
        }
         [HttpPut("{terapia_ID}")]
        public async Task<IActionResult> EditPacient(Guid terapia_ID, Terminet termini)
        {
            termini.termini_ID= terapia_ID;
            return HandleResult(await Mediator.Send(new Edit.Command {terminet = termini}));
        }

         [HttpDelete("{terapia_ID}")]
        public async Task<IActionResult> DeletePacient(Guid terapia_ID)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { terapia_ID= terapia_ID }));
        }


        
    }
}