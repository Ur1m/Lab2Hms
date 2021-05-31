using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace Application.Infermieret
{
    public class List
    {
        public class Query : IRequest<List<Infermierja>> { }

        public class Handler : IRequestHandler<Query, List<Infermierja>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<List<Infermierja>> Handle(Query request, CancellationToken cancellationToken)
            {
            
                return await _context.Infermieret.ToListAsync();
            }
        }
    }
}