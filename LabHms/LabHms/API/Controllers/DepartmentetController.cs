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
        public async Task<IActionResult> GetDepartmentet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{Department_id}")]
        public async Task<IActionResult> GetDepartment(Guid Department_id)
        {
            var result = await Mediator.Send(new Details.Query { Department_Id = Department_id });
        
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment(Department department)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Department = department }));
        }

        [HttpPut("{Department_id}")]
        public async Task<IActionResult> EditDepartment(Guid Department_id, Department department)
        {
            department.Department_id = Department_id;
            return HandleResult(await Mediator.Send(new Edit.Command { Department = department }));
        }

        [HttpDelete("{Department_id}")]
        public async Task<IActionResult> DeleteDepartmentet(Guid Department_id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Department_Id = Department_id }));
        }


    }
}