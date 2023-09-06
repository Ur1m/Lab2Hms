using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Assetet
{
    public class List
    {
         public class Query : IRequest<List<Paisjet>> {}

        public class Handler : IRequestHandler<Query, List<Paisjet>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            
            public async Task<List<Paisjet>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await  _context.Paisjets.ToListAsync();
                
            }
        }
    }
}