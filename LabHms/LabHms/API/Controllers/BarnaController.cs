
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Barnat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public class BarnatController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Barna>>> GetBarnat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Barna>> getBarna(Guid id)
        {
            return await Mediator.Send(new Detalis.Query{Barnat_Id = id});
        }
      

        [HttpPost]
        public async Task<IActionResult> CreateBarna(Barna barna){
          return Ok(await Mediator.Send(new Create.Command{Barna=barna}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBarnat(Guid id ,Barna barna){
            barna.Barnat_Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Barna=barna}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBarnat(Guid id){

                return Ok(await Mediator.Send(new Delete.Command{Barnat_Id =id}));

        }
    }
}