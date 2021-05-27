using Application.Faturat;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FaturatController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<Fatura>>> GetFaturat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Fatura_Id}")]
        public async Task<ActionResult<Fatura>> GetFatura(Guid Fatura_Id)
        {
            return await Mediator.Send(new Details.Query { Fatura_Id = Fatura_Id });
        }

        [HttpPost]

        public async Task<IActionResult> CreateFatura(Fatura fatura)
        {
            return Ok(await Mediator.Send(new Create.Command { Fatura = fatura }));
        }

        [HttpPut("{Fatura_Id}")]
        public async Task<IActionResult> EditFatura(Guid Fatura_Id, Fatura fatura)
        {
            fatura.Fatura_Id = Fatura_Id;
            return Ok(await Mediator.Send(new Edit.Command { Fatura = fatura }));
        }

        [HttpDelete("{Fatura_Id}")]
        public async Task<IActionResult> DeleteFatura(Guid Fatura_Id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Fatura_Id = Fatura_Id }));
        }

    }
}
