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

namespace Application.Laboratoret
{
    public class List
    {
         public class Query : IRequest<Result<List<Laboratori>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Laboratori>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Laboratori>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Laboratori>>.Success(await _context.Laboratort.ToListAsync(cancellationToken));
            }
        }
    }
}