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

namespace Application.Ambulancat
{
    public class List
    {
         public class Query : IRequest<Result<List<Ambulanca>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Ambulanca>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Ambulanca>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Ambulanca>>.Success(await _context.Ambulancat.ToListAsync(cancellationToken));
            }
        }
    }
    
}