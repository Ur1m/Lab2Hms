using System.Collections.Generic;
using MediatR;
using Domain;
using Presistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace Application.DoktorsComands
{
    public class List
    {
           public class Query : IRequest<List<Mjeku>> {}

        public class Handler : IRequestHandler<Query, List<Mjeku>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            
            public async Task<List<Mjeku>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doktort=await  _context.Mjeket.ToListAsync();
                return doktort;
            }
        }
        
    }
}