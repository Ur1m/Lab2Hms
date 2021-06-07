using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Laboratoret
{

    public class List
    {
        public class Query : IRequest<List<Laboratori>> { }

        public class Handler : IRequestHandler<Query, List<Laboratori>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Laboratori>> Handle(Query request,
             CancellationToken cancellationToken)
            {
                var Laboratoret = await _context.Laboratoret.ToListAsync();

                return Laboratoret;
            }
        }
    }
}