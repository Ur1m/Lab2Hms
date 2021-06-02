using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Presistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Departmentet
{
    public class List
    {
        public class Query : IRequest<Result<List<Department>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Department>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Department>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Department>>.Success(await _context.Departmentet.ToListAsync(cancellationToken));
            }
        }
    }
}
