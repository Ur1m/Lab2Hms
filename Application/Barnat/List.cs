using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Barnat
{
    public class List
    {

        public class Query : IRequest<List<Barna>> { }

        public class Handler : IRequestHandler<Query, List<Barna>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Barna>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Barnats.ToListAsync();
            }
        }
    }
}
