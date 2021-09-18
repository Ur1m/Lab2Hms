using Application.Laboratoret;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class LaboratortController: BaseApiController
    {
         [HttpGet]
        public async Task<IActionResult> GetLaboratoret()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{Lab_Id}")]
        public async Task<IActionResult> GetLaboratoret(Guid Lab_Id)
        {
            var result = await Mediator.Send(new Details.Query { Lab_Id = Lab_Id });
        
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLaborator(Laboratori laboratori)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Laboratori = laboratori }));
        }

        [HttpPut("{Lab_Id}")]
        public async Task<IActionResult> EditLaborator(Guid Lab_Id, Laboratori laboratori)
        {
            laboratori.Lab_Id = Lab_Id;
            return Ok(await Mediator.Send(new Edit.Command { Laboratori = laboratori }));
        }

        [HttpDelete("{Lab_Id}")]
        public async Task<IActionResult> DeleteLaborator(Guid Lab_Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Lab_Id = Lab_Id }));
        }


    }
}