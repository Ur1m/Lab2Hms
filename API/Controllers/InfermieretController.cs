using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Infermieret;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public class InfermieretController : BaseApiController
    {
        /*private readonly IMediator _mediator;

        public InfermieretController(IMediator mediator)
        {
            this._mediator = mediator;

        }*/
        
        [HttpGet]
        public async Task<ActionResult<List<Infermierja>>> GetInfermierja()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]//
        public async Task<ActionResult<Infermierja>> GetInfermierja(Guid id)
        {
            return await Mediator.Send(new Details.Query{Infermierja_Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateInfermierja(Infermierja infermierja)
        {
            return Ok(await Mediator.Send(new Create.Command {Infermierja=infermierja}));

        }

        [HttpPut("{id}")]
        public async Task <IActionResult> EditInfermierja(Guid Infermierja_id, Infermierja infermierja)
        {
            infermierja.Infermierja_Id= Infermierja_id;
            return Ok(await Mediator.Send(new Edit.Command{Infermierja=infermierja}));
        }

        [HttpDelete("{id}")]

        public async Task <IActionResult> DeleteInfermierja(Guid Infermierja_id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=Infermierja_id}));

        }

        
    }

}