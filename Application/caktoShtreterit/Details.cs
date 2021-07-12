using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.caktoShtreterit
{
    public class Details
    {

        public class Query : IRequest<caktoShtratin>
        {

            public Guid caktoShtratin_id { get; set; }

        }

        public class Handler : IRequestHandler<Query, caktoShtratin>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<caktoShtratin> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.caktoShtreterit.Where(x => x.caktoShtratin_id == request.caktoShtratin_id).Include(y => y.Pacient).Include(y => y.Shtrat).Include(z => z.Shtrat.llojiShtratit).FirstOrDefaultAsync();
            }
        }
    }
}