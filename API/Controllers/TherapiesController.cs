using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Therapies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public class TherapiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Therapy>>> GetTherapies()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Therapy_Id}")]
        public async Task<ActionResult<Therapy>> GetTherapy(Guid Therapy_Id)
        {
         return await Mediator.Send(new Details.Query {Therapy_Id = Therapy_Id});
           
        }
        [HttpPost]
          public async Task<ActionResult<Therapy>> CreateTherapies(Therapy therapy){
              return Ok(await Mediator.Send(new Create.Command{Therapy = therapy}) );
          }
          [HttpPut("{Therapy_Id}")]
          public async Task<IActionResult> EditTherapy(Guid id ,Therapy therapy){

                therapy.Therapy_Id=id;

                return Ok(await Mediator.Send(new Edit.Command{Therapy =therapy}));
          }
    }
}