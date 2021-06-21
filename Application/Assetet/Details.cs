using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.Assetet
{
    public class Details
    {
          public class Query : IRequest<Result<Paisjet>>
        { 
            public Guid Paisja_Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Paisjet>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Paisjet>> Handle(Query request, CancellationToken cancellationToken)
            {
                var paisja = await _context.paisjet.FindAsync(request.Paisja_Id);

                return Result<Paisjet>.Success(paisja);
            }
        }
    }
}