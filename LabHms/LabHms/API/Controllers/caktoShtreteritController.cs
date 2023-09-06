using Application.caktoShtreterit;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class caktoShtreteritController : BaseApiController
    {

        [HttpGet]

        public async Task<ActionResult<List<caktoShtratin>>> GetCaktoShtreterit()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{caktoShtratin_id}")]
        public async Task<ActionResult<caktoShtratin>> GetCaktoShtratin(Guid caktoShtratin_id)
        {
            return await Mediator.Send(new Details.Query { caktoShtratin_id = caktoShtratin_id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateCaktoShtratin(caktoShtratin caktoShtratin)
        {
            return Ok(await Mediator.Send(new Create.Command { caktoShtratin = caktoShtratin }));
        }

        [HttpPut("{caktoShtratin_id}")]
        public async Task<IActionResult> EditCaktoShtratin(Guid caktoShtratin_id, caktoShtratin caktoShtratin)
        {
            caktoShtratin.caktoShtratin_id = caktoShtratin_id;
            return Ok(await Mediator.Send(new Edit.Command { caktoShtratin = caktoShtratin }));
        }

        [HttpDelete("{caktoShtratin_id}")]
        public async Task<IActionResult> DeleteCaktoShtraitin(Guid caktoShtratin_id)
        {
            return Ok(await Mediator.Send(new Delete.Command { caktoShtratin_id = caktoShtratin_id }));
        }

    }
}
