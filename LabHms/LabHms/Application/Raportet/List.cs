using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Raportet
{
    public class List
    {
          public class Query : IRequest<List<Raport>> { }

        public class Handler : IRequestHandler<Query, List<Raport>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Raport>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Raportet.ToListAsync();
            }
        }
    }
}