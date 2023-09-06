using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Assetet;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaisjetController:BaseApiController
    {
         [HttpGet]
        public async Task<ActionResult<List<Paisjet>>> GetPaisjet()
        {
            return await Mediator.Send(new List.Query());
        }
         [HttpGet("{Paisjet_Id}")]
        public async Task<IActionResult> GetPaisjet(Guid Paisjet_Id)
        {
            var result = await Mediator.Send(new Details.Query {Paisja_Id = Paisjet_Id });
        
            return HandleResult(result);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreatePaisje(Paisjet Paisje)
        {
            return HandleResult(await Mediator.Send(new Create.Command {paisje = Paisje }));
        }
         [HttpPut("{Paisje_Id}")]
        public async Task<IActionResult> EditPaisje(Guid Paisje_Id, Paisjet paisja)
        {
            paisja.Paisja_Id= Paisje_Id;
            return HandleResult(await Mediator.Send(new Edit.Command {Paisja = paisja}));
        }
         [HttpDelete("{Paisje_Id}")]
        public async Task<IActionResult> DeletePaisje(Guid Paisje_Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Paisja_Id=Paisje_Id}));


        
    }
}
}