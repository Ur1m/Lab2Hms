using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.llojiShtreterve
{
    public class List
    {

        public class Query : IRequest<List<llojiShtratit>> { }

        public class Handler : IRequestHandler<Query, List<llojiShtratit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<llojiShtratit>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.llojeteShtreterve.ToListAsync();
            }
        }
    }
}
