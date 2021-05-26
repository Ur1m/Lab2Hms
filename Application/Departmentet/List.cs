using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Presistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Departmentet
{
    public class List
    {
        public class Query : IRequest<List<Department>> { }

        public class Handler : IRequestHandler<Query, List<Department>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Department>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Departmentet.ToListAsync();
            }
        }
    }
}
