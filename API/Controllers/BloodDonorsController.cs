using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public class BloodDonorsController : BaseApiController
    {
        private readonly DataContext _context;
        public BloodDonorsController(DataContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<BloodDonor>>> GetBloodDonor()
        {
            return await _context.BloodDonors.ToListAsync();
        }

        [HttpGet("{id}")]//bloodDonors id
        public async Task <ActionResult<BloodDonor>> GetBloodDonor(Guid id)
        {
            return await _context.BloodDonors.FindAsync(id);
        }
    }
}