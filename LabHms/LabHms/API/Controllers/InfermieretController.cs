using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Infermieret;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
namespace API.Controllers
{
    public class InfermieretController : BaseApiController
    {
        private readonly IMediator _mediator;

        public InfermieretController(IMediator mediator)
        {
            this._mediator = mediator;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Infermierja>>> GetInfermierja()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Infermierja_Id}")]
        public async Task<ActionResult<Infermierja>> GetInfermierja(Guid Infermierja_Id)
        {
            return await Mediator.Send(new Details.Query{Infermierja_Id=Infermierja_Id});
            
        }

        [HttpPost]
        public async Task<IActionResult> CreateInfermierja(Infermierja infermierja)
        {
            return Ok(await Mediator.Send(new Create.Command {Infermierja=infermierja}));

        }

        [HttpPut("{Infermierja_Id}")]
        public async Task <IActionResult> EditInfermierja(Guid Infermierja_Id, Infermierja infermierja)
        {
            infermierja.Infermierja_Id= Infermierja_Id;
            return Ok(await Mediator.Send(new Edit.Command{Infermierja=infermierja}));
        }

        [HttpDelete("{Infermierja_Id}")]

        public async Task <IActionResult> DeleteInfermierja(Guid Infermierja_Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Infermierja_Id=Infermierja_Id}));

        }

        
    }

}