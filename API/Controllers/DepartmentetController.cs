using Application.Departmentet;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class DepartmentetController : BaseApiController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetDepartmentet()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Department_id}")]
        public async Task<ActionResult<Department>> GetDepartment(Guid Department_id)
        {
            return await Mediator.Send(new Details.Query { Department_Id = Department_id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment(Department department)
        {
            return Ok(await Mediator.Send(new Create.Command { Department = department }));
        }

    }
}