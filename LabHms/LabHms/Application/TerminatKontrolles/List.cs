using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using Domain;

namespace Application.TerminatKontrolles
{
    public class List
    {
        public class Query : IRequest<List<Terminet>> {}

        public class Handler : IRequestHandler<Query, List<Terminet>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            
            public async Task<List<Terminet>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await  _context.Terminet.ToListAsync();
                
            }
        }
    }
}